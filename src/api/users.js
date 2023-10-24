import axios from "./axios";
import config from "./config";

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(config.users.login(), data);
      if (response.status === 200 && response.data?.success)
        resolve({
          success: true,
          data: response.data?.dataSource,
        });
      // Resolve with the response data
      else resolve({ success: false, error: response?.data?.error });
    } catch (error) {
      reject({
        message:
          error?.response?.data?.error || "Please try again after sometime",
      });
    }
  });
};

export const fetchUserData = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(config.users.getUser("v1", userID));
      if (response.status === 200 && response.data?.success)
        resolve({
          success: true,
          data: response.data?.dataSource,
        });
      // Resolve with the response data
      else reject({ success: false, error: "Please Log in again" });
    } catch (error) {
      reject({
        error: "Please Log in again",
      });
    }
  });
};
