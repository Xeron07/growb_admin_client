import React, { ChangeEvent, useEffect, useState } from "react";
import { IShop, ITransaction, Product } from "../../interface";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  generateInvoice,
  generatePurchageOrder,
} from "../../utilities/generateDocument";
import BlankModal from "../../lib/Modal/BlankModal";
import { toast } from "react-toastify";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [menufectureData, setMenufectureData] = useState({
    name: "",
    address: "",
  });

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setMenufectureData({
      ...menufectureData,
      [name]: value,
    });
  };

  const handlePOGenerate = () => {
    setModalOpen(false);
    if (!menufectureData.address || !menufectureData.name) {
      toast.error("Please Enter Valid Manufacturer Data");
    } else if (!!shop) {
      generatePurchageOrder(shop, transaction, menufectureData);
    }
  };

  const handleInvoiceGenerate = () => {
    setInvoiceModalOpen(false);
    if (!shippingCost) {
      toast.error("Please Enter Valid Shipping Cost");
    } else if (!!shop) {
      generateInvoice(shop, transaction, shippingCost);
    }
  };

  const renderMenuFectureModal = () => {
    return (
      <div className='w-full h-full px-3 py-2 flex justify-center items-center'>
        <div>
          <h2 className='mb-6'>Manufacturer Information</h2>
          <div className='relative mb-4'>
            <label
              htmlFor='name'
              className='absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'>
              Manufacturer Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='Jane Smith'
              onChange={handleInputChange}
            />
          </div>
          <div className='relative mb-4'>
            <label
              htmlFor='name'
              className='absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'>
              Manufacturer Address
            </label>
            <input
              type='text'
              name='address'
              id='address'
              className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='Dhaka'
              onChange={handleInputChange}
            />
          </div>
          <button
            type='button'
            className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            onClick={() => handlePOGenerate()}>
            Generate Document
          </button>
        </div>
      </div>
    );
  };

  const renderInvoiceModal = () => {
    return (
      <div className='w-full h-full px-3 py-2 flex justify-center items-center'>
        <div>
          <h2 className='mb-6'>Shipping Information</h2>
          <div className='relative mb-4'>
            <label
              htmlFor='name'
              className='absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'>
              Shipping Cost
            </label>
            <input
              type='number'
              name='cost'
              id='cost'
              className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='0.00'
              onChange={(e) =>
                setShippingCost(
                  !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0
                )
              }
            />
          </div>

          <button
            type='button'
            className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            onClick={() => handleInvoiceGenerate()}>
            Generate Document
          </button>
        </div>
      </div>
    );
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
          <div className='mt-2 text-xl font-semibold'>{`Total Discount: ${
            !!transaction?.totalDiscount ? transaction?.totalDiscount : "0.00"
          }`}</div>
        </div>
      </div>

      {!!shop && (
        <div className='flex items-center w-full px-3 py-2 rounded-md shadow-md border border-gray-100 mt-5'>
          <div className='text-xl font-semibold mr-auto'>Documents</div>
          <div className='flex justify-center space-x-4 items-center ml-auto'>
            <button
              type='button'
              className='inline-flex mr-2 items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white'
              disabled={!transaction?.products}
              onClick={() => setModalOpen(true)}>
              Purchase Order
            </button>

            <button
              type='button'
              className='inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white'
              disabled={!transaction?.products}
              onClick={() => setInvoiceModalOpen(true)}>
              Invoice
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
      <BlankModal
        isOpen={isModalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}>
        {renderMenuFectureModal()}
      </BlankModal>
      <BlankModal
        isOpen={isInvoiceModalOpen}
        handleClose={() => {
          setInvoiceModalOpen(false);
        }}>
        {renderInvoiceModal()}
      </BlankModal>
    </div>
  );
};

export default TransactionCard;
