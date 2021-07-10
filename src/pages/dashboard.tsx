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

      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-gray-500">You have a new message!</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
