import axios from "./axios";
import config from "./config";

export const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(config.users.login(), data)
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
        throw error; // Reject with the error
      });
  });
};
