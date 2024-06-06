import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
const withAuth = (WrappedComponent) => {
  return (props) => {
    const { token, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!loading && !token) {
        router.push('/login');
      }
    }, [loading, token]);

    if (loading || !token) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
