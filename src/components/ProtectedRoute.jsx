import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuthStore();
  const location = useLocation();

  if (accessToken && location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }
  
  if (!accessToken && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
