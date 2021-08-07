import Layout from '../components/layout';
import { useUser } from '../hooks/index';

const Dashboard = () => {
  const user = useUser({ redirectTo: '/login', redirectIfFound: '/login' });

  return (
    <Layout>
      <h1>Dashboard</h1>

      {user && <p>{`Hello ${user?.userProfile?.name}`}</p>}
    </Layout>
  );
};

export default Dashboard;
