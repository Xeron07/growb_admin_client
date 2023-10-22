import { useEffect } from "react";
import LeftBar from "./leftBar";
import RightBar from "./rightbar";
import { redirect } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";

const Home = () => {
  const { token } = useLogin();

  useEffect(() => {
    if (!token) redirect("/");
  }, [token]);

  return (
    <>
      <LeftBar />
      <RightBar />
    </>
  );
};

export default Home;
