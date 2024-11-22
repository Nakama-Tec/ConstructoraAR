// Importaciones de librerias
import { BrowserRouter, Routes, Route } from 'react-router-dom' // estas librerias permiten el manejo de rutas en la aplicacion
import {HOME, HOME_SISTEMA_GESTION, LOGIN, VEHICULOS, PAGOS, FLUJO_CAJA, LIBRO_DIARIO,TERRENOS ,STOCK, CLIENTES, DEPARTAMENTOS, OBRAS, OPERACIONES, USUARIO, UNAUTHORIZED} from "./Routes/routes"


// Paginas
import Login from './Pages/Login/Login'
import Home from './Pages/Home/LandingPage/Home'
import FlujoCaja from "./Pages/FlujoCaja/FlujoCaja"
import LibroDiario from "./Pages/LibroDiario/LibroDiario"
import Terrenos from "./Pages/Terrenos/Terrenos"
import Stock from "./Pages/Stock/Stock"
import Clientes from "./Pages/Clientes/Clientes"
import Departamentos from "./Pages/Departamentos/Departamentos"
import Obras from "./Pages/Obras/Obras"
import Operaciones from "./Pages/Operaciones/Operaciones"
import Usuario from "./Pages/Usuarios/Usuarios"
import Pagos from "./Pages/Pagos/Pagos"
import ProtectedRoute from './Components/ProteccionRutas/ProtectedRoute'

import Error from './Components/Layout/Error'
import Vehiculos from './Pages/Vehiculos/Vehiculos'
import HomeSistemaGestion from './Pages/Home/SistemaGestion/HomeSistemaGestion'


function App() {
const roleRequired = "admin"//rol requerido para acceder a las rutas protegidas
  return (
// v7_startTransition: true, v7_relativeSplatPath: true permite que la aplicacion use el nuevo manejo de estado y rutas relativas que se implementarán en React Router v7.
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> 
      <Routes>
        {/* Rutas públicas en estas rutas pueden ingresar usuario comun sin problema es lo que pueden ver y hacer*/}
        <Route path={HOME} element={<Home/>} />
        <Route path={LOGIN} element={<Login/>} />
        {/* <Route path={LIBRO_DIARIO} element={<LibroDiario/>} /> Ruta temporal, eliminar al tenerlo listo y descomentar su version privada */}
        <Route path={PAGOS} element={<Pagos/>} /> {/* Ruta temporal*/}

        {/* Rutas protegidas */}
        <Route path={HOME} element={<ProtectedRoute roleRequired={roleRequired}><Home/></ProtectedRoute>} />
        <Route path={HOME_SISTEMA_GESTION} element={<ProtectedRoute roleRequired={roleRequired}> <HomeSistemaGestion/></ProtectedRoute>} />
        <Route path={FLUJO_CAJA} element={<ProtectedRoute roleRequired={roleRequired}> <FlujoCaja/></ProtectedRoute>} />
        <Route path={LIBRO_DIARIO} element={<ProtectedRoute roleRequired={roleRequired}> <LibroDiario/></ProtectedRoute>} />
        <Route path={TERRENOS} element={<ProtectedRoute roleRequired={roleRequired}> <Terrenos/></ProtectedRoute>} />
        <Route path={STOCK} element={<ProtectedRoute roleRequired={roleRequired}> <Stock/></ProtectedRoute>} />
        <Route path={CLIENTES} element={<ProtectedRoute roleRequired={roleRequired}> <Clientes/></ProtectedRoute>} />
        <Route path={DEPARTAMENTOS} element={<ProtectedRoute roleRequired={roleRequired}> <Departamentos/></ProtectedRoute>} />
        <Route path={OBRAS} element={<ProtectedRoute roleRequired={roleRequired}> <Obras/></ProtectedRoute>} />
        <Route path={OPERACIONES} element={<ProtectedRoute roleRequired={roleRequired}> <Operaciones/></ProtectedRoute>} />
        <Route path={VEHICULOS} element={<ProtectedRoute roleRequired={roleRequired}> <Vehiculos/></ProtectedRoute>} />
        <Route path={USUARIO} element={<ProtectedRoute roleRequired={roleRequired}> <Usuario/></ProtectedRoute>} />

        {/* Ruta no autorizada */}
        <Route path={UNAUTHORIZED} element={<div><h3>No autorizado</h3></div>} />
        
        { /* Ruta no encontradas */}

        <Route path='*' element={<Error />} />
        
        </Routes>
    </BrowserRouter>
  )
}

export default App
