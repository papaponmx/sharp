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
        <div className="flex flex-col w-full md:w-20 text-gray-50  dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 bg-pink-400  grid place-items-center">
          <nav className="flex-grow md:block px-2 pb-2 md:pb-0 md:overflow-y-auto">
            <Link href="/dashboard">
              <a className="block mt-2 text-sm font-semibold text-gray-50 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline place-items-center grid">
                <svg
                  width="42"
                  height="43"
                  viewBox="0 0 42 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.523 36.339C33.7253 34.0716 31.9677 32.0681 29.5227 30.6391C27.0776 29.2101 24.0819 28.4356 21 28.4356C17.9181 28.4356 14.9224 29.2101 12.4773 30.6391C10.0323 32.0681 8.27469 34.0716 7.47704 36.339"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="21"
                    cy="14.2178"
                    rx="7"
                    ry="7.10889"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
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
