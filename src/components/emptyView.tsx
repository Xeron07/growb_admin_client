import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
  text?: string;
}
const EmptyView: React.FC<Props> = ({ text = "No Data Found" }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <button
        type='button'
        className='relative block w-1/2 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
        <ExclamationTriangleIcon className='mx-auto h-12 w-12 text-gray-400' />
        <span className='mt-2 block text-sm font-semibold text-gray-900'>
          {text}
        </span>
      </button>
    </div>
  );
};

export default EmptyView;
