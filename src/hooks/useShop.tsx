import { useDispatch, useSelector } from "react-redux";
import {
  addShop,
  fetchRetailerData,
  fetchRetailerList,
  updateState,
} from "../store/reducers/shop";
import { searchRetailerByName } from "../api/retailers";

export const useRetailer = () => {
  const dispatch = useDispatch<any>();
  const shopData = useSelector((state: any) => state.shop.shopData);
  const loading = useSelector((state: any) => state.shop.loading);
  const error = useSelector((state: any) => state.shop.error);

  const fetchRetailers = async () => {
    try {
      await dispatch(fetchRetailerList());
    } catch (error: any) {
      // Handle the error, if needed
    }
  };

  const addRetailer = async (shopInformation: any) => {
    try {
      await dispatch(addShop(shopInformation));
      await fetchRetailers();
    } catch (error: any) {
      // Handle the error, if needed
    }
  };

  const fetchRetailer = async (shopId: string) => {
    try {
      const data = await dispatch(fetchRetailerData(shopId));
      if (data?.payload?.success) {
        return data?.payload?.data;
      }
    } catch (error) {
      // Handle the error, if needed
    }
  };

  const fetchRetailerByName = async (shopName: string) => {
    try {
      const data = await searchRetailerByName(shopName);
      if (data?.success) {
        return data?.data;
      }
    } catch (error) {
      // Handle the error, if needed
      console.error(error);
    }
  };

  const updateRetailerState = (partialState: any) => {
    dispatch(updateState(partialState));
  };

  return {
    shopData,
    loading,
    error,
    fetchRetailers,
    addRetailer,
    fetchRetailer,
    updateRetailerState,
    fetchRetailerByName,
  };
};
