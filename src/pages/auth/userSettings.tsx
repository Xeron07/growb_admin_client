import { Fragment, ReactElement } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ClassNames } from "../../utilities/util";
import { useLogin } from "../../hooks/useAuth";

interface Props {
  children: ReactElement;
}

const UserSetting: React.FC<Props> = ({ children }) => {
  const { user, signOut } = useLogin();
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button>{children}</Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute right-0 left-[12%] z-10 -top-[250%] w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-4 py-3'>
            <p className='text-sm'>Signed in as</p>
            <p className='truncate text-sm font-medium text-gray-900'>
              {user?.name}
            </p>
          </div>
          <div className='py-1'>
            <form>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={ClassNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                    onClick={() => signOut()}>
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserSetting;
