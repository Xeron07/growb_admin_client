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
