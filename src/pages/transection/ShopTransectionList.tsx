import { useEffect, useState } from "react";
import { useRetailer } from "../../hooks/useShop";
import { ClassNames } from "../../utilities/util";
import { IShop } from "../../interface";
import EmptyView from "../../components/emptyView";
import TransectionList from "./TransectionList";

const RetailerList = () => {
  const { fetchRetailers, shopData } = useRetailer();
  const [shopId, setShopId] = useState("");
  useEffect(() => {
    fetchRetailers();
    //eslint-disable-next-line
  }, []);
  const renderShopTransectionList = () => {
    return (
      <div className='px-4 sm:px-6 lg:px-8 h-[100vh]'>
        {(!shopData || shopData?.length < 1) && (
          <EmptyView text='No Transection History.' />
        )}
        {shopData?.length > 0 && (
          <div className='mt-8 flow-root'>
            <div className='-mx-4 -my-2 sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle'>
                <table className='min-w-full border-separate border-spacing-0'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'>
                        Name
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell'>
                        Shipping Address
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'>
                        Shipping Mobile Number
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'>
                        Total Transections
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'>
                        View Transections
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopData.map((shop: IShop, index: number) => (
                      <tr key={shop?.email}>
                        <td
                          className={ClassNames(
                            index !== shopData.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}>
                          {shop?.name}
                        </td>
                        <td
                          className={ClassNames(
                            index !== shopData.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                          )}>
                          {shop?.shipping?.address}
                        </td>
                        <td
                          className={ClassNames(
                            index !== shopData.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                          )}>
                          {shop?.shipping?.mobileNumber}
                        </td>
                        <td
                          className={ClassNames(
                            index !== shopData.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          )}>
                          {shop?.transections?.length}
                        </td>
                        <td
                          className={ClassNames(
                            index !== shopData.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          )}>
                          <button
                            className='relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            onClick={() => setShopId(shop?.id)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      {!!shopId && (
        <TransectionList
          shopId={shopId}
          handleBackAction={() => setShopId("")}
        />
      )}
      {!shopId && renderShopTransectionList()}
    </>
  );
};

export default RetailerList;
