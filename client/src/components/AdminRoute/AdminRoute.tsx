import {  RouteProps, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

const AdminRoute = ({ ...routeProps }: RouteProps) => {
  const { loggedInUser } = useAuth();
  const location = useLocation();


  if(!(loggedInUser && loggedInUser.isAdmin)) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />;
};

export default AdminRoute;

