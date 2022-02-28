import {  RouteProps, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

const ProtectedRoute = ({ ...routeProps }: RouteProps) => {
  const { loggedInUser, profile } = useAuth();

  if(!loggedInUser) {
      return <Navigate to='/login' />
  }
  return <Outlet />;
};

export default ProtectedRoute;

