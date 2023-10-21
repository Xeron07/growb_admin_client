const baseUrl = "http://localhost:7002/api";

const apiConfig = {
  users: {
    login: (version = "v1") => `${baseUrl}/${version}/user/login`,
  },
  transections: {
    getAllTransection: (version = "v1", shopId, trackId) =>
      `${baseUrl}/${version}/transection/${shopId}/${trackId}`,
    addTransection: (version = "v1") => `${baseUrl}/${version}/transection/add`,
  },
  retailers: {
    getRetailer: (version = "v1", retailerId) =>
      `${baseUrl}/${version}/retailer/${retailerId}`,
    addRetailer: (version = "v1") => `${baseUrl}/${version}/retailer/add`,
    getAllRetailers: (version = "v1") => `${baseUrl}/${version}/retailer/all`,
  },
};

export default apiConfig;
