import { useEffect } from "react";
import { useRetailer } from "../../hooks/useShop";
import { ClassNames } from "../../utilities/util";
import { IShop } from "../../interface";
import EmptyView from "../../components/emptyView";

const RetailerList = () => {
  const { fetchRetailers, shopData } = useRetailer();
  useEffect(() => {
    fetchRetailers();
    //eslint-disable-next-line
  }, []);
  return (
    <div className='px-4 sm:px-6 lg:px-8 h-[100vh]'>
      {shopData?.length < 1 && <EmptyView text='No Reatiler Added Yet.' />}
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
                      #
                    </th>
                    <th
                      scope='col'
                      className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'>
                      Name
                    </th>
                    <th
                      scope='col'
                      className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell'>
                      Address
                    </th>
                    <th
                      scope='col'
                      className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'>
                      Email
                    </th>
                    <th
                      scope='col'
                      className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'>
                      Mobile Number
                    </th>
                    <th
                      scope='col'
                      className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'>
                      WhatsApp Number
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
                          "whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 lg:pl-8"
                        )}>
                        <img
                          src={shop?.icon}
                          alt='shop-icon'
                          className='w-6 h-6 m-2'
                        />
                      </td>
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
                        {shop?.location?.address}
                      </td>
                      <td
                        className={ClassNames(
                          index !== shopData.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                        )}>
                        {shop?.email}
                      </td>
                      <td
                        className={ClassNames(
                          index !== shopData.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        )}>
                        {shop?.mobileNumber}
                      </td>
                      <td
                        className={ClassNames(
                          index !== shopData.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        )}>
                        {shop?.social_connections?.whatsapp}
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

export default RetailerList;
