import React, { useState } from "react";
import { IShop } from "../../interface";
import RetailerComboBox from "../../components/RetailerComboBox";
import { toast } from "react-toastify";
import useTransaction from "../../hooks/useTransection";
import { CircleSpinner } from "../../components/loading";
import { ClassNames } from "../../utilities/util";

const AddTransection: React.FC = () => {
  const { addTransaction, isLoading } = useTransaction();
  const [retailer, setRetailer] = useState<IShop | null>(null);
  const [discount, setDiscount] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([
    {
      name: "",
      variant: "",
      unitPrice: "",
      quantity: "",
      discount: "",
      totalPrice: "",
    },
  ]);

  const handleRetailerChange = (data: IShop) => {
    setRetailer(data);
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    const updatedProducts: any = [...products];
    updatedProducts[index][field] = value;
    updatedProducts[index]["totalPrice"] = (
      updatedProducts[index]?.quantity * updatedProducts[index]?.unitPrice -
      updatedProducts[index]?.discount
    ).toFixed(2);
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        variant: "",
        unitPrice: "",
        quantity: "",
        discount: "",
        totalPrice: "",
      },
    ]);
  };

  const handleTransectionAdd = async () => {
    if (!retailer) {
      toast.error("Please Select a retailer");
    } else {
      await addTransaction({
        shopId: retailer?.id,
        totalDiscount: discount,
        products,
        date,
      });
    }
  };

  return (
    <div className='p-4 h-[100vh]'>
      <div className=' my-2 p-2 flex '>
        <span className='text-lg mr-auto font-semibold text-gray-800'>
          Transaction
        </span>
        <button
          className={ClassNames(
            "relative inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm ",
            isLoading
              ? "bg-gray-300 text-gray-800"
              : "text-white  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          )}
          onClick={() => handleTransectionAdd()}
          disabled={isLoading}>
          <div className='flex items-center justify-center'>
            <span className='text-sm font-semibold leading-6  mr-1'>
              {isLoading ? "Saving" : "Save transaction"}
            </span>
            {isLoading && <CircleSpinner />}
          </div>
        </button>
      </div>
      <div className='mb-4 flex space-x-4 '>
        <RetailerComboBox handleRetailerSelection={handleRetailerChange} />
        <input
          type='number'
          className='w-1/4 px-3 py-2 border rounded h-1/2 mt-auto'
          placeholder='Discount'
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <input
          type='date'
          className='w-1/4 px-3 py-2 border rounded h-1/2 mt-auto'
          placeholder='Date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <span className='text-base mr-auto font-bold text-gray-800 p-2 border-b border-gray-300 block mb-3'>
        Products
      </span>

      {products.map((product, index) => (
        <div key={index} className='flex space-x-4 mb-2'>
          <input
            type='text'
            className='w-1/4 px-3 py-2 border rounded'
            placeholder='Product Name'
            value={product.name}
            onChange={(e) => handleProductChange(index, "name", e.target.value)}
          />
          <input
            type='text'
            className='w-1/4 px-3 py-2 border rounded'
            placeholder='Product Variant'
            value={product.variant}
            onChange={(e) =>
              handleProductChange(index, "variant", e.target.value)
            }
          />
          <input
            type='number'
            className='w-1/6 px-3 py-2 border rounded'
            placeholder='Unit Price'
            value={product.unitPrice}
            onChange={(e) =>
              handleProductChange(index, "unitPrice", e.target.value)
            }
          />
          <input
            type='number'
            className='w-1/6 px-3 py-2 border rounded'
            placeholder='Quantity'
            value={product.quantity}
            onChange={(e) =>
              handleProductChange(index, "quantity", e.target.value)
            }
          />
          <input
            type='number'
            className='w-1/6 px-3 py-2 border rounded'
            placeholder='Discount'
            value={product.discount}
            onChange={(e) =>
              handleProductChange(index, "discount", e.target.value)
            }
          />
          <input
            type='text'
            className='w-1/6 px-3 py-2 border rounded cursor-not-allowed'
            placeholder='Total Price'
            value={product.totalPrice}
            disabled
          />
        </div>
      ))}

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 '
        onClick={handleAddProduct}>
        Add New Product
      </button>
    </div>
  );
};

export default AddTransection;
