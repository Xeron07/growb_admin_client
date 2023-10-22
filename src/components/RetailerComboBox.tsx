/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import React, { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { useRetailer } from "../hooks/useShop";
import { IShop } from "../interface";
import { ClassNames } from "../utilities/util";

interface Props {
  handleRetailerSelection: (retailer: IShop) => void;
}

const RetailerComboBox: React.FC<Props> = ({ handleRetailerSelection }) => {
  const { fetchRetailerByName } = useRetailer();
  const [query, setQuery] = useState("");
  const [selectedRetailer, setSelectedRetailer] = useState<IShop | null>(null);
  const [retailerList, setRetailerList] = useState<IShop[]>([]);

  useEffect(() => {
    if (!!query) {
      fetchRetailerList();
    }
    //eslint-disable-next-line
  }, [query]);

  const fetchRetailerList = async () => {
    const res: any = await fetchRetailerByName(query);
    if (res) {
      setRetailerList(res);
    }
  };

  return (
    <Combobox
      as='div'
      value={selectedRetailer}
      onChange={(data: IShop) => {
        setSelectedRetailer(data);
        handleRetailerSelection(data);
      }}>
      <Combobox.Label className='block text-sm font-medium leading-6 text-gray-900'>
        Retailers
      </Combobox.Label>
      <div className='relative mt-2'>
        <Combobox.Input
          className='w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(retailer: IShop) => retailer?.name}
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Combobox.Button>

        {retailerList.length > 0 && (
          <Combobox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {retailerList.map((retailer: IShop) => (
              <Combobox.Option
                key={retailer?.id}
                value={retailer}
                className={({ active }) =>
                  ClassNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-gray-100 text-gray-800" : "text-gray-700"
                  )
                }>
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <img
                        src={retailer?.icon}
                        alt=''
                        className='h-6 w-6 flex-shrink-0 rounded-full'
                      />
                      <span
                        className={ClassNames(
                          "ml-3 truncate",
                          !!selected ? "font-semibold" : ""
                        )}>
                        {retailer?.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={ClassNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}>
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default RetailerComboBox;
