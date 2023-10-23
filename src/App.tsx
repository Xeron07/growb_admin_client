import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import { isExpired } from "react-jwt";
import Page from "./pages";
import apiConfig from "./api/config";
import { projectLogo } from "./utilities/util";
import { useLogin } from "./hooks/useAuth";
const App: React.FC = () => {
  const [authToken, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [isFetchingToken, setIsFetchingToken] = useState<boolean>(false);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  const { token } = useLogin();

  useEffect(() => {
    // Check if token exists and is still valid
    if (authToken) {
      setAuthSuccess(!isExpired(authToken));
      if (decodeToken(authToken)) {
        // Token is expired, initiate a refresh
        refreshAccessToken();
      }
    }
    //eslint-disable-next-line
  }, [authToken]);

  useEffect(() => {
    if (!!token) setToken(token);
  }, [token]);

  const decodeToken = (authToken: string) => {
    return isExpired(authToken);
  };

  const refreshAccessToken = () => {
    if (!isFetchingToken) {
      setIsFetchingToken(true);
      // Make a request to your backend to refresh the token
      axios
        .post(apiConfig.refreshToken, {
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((response) => {
          const newToken = response.data.accessToken;
          setToken(newToken);
          setIsFetchingToken(false);
          // Update the token in local storage
          localStorage.setItem("token", newToken);
        })
        .catch((error) => {
          setIsFetchingToken(false);
          // Handle token refresh failure, e.g., redirect to login
          console.error("Token refresh failed:", error);
          // You may want to redirect the user to the login page if token refresh fails
          // window.location.href = '/login';
        });
    }
  };

  // Your component JSX and the rest of your application logic

  return (
    <>
      {!isFetchingToken && <Page isAuth={authSuccess} />}
      {isFetchingToken && (
        <div className='w-full h-[100vh] flex justify-center items-center'>
          <img
            src={projectLogo}
            alt='main-logo'
            className=' w-20 h-20 animate-bounce'
          />
        </div>
      )}
    </>
  );
};

export default App;
