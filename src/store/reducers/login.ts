import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginSuccess } from "./auth";
import { login } from "../../api/users"; // Replace with your actual login API function
import { LoginState } from "../../interface"; // Import your interfaces
import { toast } from "react-toastify";

// Define the type for the login credentials
interface UserCredentials {
  email: string;
  password: string;
}

// Define an async thunk for login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: UserCredentials, { dispatch }) => {
    try {
      // Call the login API function with credentials
      const response = await login(credentials);

      if (response?.success) {
        // Extract the token and user data from the API response
        const { token } = response?.data;

        // Dispatch the login success action with the token and user data
        dispatch(loginSuccess({ token, user: response?.data }));

        localStorage.setItem("token", token);

        // Return the API response data
        return response.data;
      } else {
        toast(response?.error);
      }
    } catch (error: any) {
      // If there's an error, throw it to be caught and handled
      toast.error(error.message, { position: "top-center" });
    }
  }
);

// Create a login slice
const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "idle",
    error: "",
  } as LoginState, // Use AuthState for initialState
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error?.message || "Something went wrong, please try again";
      });
  },
});

export default loginSlice.reducer;
