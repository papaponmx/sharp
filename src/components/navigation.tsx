import { FC, ReactNode } from 'react';

import Link from 'next/link';
import { useUser } from '../hooks';

type Props = {
  children?: ReactNode;
};
const Navigation: FC<Props> = ({ children }) => {
  const user = useUser();

  return (
    <>
      <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
        <div className="flex flex-col w-full md:w-20 text-gray-50  dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 bg-primary  grid place-items-center gap-3">
          <nav className="flex-grow md:block px-2 pb-2 md:pb-0 md:overflow-y-auto">
            <Link href="/dashboard">
              <a className="block mt-2 text-sm font-semibold text-gray-50 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-100 hover:bg-pink-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline place-items-center grid">
                <img src="/icons/user.svg" alt="" />
              </a>
            </Link>

            <Link href="/dashboard">
              <a className="block mt-2 text-sm font-semibold text-gray-50 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-100 hover:bg-pink-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline place-items-center grid">
                <img src="/icons/log.svg" alt="" />
              </a>
            </Link>
          </nav>
        </div>
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};

export default Navigation;
