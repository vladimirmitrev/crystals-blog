import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import { Navigate, Outlet } from 'react-router-dom';

const GuestGuard = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default GuestGuard;
