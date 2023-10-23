// authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../interface";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: null,
  } as AuthState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      localStorage.setItem("token", "");
      localStorage.setItem("refreshToken", "");
      window.location.href = "/";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
