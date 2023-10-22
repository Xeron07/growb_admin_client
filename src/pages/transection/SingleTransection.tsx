import React, { useEffect, useState } from "react";
import { IShop, ITransaction, Product } from "../../interface";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { generatePurchageOrder } from "../../utilities/generateDocument";

interface Props {
  shop: IShop | null;
  transaction: ITransaction;
  handleBackAction: () => void;
}

const TransactionCard: React.FC<Props> = ({
  shop,
  transaction,
  handleBackAction,
}) => {
  useEffect(() => {
    if (!!transaction) {
      !transaction?.totalprice
        ? calculateTotalPrice()
        : setTotalPrice((transaction?.totalprice).toFixed(2));
    }
    //eslint-disable-next-line
  }, [transaction]);

  const [totalPrice, setTotalPrice] = useState("0");

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const product of transaction?.products) {
      // Assuming you have properties: unit_price, quantity, and discount
      const unitPrice = product?.unitPrice;
      const quantity = product?.quantity;
      const discount = product?.discount;

      if (!isNaN(unitPrice) && !isNaN(quantity) && !isNaN(discount)) {
        // Calculate the total price for the product
        const productTotal = unitPrice * quantity - discount;

        // Add the product total to the overall total
        totalPrice += productTotal;
      }
    }

    setTotalPrice((totalPrice - transaction?.totalDiscount).toFixed(2));
  };

  return (
    <div className='bg-white  p-4 m-4'>
      <div className='ml-0 mr-auto' onClick={() => handleBackAction()}>
        <ArrowLeftIcon className='w-6 h-6 text-gray-700' />
      </div>
      <div className='flex items-center w-full px-3 py-2 rounded-md shadow-md border border-gray-100 mt-5'>
        <div className='float-left px-2 my-4'>
          <div className='text-xl font-bold mb-1'>{`Order #${transaction?.orderId}`}</div>
          <div className='text-gray-600 mb-1'>{`Track ID: ${transaction?.trackId}`}</div>
          <div className='text-gray-600'>{`Status: ${transaction?.status}`}</div>
        </div>
        <div className='ml-auto px-2 my-4'>
          <div className='mt-4 text-xl font-semibold'>{`Total Price: ${totalPrice}`}</div>
          <div className='mt-2 text-xl font-semibold'>{`Total Discount: ${transaction?.totalDiscount}`}</div>
        </div>
      </div>

      {!!shop && (
        <div className='flex items-center w-full px-3 py-2 rounded-md shadow-md border border-gray-100 mt-5'>
          <div className='text-xl font-semibold mr-auto'>Documents</div>
          <div className='flex justify-center space-x-4 items-center ml-auto'>
            <button
              type='button'
              className='inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white'
              disabled={!transaction?.products}
              onClick={() => generatePurchageOrder(shop, transaction)}>
              Purchase Order
            </button>
          </div>
        </div>
      )}
      <div className='-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead>
            <tr>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                Product Name
              </th>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                Variant
              </th>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                Quantity
              </th>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                Unit Price
              </th>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                Total Price
              </th>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                Discount
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {transaction?.products.map((product: Product, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {product?.variant}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {product?.quantity}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {product?.unitPrice}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {product?.totalPrice}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {product?.discount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionCard;
