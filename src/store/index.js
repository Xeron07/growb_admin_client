// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/theme"; // Import your themeSlice reducer
import authReducer from "./reducers/auth"; // Import your authentication slice
import loginReducer from "./reducers/login"; // Import your login slice
import retailerReducer from "./reducers/shop";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    login: loginReducer,
    retailer: retailerReducer,
  },
});

export default store;
