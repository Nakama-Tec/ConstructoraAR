import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import RouteControllers from './Context/RouteControllers'

// Paginas
import Login from './Pages/Login/Login'
import Admin from './Pages/Admin/Admin'
import Home from './Pages/Home/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas en estas rutas pueden ingresar usuario comun sin problema es lo que pueden ver y hacer*/}

        


        {/* Rutas protegidas */}

        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
