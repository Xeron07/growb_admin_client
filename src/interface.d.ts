// interfaces.d.ts

// Define an interface for the user data structure
interface User {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  avatar: string;
  nid: string;
  type: "admin" | "retailer" | "menu" | "ro" | "logistic" | "default";
  token: string;
}

// Define an interface for the state types
interface RootState {
  auth: AuthState;
  // Add other slices and their state interfaces as needed
}

interface AuthState {
  user: User | null;
  token: String;
  // Add other properties specific to your authentication state
}

interface LoginState {
  status: string;
  error: string | undefined;
}

interface ICredential {
  email: string;
  password: string;
}

interface Shipping {
  mobileNumber: string;
  address: string;
  reciverName: string;
  // Add any other properties within the "shipping" object
}

interface Location {
  address: string;
  lat: string;
  long: string;
  // Add any other properties within the "location" object
}

interface Documents {
  nid: string;
  tin: string;
  ownerAddress: string;
  ownerNumber: string;
  tradeLic: string;
  // Add any other properties within the "documents" object
}

interface SocialConnections {
  whatsapp: string;
  // Add any other properties within the "social_connections" object
}

interface Product {
  icon: string;
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount: number;
}

interface ITransectionUser {
  email: string;
  userId: string;
}

interface ITransaction {
  orderId: number;
  trackId: number;
  totalDiscount: number;
  totalprice: number;
  status: string;
  date: string;
  products: Product[];
  user: ITransectionUser;
}
// Add any other properties within the "transections" array

interface IShop {
  id: string;
  shipping: Shipping;
  active: boolean;
  shopCode: string;
  sku: string;
  name: string;
  email: string;
  mobileNumber: string;
  shopName: string;
  ownerName: string;
  icon: string;
  images: string[];
  location: Location;
  documents: Documents;
  social_connections: SocialConnections;
  transections: Transection[];
  token: string;
}

interface IAPiResponse {
  success: boolean;
  data?: any;
  error?: any;
}

// Export the interfaces for use in your application
export {
  RootState,
  AuthState,
  User,
  LoginState,
  ICredential,
  IShop,
  ITransaction,
  Product,
};
