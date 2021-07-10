import Layout from '../components/layout';
import { useUser } from '../hooks/index';

const Dashboard = () => {
  const user = useUser({ redirectTo: '/dashboard' });

  return (
    <Layout>
      <h1>Dashboard</h1>

      {user && (
        <>
          <p>{`Hello ${user?.userProfile?.name}`}</p>
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
