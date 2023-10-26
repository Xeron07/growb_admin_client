import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../store/reducers/dashboard";

export const useDashboard = () => {
  const dispatch = useDispatch<any>();
  const dashboardStore = useSelector((state: any) => state?.dashboard);

  const fetchDashboardDetails = async () => {
    await dispatch(fetchDashboardData());
  };

  return {
    fetchDashboardDetails,
    recentTransactions: dashboardStore?.recentTransactions,
    dashboardloading: dashboardStore?.dashboardloading,
    stateData: dashboardStore?.stateData,
    topShops: dashboardStore?.topShops,
  };
};
