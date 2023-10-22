import { Outlet } from "react-router-dom";
import LeftBar from "./leftBar";
import RightBar from "./rightbar";

const Home = () => {
  return (
    <>
      <LeftBar />
      <RightBar />
      <Outlet />
    </>
  );
};

export default Home;
