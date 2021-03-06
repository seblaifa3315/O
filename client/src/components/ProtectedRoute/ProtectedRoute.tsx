import {  RouteProps, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

const ProtectedRoute = ({ ...routeProps }: RouteProps) => {
  const { loggedInUser, profile } = useAuth();
  const location = useLocation();

  if(!loggedInUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />;
};

export default ProtectedRoute;

