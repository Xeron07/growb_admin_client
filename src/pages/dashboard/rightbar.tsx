import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Retailer from "../retailer";
import Transection from "../transection";

const RightBar = () => {
  return (
    <>
      <main className='lg:pl-72'>
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/retailer/*' element={<Retailer />} />
            <Route path='/transection/*' element={<Transection />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default RightBar;
