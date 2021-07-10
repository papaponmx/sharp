import Layout from '../components/layout';
import { useUser } from '../hooks';

const Home = () => {
  useUser({ redirectTo: '/dashboard', redirectIfFound: '/login' });

  return <Layout></Layout>;
};

export default Home;
