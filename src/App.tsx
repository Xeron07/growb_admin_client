import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard";
import { useLogin } from "./hooks/useAuth";
import LoginPage from "./pages/auth/login";
function App() {
  const { token, user } = useLogin();
  useEffect(() => {
    document.body.style.background = "#f9fafb";
  }, []);

  return (
    <div className=' h-[100vh] '>
      {(!token || !user) && <LoginPage />}
      {!!token && !!user && <Dashboard />}
      <ToastContainer
        position='top-left'
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
}

export default App;
