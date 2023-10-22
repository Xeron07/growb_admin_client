import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import TabComponent from "../../components/tabs";
import AddTransaction from "./AddTransection";
import ShopTransactionList from "./ShopTransectionList";

const tabs = [
  { name: "All Transactions", href: "/transection", current: false },
  { name: "Add New Transaction", href: "/transection/add", current: false },
];

const Transactions = () => {
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
      <TabComponent title={"Transactions"} tabs={tabs} />
      <Routes>
        <Route path='/add' element={<AddTransaction />} />
        <Route path='/' element={<ShopTransactionList />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Transactions;
