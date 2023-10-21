import { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/auth/login";
import { useColors } from "./hooks/useColors";
function App() {
  const { body } = useColors();
  useEffect(() => {
    document.body.style.background = body.primary;
  }, [body]);
  return (
    <div className=' h-[100vh] '>
      <LoginPage />
    </div>
  );
}

export default App;
