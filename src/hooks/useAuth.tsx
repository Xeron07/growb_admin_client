import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../store/reducers/login"; // Import your login async thunk
import { ICredential, User } from "../interface";
import { logout, setToken, setUser } from "../store/reducers/auth";
import { fetchUserData } from "../api/users";

export const useLogin = () => {
  const dispatch = useDispatch<any>();
  const loginStatus = useSelector((state: any) => state.login.status);
  const loginError = useSelector((state: any) => state.login.error);
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  const login = async (credentials: ICredential) => {
    await dispatch(loginAsync(credentials));
  };

  const signOut = async () => {
    await dispatch(logout());
  };

  const updateUser = async (user: User) => {
    await dispatch(setUser(user));
  };

  const fetchUser = async (userID: string) => {
    try {
      const data = await fetchUserData(userID);
      if (data?.success) {
        updateUser(data?.data);
      } else {
        signOut();
      }
    } catch (error) {
      // Handle the error, if needed
      console.error(error);
      signOut();
    }
  };

  const updateToken = async (token: string) => {
    await dispatch(setToken(token));
  };

  return {
    login,
    loginStatus,
    loginError,
    token,
    user,
    signOut,
    updateToken,
    updateUser,
    fetchUser,
  };
};

// Define the type for your login credentials (YourCredentialsType)
