import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard";
import { useLogin } from "./hooks/useAuth";
import LoginPage from "./pages/auth/login";
import { isExpired } from "react-jwt";
function App() {
  const { token } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check token expiration on component mount
  const checkJsonToken = () => {
    const tokenFromStore = !!token ? token : localStorage.getItem("token");

    if (tokenFromStore) {
      setIsAuthenticated(!isExpired(tokenFromStore));
    }
  };
  useEffect(() => {
    checkJsonToken();
    //eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    checkJsonToken();
    //eslint-disable-next-line
  }, []);

  return (
    <div className=' h-[100vh] '>
      {!isAuthenticated && <LoginPage />}
      {!!isAuthenticated && <Dashboard />}
      <ToastContainer
        position='top-left'
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}

export default App;
