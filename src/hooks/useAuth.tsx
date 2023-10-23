import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../store/reducers/login"; // Import your login async thunk
import { ICredential } from "../interface";
import { logout } from "../store/reducers/auth";

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

  return { login, loginStatus, loginError, token, user, signOut };
};

// Define the type for your login credentials (YourCredentialsType)
