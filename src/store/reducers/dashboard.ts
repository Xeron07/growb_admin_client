// authSlice.js
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReducerPayload } from "../../interface";
import axiosInstance from "../../api/axios";
import apiConfig from "../../api/config";
import { toast } from "react-toastify";


// Define an initial state
const initialState = {
  dashboardloading: "idle",
  recentTransactions: [],
  stateData: {
    totalAmountSum: 0,
    totalTransactions: 0,
  },
  topShops: [],
};

// Create an async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/details",
  async (_, { dispatch }) => {
    try {
      const res = await axiosInstance.get(
        apiConfig.dashboard.getDashBoardDetails()
      );

      if (res.status === 200 && res.data.success) {
        // Dispatch the updateState action to update the state with the received data
        dispatch(
          updateState({
            key: "recentTransactions",
            value: res.data.dataSource.recentTransactions,
          })
        );
        dispatch(
          updateState({
            key: "stateData",
            value: {
              totalAmountSum: res.data.dataSource.totalAmount[0].totalAmountSum,
              totalTransactions:
                res.data.dataSource.totalAmount[0].totalTransactions,
            },
          })
        );
        dispatch(
          updateState({
            key: "topShops",
            value: res.data.dataSource.topShops,
          })
        );
        return res.data;
      }
    } catch (error) {
      console.error(error);
      toast.warning("Please try again after some time");
      throw error; // Re-throw the error to let the caller handle it
    }
  }
);
// Create a dashboard slice with the initial state
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<IReducerPayload>) => {
      // Merge the action payload with the current state
      return { ...state, [action.payload.key]: action.payload.value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.dashboardloading = "loading";
      })
      .addCase(fetchDashboardData.fulfilled, (state) => {
        state.dashboardloading = "succeeded";
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.dashboardloading = "failed";
      });
  },
});
export const { updateState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
