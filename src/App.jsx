import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { HomePage, WorkoutListPage, WorkoutDetailPage, ProfilePage, LoginPage, RegisterPage, NotFoundPage } from './pages'

function App() {
  return (
    <Routes>
      {/* Rotas públicas (apenas para usuários não autenticados) */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/cadastro" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />
      
      {/* Rotas protegidas (apenas para usuários autenticados) */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="treinos" element={<WorkoutListPage />} />
        <Route path="treino/:workoutId" element={<WorkoutDetailPage />} />
        <Route path="perfil" element={<ProfilePage />} />
        {/* Rota 404 para rotas protegidas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      
      {/* Rota 404 para rotas públicas não encontradas */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App