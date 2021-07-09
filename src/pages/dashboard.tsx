import { GetServerSidePropsContext } from 'next';
import Layout from '../components/layout';
import { magic } from '../lib/magic';
import { useUser } from '../lib/hooks';

const Dashboard = () => {
  const user = useUser({ redirectTo: '/dashboard' });

  return (
    <Layout>
      <h1>Dashboard</h1>

      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, undefined, 2)}</pre>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const isLoggedIn = await magic?.user?.isLoggedIn();
  console.log('🙄', isLoggedIn);

  const user = await fetch('http://localhost:3000/api/user')
    .then(r => r.json())
    .then(data => {
      console.log('👀', data);
      debugger;
      return data;
      // return { user: data?.user ?? undefined };
    });

  console.log('👀', user);
  debugger;

  return {
    props: {}, // Will be passed to the page component as props
  };
};
