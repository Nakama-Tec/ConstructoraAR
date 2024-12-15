// Importaciones de librerias
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom' // estas librerias permiten el manejo de rutas en la aplicacion
import {HOME, HOME_SISTEMA_GESTION, CERTIFICADOS,LOGIN,EMPLEADOS, VEHICULOS, FLUJO_CAJA, DETALLEVIAJES, LIBRO_DIARIO,TERRENOS ,STOCK, CLIENTES, DEPARTAMENTOS, OBRAS, OPERACIONES, VIAJES, USUARIO, UNAUTHORIZED, VTA_TERRENOS, PAGOS_DPTO, PENDIENTES, COMPRA_MATERIALES, ALQUILER, REMUNERACIONES, RECUPERAR} from "./Routes/routes"

import "bootstrap/dist/css/bootstrap.min.css";
// Paginas
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import FlujoCaja from "./Pages/FlujoCaja/FlujoCaja"
import LibroDiario from "./Pages/LibroDiario/LibroDiario"
import Terrenos from "./Pages/Terrenos/Terrenos"
import CompraMateriales from "./Pages/CompraMateriales/CompraMateriales"
import Stock from "./Pages/Stock/Stock"
import Clientes from "./Pages/Clientes/Clientes"
import Certificados from './Pages/Certificados/Certificados'
import Departamentos from "./Pages/Departamentos/Departamentos"
import Alquiler from "./Pages/Alquileres/Alquileres"
import Obras from "./Pages/Obras/Obras"
import Operaciones from "./Pages/Operaciones/Operaciones"
import Empleados from "./Pages/Empleados/Empleados"
import Usuario from "./Pages/Usuarios/Usuarios"
import Viajes from "./Pages/Viajes/Viajes"
import ProtectedRoute from './Components/ProteccionRutas/ProtectedRoute'
import Error from './Components/Layout/Error'
import Vehiculos from './Pages/Vehiculos/Vehiculos'
import HomeSistemaGestion from './Pages/Home/SistemaGestion/HomeSistemaGestion'
import VtaTerrenos from './Pages/VtaTerrenos/VtaTerrenos'
import PagosDepartamentos from './Pages/Departamentos/PagosDepartamentos'
import Pendientes from './Pages/Pendientes/Pendientes'
import Remuneraciones from './Pages/Remuneraciones/Remuneraciones'
import RecuperarPass from './Pages/RecuperarContraseña/RecuperarPass'

import MainTerrenos from './Pages/Terrenos/MainTerrenos'
import MainConstrucciones from './Pages/Construcciones/MainConstrucciones'
import MainDepartamento from './Pages/Departamentos/MainDepartamento'
import Institucional from './Pages/Institucional/Institucional'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Contacto from './Pages/Home/Contacto';
import { useEffect } from 'react'

const ScrollToTop = () => {
  
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Restaura el scroll al inicio de la página
  }, [location]); // Solo se ejecuta una vez al cargar la página

  return null; // No renderiza nada, solo realiza la acción del scroll
};

const MainContent = () => {
  const roleRequired = "admin" //rol requerido para acceder a las rutas protegidas
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/Admin");
return (
  <main className={`${!isAdminPath ? 'contenedor-main' : ''}`}>   

 
      <Routes>
        {/* Rutas públicas en estas rutas pueden ingresar usuario comun sin problema es lo que pueden ver y hacer*/}
        <Route path={HOME} element={<Home/>} />
        <Route path={LOGIN} element={<Login/>} />
        <Route path={RECUPERAR} element={<RecuperarPass/>} />
        
        {/* <Route path={LIBRO_DIARIO} element={<LibroDiario/>} /> Ruta temporal, eliminar al tenerlo listo y descomentar su version privada */}

        {/* Rutas protegidas */}
       
        <Route path={HOME_SISTEMA_GESTION} element={<ProtectedRoute roleRequired={roleRequired}> <HomeSistemaGestion/></ProtectedRoute>} />
        <Route path={FLUJO_CAJA} element={<ProtectedRoute roleRequired={roleRequired}> <FlujoCaja/></ProtectedRoute>} />
        <Route path={LIBRO_DIARIO} element={<ProtectedRoute roleRequired={roleRequired}> <LibroDiario/></ProtectedRoute>} />
        <Route path={TERRENOS} element={<ProtectedRoute roleRequired={roleRequired}> <Terrenos/></ProtectedRoute>} />
        <Route path={VTA_TERRENOS} element={<ProtectedRoute roleRequired={roleRequired}> <VtaTerrenos/></ProtectedRoute>} />
        <Route path={EMPLEADOS} element={<ProtectedRoute roleRequired={roleRequired}> <Empleados/></ProtectedRoute>} />
        <Route path={COMPRA_MATERIALES} element={<ProtectedRoute roleRequired={roleRequired}> <CompraMateriales/></ProtectedRoute>} />
        <Route path={STOCK} element={<ProtectedRoute roleRequired={roleRequired}> <Stock/></ProtectedRoute>} />
        <Route path={CLIENTES} element={<ProtectedRoute roleRequired={roleRequired}> <Clientes/></ProtectedRoute>} />
        <Route path={DEPARTAMENTOS} element={<ProtectedRoute roleRequired={roleRequired}> <Departamentos/></ProtectedRoute>} />
        <Route path={PAGOS_DPTO} element={<ProtectedRoute roleRequired={roleRequired}> <PagosDepartamentos/></ProtectedRoute>} />
        <Route path={OBRAS} element={<ProtectedRoute roleRequired={roleRequired}> <Obras/></ProtectedRoute>} />
        <Route path={OPERACIONES} element={<ProtectedRoute roleRequired={roleRequired}> <Operaciones/></ProtectedRoute>} />
        <Route path={VEHICULOS} element={<ProtectedRoute roleRequired={roleRequired}> <Vehiculos/></ProtectedRoute>} />
        <Route path={USUARIO} element={<ProtectedRoute roleRequired={roleRequired}> <Usuario/></ProtectedRoute>} />
        <Route path={PENDIENTES} element={<ProtectedRoute roleRequired={roleRequired}> <Pendientes/></ProtectedRoute>} />
        <Route path={VIAJES} element={<ProtectedRoute roleRequired={roleRequired}> <Viajes/></ProtectedRoute>} />
        <Route path={ALQUILER} element={<ProtectedRoute roleRequired={roleRequired}> <Alquiler/></ProtectedRoute>} />
        <Route path={CERTIFICADOS} element={<ProtectedRoute roleRequired={roleRequired}> <Certificados/></ProtectedRoute>} />
        <Route path={REMUNERACIONES} element={<ProtectedRoute roleRequired={roleRequired}> <Remuneraciones/></ProtectedRoute>} />
        {/* Ruta no autorizada */}
        <Route path={UNAUTHORIZED} element={<div><h3>No autorizado</h3></div>} />
        
        { /* Ruta no encontradas */}

        <Route path='*' element={<Error />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/terrenos' element={<MainTerrenos />} />
        <Route path='/departamentos' element={<MainDepartamento/>} />
        <Route path='/construcciones' element={<MainConstrucciones/>} />
        <Route path='/institucional' element={<Institucional/>} />
        </Routes>
        </main>
        )
}

function App() {


  return (
// v7_startTransition: true, v7_relativeSplatPath: true permite que la aplicacion use el nuevo manejo de estado y rutas relativas que se implementarán en React Router v7.
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> 
      <Header />
        <ScrollToTop />
        <MainContent />     
      <Footer/>
    </BrowserRouter>
  )
}

export default App
