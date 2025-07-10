import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {

  // accessing store for getting jwt token
  const { accessToken } = useAuthStore();
  const location = useLocation();

  // checks for authorization

  if (accessToken && location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }

  if (!accessToken && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
