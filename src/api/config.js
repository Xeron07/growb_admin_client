const baseUrl = "/api";

const apiConfig = {
  refreshToken: `${baseUrl}/refreshToken`,
  users: {
    login: (version = "v1") => `${baseUrl}/${version}/user/login`,
    getUser: (version = "v1", userID) =>
      `${baseUrl}/${version}/user/by/${userID}`,
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
    getRetailerByName: (version = "v1", retailerName) =>
      `${baseUrl}/${version}/retailer/search?shopName=${retailerName}`,
  },
};

export default apiConfig;
