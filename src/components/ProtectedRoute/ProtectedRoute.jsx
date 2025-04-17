// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const parseJwt = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export default function ProtectedRoute({ onlyAdmin = false }) {
  const token = sessionStorage.getItem('token');
  const user  = parseJwt(token);

  if (!token || !user) return <Navigate to="/" replace />;

  if (onlyAdmin && user.role !== 'admin') return <Navigate to="/home" replace />;

  return <Outlet />;
}
