import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage, WorkoutListPage } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="treinos" element={<WorkoutListPage />} />
      </Route>
      {/* TODO: Implement LoginPage */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  )
}

export default App