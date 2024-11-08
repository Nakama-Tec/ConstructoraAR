import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { useAuthStore } from './Context/auth'

// Paginas
import Login from './Pages/Login/Login'
import Admin from './Pages/Admin/Admin'
import Home from './Pages/Home/Home'

function App() {

  const isAuth = useAuthStore(state => state.isAuth)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute isAllowed={isAuth} /> }>
          <Route path="/admin" element={<Admin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
