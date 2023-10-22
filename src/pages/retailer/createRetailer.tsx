import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRetailer } from "../../hooks/useShop";
import { CircleSpinner } from "../../components/loading";
import { ClassNames } from "../../utilities/util";

interface FormData {
  name: string;
  email: string;
  mobileNumber: string;
  shippingAddress: string;
  shippingMobile: string;
  ownerName: string;
  shopName: string;
  location: string;
  whatsapp: string;
  reciverName: string;
}

const CreateRetailer: React.FC = () => {
  const { addRetailer } = useRetailer();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobileNumber: "",
    shippingAddress: "",
    shippingMobile: "",
    ownerName: "",
    shopName: "",
    location: "",
    whatsapp: "",
    reciverName: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: formData?.name,
      email: formData?.email,
      mobileNumber: formData?.mobileNumber,
      shopName: formData?.shopName,
      address: formData?.location,
      whatsapp: formData?.whatsapp,
      ownerName: formData?.ownerName,
      shipping: {
        address: formData?.shippingAddress,
        mobileNumber: formData?.shippingMobile,
        reciverName: formData?.reciverName,
      },
    };

    setLoading(true);

    await addRetailer(payload);

    setLoading(false);
  };

  return (
    <div className='max-w-3xl mx-auto h-[100vh] '>
      <div className=' p-6 border border-gray-100 rounded-md mt-4 shadow-md'>
        <div className='flex justify-center items-center w-full mb-2'>
          <img
            className='w-10 h-10 text-gray-400'
            src='https://res.cloudinary.com/emerging-it/image/upload/v1697977543/Growb/default-icon/dotwsuppoztoak52dqun.png'
            alt='retailer'
          />
          <span className=' text-2xl text-gray-800 font-bold ml-2'>
            Onboard Retailer
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              name='name'
              type='text'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='mobileNumber'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Mobile Number
            </label>
            <input
              name='mobileNumber'
              type='text'
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
              required
            />
          </div>
          <div className='flex space-x-4 mb-4'>
            <div className='w-1/3'>
              <label
                htmlFor='reciverName'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Delivery Reciver Name
              </label>
              <input
                name='reciverName'
                type='text'
                value={formData.reciverName}
                onChange={handleInputChange}
                className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
                required
              />
            </div>
            <div className=' w-1/3 '>
              <label
                htmlFor='shippingAddress'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Delivery Address
              </label>
              <input
                name='shippingAddress'
                type='text'
                value={formData.shippingAddress}
                onChange={handleInputChange}
                className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
                required
              />
            </div>
            <div className='w-1/3'>
              <label
                htmlFor='shippingMobile'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Delivery Mobile Number
              </label>
              <input
                name='shippingMobile'
                type='text'
                value={formData.shippingMobile}
                onChange={handleInputChange}
                className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
                required
              />
            </div>
          </div>
          <div className='flex space-x-4 mb-4'>
            <div className=' w-1/2 '>
              <label
                htmlFor='ownerName'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Owner Name
              </label>
              <input
                name='ownerName'
                type='text'
                value={formData.ownerName}
                onChange={handleInputChange}
                className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
                required
              />
            </div>
            <div className='w-1/2'>
              <label
                htmlFor='shopName'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Shop Name
              </label>
              <input
                name='shopName'
                type='text'
                value={formData.shopName}
                onChange={handleInputChange}
                className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='location'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Location
            </label>
            <input
              name='location'
              type='text'
              value={formData.location}
              onChange={handleInputChange}
              className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='whatsapp'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Whatsapp Number
            </label>
            <input
              name='whatsapp'
              type='text'
              value={formData.whatsapp}
              onChange={handleInputChange}
              className='w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-300'
              required
            />
          </div>
          <div className='text-center'>
            <button
              className={ClassNames(
                " w-full  font-semibold py-2 px-4 rounded ",
                loading
                  ? "bg-gray-300 text-gray-800"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
              )}
              type='submit'
              disabled={loading}>
              <span className='text-sm font-semibold leading-6  mr-1'>
                {loading ? "Adding Retailer" : "Add Retailer"}
              </span>
              {loading && <CircleSpinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRetailer;
