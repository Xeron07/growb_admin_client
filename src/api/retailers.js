import axios from "./axios";
import config from "./config";

export const fetchRetailers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.retailers.getAllRetailers())
      .then((response) => {
        if (response.status === 200 && response.data?.success)
          resolve({
            success: true,
            data: response.data?.dataSource,
          });
        // Resolve with the response data
        else resolve({ success: false, error: response?.data?.error });
      })
      .catch((error) => {
        reject(error); // Reject with the error
      });
  });
};
export const fetchRetailer = (retailerId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.retailers.getRetailer("v1", retailerId))
      .then((response) => {
        if (response.status === 200 && response.data?.success)
          resolve({
            success: true,
            data: response.data?.dataSource,
          });
        // Resolve with the response data
        else resolve({ success: false, error: response?.data?.error });
      })
      .catch((error) => {
        reject(error); // Reject with the error
      });
  });
};

export const searchRetailerByName = (retailerName) => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.retailers.getRetailerByName("v1", retailerName))
      .then((response) => {
        if (response.status === 200 && response.data?.success)
          resolve({
            success: true,
            data: response.data?.dataSource,
          });
        // Resolve with the response data
        else resolve({ success: false, error: response?.data?.error });
      })
      .catch((error) => {
        reject({ success: false, error }); // Reject with the error
      });
  });
};
export const addRetailer = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(config.retailers.addRetailer(), data)
      .then((response) => {
        if (response.status === 200 && response.data?.success)
          resolve({
            success: true,
            data: response.data?.dataSource,
          });
        // Resolve with the response data
        else resolve({ success: false, error: response?.data?.error });
      })
      .catch((error) => {
        reject(error); // Reject with the error
      });
  });
};
