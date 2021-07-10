import { FC, ReactNode } from 'react';

import Head from 'next/head';
import Navigation from './navigation';

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Sharp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation>
        <div>{children}</div>
      </Navigation>
    </>
  );
};

export default Layout;
