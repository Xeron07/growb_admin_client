const baseUrl = "https://growb-info.onrender.com/api";

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
    getRetailerByName: (version = "v1", retailerName) =>
      `${baseUrl}/${version}/retailer/search?shopName=${retailerName}`,
  },
};

export default apiConfig;
