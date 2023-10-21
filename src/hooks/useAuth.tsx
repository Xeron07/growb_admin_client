import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../store/reducers/login"; // Import your login async thunk
import { ICredential } from "../interface";

export const useLogin = () => {
  const dispatch = useDispatch<any>();
  const loginStatus = useSelector((state: any) => state.login.status);
  const loginError = useSelector((state: any) => state.login.error);

  const login = async (credentials: ICredential) => {
    try {
      await dispatch(loginAsync(credentials));
      return null; // Successful login, no error
    } catch (error: any) {
      return error.message; // Failed login, return the error message
    }
  };

  return { login, loginStatus, loginError };
};

// Define the type for your login credentials (YourCredentialsType)
