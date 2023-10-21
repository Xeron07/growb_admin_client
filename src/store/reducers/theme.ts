// reducers/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  color: string; // Specify possible theme values
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    color: "light", // Default theme
  } as ThemeState, // Use ThemeState for initialState
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
