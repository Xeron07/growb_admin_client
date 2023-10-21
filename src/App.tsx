import { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/auth/login";
import { useColors } from "./hooks/useColors";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  const { body } = useColors();
  useEffect(() => {
    document.body.style.background = body.primary;
  }, [body]);
  return (
    <div className=' h-[100vh] '>
      <LoginPage />
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
