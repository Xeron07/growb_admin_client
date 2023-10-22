import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import TabComponent from "../../components/tabs";
import RetailerList from "./retailersList";
import CreateRetailer from "./createRetailer";

const tabs = [
  { name: "All Retailers", href: "/retailer", current: false },
  { name: "Add New", href: "/retailer/add", current: false },
];

const Retailer = () => {
  const location = useLocation();

  // Function to update the tabs based on the current URL
  const updateTabs = () => {
    tabs.forEach((tab) => {
      tab.current = location.pathname === tab.href;
    });
  };

  // Call the function when the component renders
  updateTabs();
  return (
    <div className='bg-white'>
      <TabComponent title={"Retailer"} tabs={tabs} />
      <Routes>
        <Route path='/add' element={<CreateRetailer />} />
        <Route path='/' element={<RetailerList />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Retailer;
