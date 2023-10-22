import { Link } from "react-router-dom";
import { ClassNames } from "../utilities/util";

interface ITab {
  name: string;
  href: string;
  current: boolean;
}
interface Props {
  tabs: ITab[];
  title: string;
}

const TabComponent: React.FC<Props> = ({ tabs, title }) => {
  return (
    <div className='border-b px-7 py-6 border-gray-200 bg-white w-full drop-shadow-sm pb-5 sm:pb-0'>
      <h3 className='text-base font-semibold leading-6 text-gray-900'>
        {title}
      </h3>
      <div className='mt-3 sm:mt-4'>
        <div className='sm:hidden'>
          <label htmlFor='current-tab' className='sr-only'>
            Select a tab
          </label>
          <select
            id='current-tab'
            name='current-tab'
            className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            defaultValue={tabs?.find((tab) => tab.current)?.name}>
            {tabs.map((tab) => (
              <option key={tab?.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className='hidden sm:block'>
          <nav className='-mb-px flex space-x-8'>
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={ClassNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}>
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
