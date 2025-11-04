import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/api';

export function PublicRoute({ children }) {
  // Se já estiver autenticado, redireciona para home
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

