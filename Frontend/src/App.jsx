// Importaciones de librerias
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Paginas
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import FlujoCaja from "./Pages/FlujoCaja/FlujoCaja"
import LibroDiario from "./Pages/LibroDiario/LibroDiario"
import Terrenos from "./Pages/Terrenos/Terrenos"
import Stock from "./Pages/Stock/Stock"
import Clientes from "./Pages/Clientes/Clientes"
import Departamentos from "./Pages/Departamentos/Departamentos"
import Obras from "./Pages/Obras/Obras"
import Operaciones from "./Pages/Operaciones/Operaciones"
import Usuario from "./Pages/Usuarios/Usuarios"
import ProtectedRoute from './Components/ProteccionRutas/ProtectedRoute'

function App() {
const roleRequired = "admin"
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas en estas rutas pueden ingresar usuario comun sin problema es lo que pueden ver y hacer*/}
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />


        {/* Rutas protegidas */}
        
        <Route path="/FlujoCaja" element={<ProtectedRoute roleRequired={roleRequired}> <FlujoCaja/></ProtectedRoute>} />
        <Route path="/LibroDiario" element={<ProtectedRoute roleRequired={roleRequired}> <LibroDiario/></ProtectedRoute>} />
        <Route path="/Terrenos" element={<ProtectedRoute roleRequired={roleRequired}> <Terrenos/></ProtectedRoute>} />
        <Route path="/Stock" element={<ProtectedRoute roleRequired={roleRequired}> <Stock/></ProtectedRoute>} />
        <Route path="/Clientes" element={<ProtectedRoute roleRequired={roleRequired}> <Clientes/></ProtectedRoute>} />
        <Route path="/Departamentos" element={<ProtectedRoute roleRequired={roleRequired}> <Departamentos/></ProtectedRoute>} />
        <Route path="/Obras" element={<ProtectedRoute roleRequired={roleRequired}> <Obras/></ProtectedRoute>} />
        <Route path="/Operaciones" element={<ProtectedRoute roleRequired={roleRequired}> <Operaciones/></ProtectedRoute>} />
        <Route path="/Usuario" element={<ProtectedRoute roleRequired={roleRequired}> <Usuario/></ProtectedRoute>} />

        {/* Ruta no autorizada */}
        <Route path="/unauthorized" element={<div><h3>No autorizado</h3></div>} />
        
        </Routes>
    </BrowserRouter>
  )
}

export default App
