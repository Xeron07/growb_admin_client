import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./dashboard";
import LoginPage from "../pages/auth/login";
import React from "react";

interface Props {
  isAuth: boolean;
}
const App: React.FC<Props> = ({ isAuth }) => {
  return (
    <div className=' h-[100vh] '>
      {!isAuth && <LoginPage />}
      {!!isAuth && <Dashboard />}
      <ToastContainer
        position='top-center'
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default App;
