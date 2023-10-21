import { useDispatch, useSelector } from "react-redux";

export const useRetailer = () => {
  const dispatch = useDispatch<any>();
  const shopData = useSelector((state: any) => state.shop.shopData);
  const loading = useSelector((state: any) => state.shop.loading);
  const error = useSelector((state: any) => state.shop.error);

  const fetchRetailers = async () => {
    try {
      await dispatch.shop.fetchRetailerList();
    } catch (error) {
      // Handle the error, if needed
    }
  };

  const addRetailer = async (shopData: any) => {
    try {
      await dispatch.shop.addShop(shopData);
    } catch (error) {
      // Handle the error, if needed
    }
  };

  const fetchRetailer = async (shopId: string) => {
    try {
      await dispatch.shop.fetchRetailer(shopId);
    } catch (error) {
      // Handle the error, if needed
    }
  };

  const updateRetailerState = (partialState: any) => {
    dispatch.shop.updateState(partialState);
  };

  return {
    shopData,
    loading,
    error,
    fetchRetailers,
    addRetailer,
    fetchRetailer,
    updateRetailerState,
  };
};
