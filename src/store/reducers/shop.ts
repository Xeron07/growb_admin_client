import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRetailer,
  fetchRetailers,
  addRetailer,
} from "../../api/retailers"; // Replace with your actual API module
import { IShop } from "../../interface";

interface ShopState {
  shopData: IShop | [];
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ShopState = {
  shopData: [],
  loading: "idle",
  error: null,
};

export const fetchRetailerList = createAsyncThunk<IShop, string>(
  "shop/fetchRetailers",
  async () => {
    try {
      const response = await fetchRetailers(); // Replace with your API call
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addShop = createAsyncThunk<IShop, IShop>(
  "shop/addShop",
  async (shopData) => {
    try {
      const response = await addRetailer(shopData); // Replace with your API call
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchRetailerData = createAsyncThunk<IShop, string>(
  "shop/fetchRetailer",
  async (shopId) => {
    try {
      const response = await fetchRetailer(shopId); // Replace with your API call
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const shopSlice = createSlice({
  name: "retailer",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<ShopState>>) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRetailerList.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchRetailerList.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.shopData = action.payload;
      })
      .addCase(fetchRetailerList.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addShop.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addShop.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.shopData = action.payload;
      })
      .addCase(addShop.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchRetailerData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchRetailerData.fulfilled, (state, action) => {
        state.loading = "succeeded";
      })
      .addCase(fetchRetailerData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { updateState } = shopSlice.actions;
export default shopSlice.reducer;
