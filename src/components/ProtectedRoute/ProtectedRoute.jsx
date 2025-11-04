import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/api';

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Redireciona para login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return children;
}

