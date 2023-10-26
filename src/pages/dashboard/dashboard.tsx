import { useEffect } from "react";
import { Fragment } from "react";
import LoadingSpinner from "../../components/Loader";
import { useDashboard } from "../../hooks/useDashboard";
import { ClassNames } from "../../utilities/util";
import { IRecentTransaction, ITopShop } from "../../interface";
import {
  CircleStackIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Menu, Transition } from "@headlessui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dashboard = () => {
  const {
    fetchDashboardDetails,
    recentTransactions,
    dashboardloading,
    stateData,
    topShops,
  } = useDashboard();

  useEffect(() => {
    fetchDashboardDetails();
    //eslint-disable-next-line
  }, []);

  const statuses = {
    done: "text-green-700 bg-green-50 ring-green-600/20",
    processing: "text-gray-600 bg-gray-50 ring-gray-500/10",
    due: "text-red-700 bg-red-50 ring-red-600/10",
  };

  const loadingView = () => {
    return (
      <div className='w-full h-[100vh] flex justify-center items-center'>
        <LoadingSpinner />
      </div>
    );
  };

  const transactionListView = () => {
    return (
      <div className='space-y-16 py-14 xl:space-y-20 mx-3 px-2 rounded-md border my-4 '>
        {/* Recent activity table */}
        <div>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none'>
              Recent activity
            </h2>
          </div>
          <div className='mt-6 overflow-hidden border-t border-gray-100'>
            <div className='mx-auto w-full px-4 sm:px-6 lg:px-8'>
              <div className='mx-auto w-full lg:mx-0 lg:max-w-none'>
                <table className='w-full text-left'>
                  <thead className='sr-only'>
                    <tr>
                      <th>Amount</th>
                      <th className='hidden sm:table-cell'>Client</th>
                      <th>More details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Fragment key={"001"}>
                      <tr className='text-sm leading-6 text-gray-900 shadow-sm border-gray-600 w-full'>
                        <th className='relative isolate py-2 font-semibold text-left'>
                          Transaction Amount
                        </th>
                        <th className='relative isolate py-2 font-semibold text-left'>
                          Retailer
                        </th>
                        <th className='relative isolate py-2 font-semibold text-right'>
                          Transaction Made By
                        </th>
                      </tr>
                      {recentTransactions.map(
                        (transaction: IRecentTransaction, index: number) => (
                          <tr key={index}>
                            <td className='relative py-5 pr-6'>
                              <div className='flex gap-x-6'>
                                <CircleStackIcon
                                  className='hidden h-6 w-5 flex-none text-gray-400 sm:block'
                                  aria-hidden='true'
                                />
                                <div className='flex-auto'>
                                  <div className='flex items-start gap-x-3'>
                                    <div className='text-sm font-medium leading-6 text-gray-900'>
                                      {transaction?.totalAmount}
                                    </div>
                                    <div
                                      className={ClassNames(
                                        statuses["processing"],
                                        "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                      )}>
                                      {transaction.status}
                                    </div>
                                  </div>
                                  {transaction.date ? (
                                    <div className='mt-1 text-xs leading-5 text-gray-500'>
                                      {transaction.date}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className='absolute bottom-0 right-full h-px w-screen bg-gray-100' />
                              <div className='absolute bottom-0 left-0 h-px w-screen bg-gray-100' />
                            </td>
                            <td className='hidden py-5 pr-6 sm:table-cell'>
                              <div className='text-sm leading-6 text-gray-900'>
                                {transaction?.shopName}
                              </div>
                              <div className='mt-1 text-xs leading-5 text-gray-500'>
                                Retailer
                              </div>
                            </td>
                            <td className='py-5 text-right'>
                              <div className='flex justify-end'>
                                <span className='text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500'>
                                  {transaction?.user?.email}

                                  <span className='sr-only'>Added By</span>
                                </span>
                              </div>
                              <div className='mt-1 text-xs leading-5 text-gray-500'>
                                Track Id{" "}
                                <span className='text-gray-900'>
                                  #{transaction?.trackId}
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </Fragment>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const stateView = () => {
    const stats = [
      {
        name: "Total Transactions",
        value: stateData?.totalTransactions,
        change: "",
        changeType: "positive",
      },
      {
        name: "Total Amount",
        value: stateData?.totalAmountSum,
        change: "",
        changeType: "positive",
      },
      {
        name: "Revenue",
        value: (Number(stateData?.totalAmountSum) * 0.05).toFixed(2) || 0.0,
        change: "",
        changeType: "positive",
      },
      {
        name: "Average",
        value: (
          (Number(stateData?.totalAmountSum) * 0.05 || 0.0) /
            Number(stateData?.totalTransactions) || 1
        ).toFixed(2),
        change: "",
        changeType: "positive",
      },
    ];
    return (
      <div className='border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5 shadow'>
        <dl className='mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0'>
          {stats.map((stat, statIdx) => (
            <div
              key={stat.name}
              className={ClassNames(
                statIdx % 2 === 1
                  ? "sm:border-l"
                  : statIdx === 2
                  ? "lg:border-l"
                  : "",
                "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
              )}>
              <dt className='text-sm font-medium leading-6 text-gray-500'>
                {stat.name}
              </dt>
              {!!stat?.change && (
                <dd
                  className={ClassNames(
                    stat.changeType === "negative"
                      ? "text-rose-600"
                      : "text-gray-700",
                    "text-xs font-medium"
                  )}>
                  {stat.change}
                </dd>
              )}
              <dd className='w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900'>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  };

  const chartView = () => {
    const labels = recentTransactions?.map((t: IRecentTransaction) => t?.date);
    const tData = recentTransactions?.map((t: IRecentTransaction) =>
      isNaN(t?.totalAmount) ? 0.0 : (t.totalAmount * 0.05).toFixed(2)
    );
    const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: "Revenue",
          data: tData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Last 10 Transaction Data",
        },
      },
    };

    return (
      <div className='px-4 py-2 mx-auto w-4/5 shadow-md mt-2 rounded-md'>
        <Line options={options} data={data} />
      </div>
    );
  };

  const topShopView = () => {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-5'>
        <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
          <div className='flex items-center justify-between'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Top Retailers
            </h2>
          </div>
          <ul className='mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8'>
            {topShops.map((client: ITopShop, index: number) => (
              <li
                key={index}
                className='overflow-hidden rounded-xl border border-gray-200'>
                <div className='flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6'>
                  <img
                    src={client?.icon}
                    alt={client?.shopName}
                    className='h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10'
                  />
                  <div className='text-sm font-medium leading-6 text-gray-900'>
                    {client?.shopName}
                  </div>
                  <Menu as='div' className='relative ml-auto'>
                    <Menu.Button className='-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500'>
                      <span className='sr-only'>Open options</span>
                      <EllipsisHorizontalIcon
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items className='absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={ClassNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}>
                              Owner name:{" "}
                              <span className='sr-only'>
                                , {client?.ownerName}
                              </span>
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
                  <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500'>Mobile Number</dt>
                    <dd className='text-gray-700'>{client?.mobileNumber}</dd>
                  </div>
                  <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500'>Amount</dt>
                    <dd className='flex items-start gap-x-2'>
                      <div className='font-medium text-gray-900'>
                        {client?.totalAmount}
                      </div>
                      <div
                        className={ClassNames(
                          statuses["due"],
                          "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                        )}>
                        🏆 {index + 1}
                      </div>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const mainView = () => {
    return (
      <div className='min-h-[100vh] h-auto bg-white '>
        {stateView()}
        {!!recentTransactions && chartView()}
        {!!recentTransactions && transactionListView()}
        {topShopView()}
        <div className='py-4' />
      </div>
    );
  };
  return (
    <>
      {dashboardloading === "loading" && loadingView()}
      {dashboardloading !== "loading" && mainView()}
    </>
  );
};

export default Dashboard;
