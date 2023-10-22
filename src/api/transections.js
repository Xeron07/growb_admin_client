import axios from "./axios";
import config from "./config";

export const fetchTransection = (shopId, trackId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.transections.getAllTransection("v1",shopId, trackId))
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

export const createTransection = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(config.transections.addTransection(), data)
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
