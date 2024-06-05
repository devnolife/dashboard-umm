import withAuth from '../hoc/withAuth';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome, Authenticated User</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default withAuth(Home);
