// Importaciones de librerias
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {HOME,LOGIN, FLUJO_CAJA, LIBRO_DIARIO,TERRENOS ,STOCK, CLIENTES, DEPARTAMENTOS, OBRAS, OPERACIONES, USUARIO, UNAUTHORIZED} from "./Routes/routes"

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
        <Route path={HOME} element={<Home/>} />
        <Route path={LOGIN} element={<Login/>} />


        {/* Rutas protegidas */}
        
        <Route path={FLUJO_CAJA} element={<ProtectedRoute roleRequired={roleRequired}> <FlujoCaja/></ProtectedRoute>} />
        <Route path={LIBRO_DIARIO} element={<ProtectedRoute roleRequired={roleRequired}> <LibroDiario/></ProtectedRoute>} />
        <Route path={TERRENOS} element={<ProtectedRoute roleRequired={roleRequired}> <Terrenos/></ProtectedRoute>} />
        <Route path={STOCK} element={<ProtectedRoute roleRequired={roleRequired}> <Stock/></ProtectedRoute>} />
        <Route path={CLIENTES} element={<ProtectedRoute roleRequired={roleRequired}> <Clientes/></ProtectedRoute>} />
        <Route path={DEPARTAMENTOS} element={<ProtectedRoute roleRequired={roleRequired}> <Departamentos/></ProtectedRoute>} />
        <Route path={OBRAS} element={<ProtectedRoute roleRequired={roleRequired}> <Obras/></ProtectedRoute>} />
        <Route path={OPERACIONES} element={<ProtectedRoute roleRequired={roleRequired}> <Operaciones/></ProtectedRoute>} />
        <Route path={USUARIO} element={<ProtectedRoute roleRequired={roleRequired}> <Usuario/></ProtectedRoute>} />

        {/* Ruta no autorizada */}
        <Route path={UNAUTHORIZED} element={<div><h3>No autorizado</h3></div>} />
        
        </Routes>
    </BrowserRouter>
  )
}

export default App
