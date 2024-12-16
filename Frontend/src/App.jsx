// Importaciones de librerias

import { BrowserRouter, Routes, Route } from 'react-router-dom' // estas librerias permiten el manejo de rutas en la aplicacion
import {HOME, HOME_SISTEMA_GESTION, CERTIFICADOS,CREAR_CERTIFICADOS,LOGIN,EMPLEADOS, VEHICULOS, FLUJO_CAJA, DETALLEVIAJES, LIBRO_DIARIO,TERRENOS ,STOCK, CLIENTES, DEPARTAMENTOS, OBRAS, OPERACIONES, VIAJES, USUARIO, UNAUTHORIZED, VTA_TERRENOS, PAGOS_DPTO, PENDIENTES, COMPRA_MATERIALES, ALQUILER, REMUNERACIONES, RECUPERAR, CONTACTO, TERRENOS_ADMIN, DEPARTAMENTOS_ADMIN, CONSTRUCCIONES, INSTITUCIONAL, ERROR} from "./Routes/routes"


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
import CrearCertificado from './Pages/Certificados/CrearCertificado'
import RecuperarPass from './Pages/RecuperarContraseña/RecuperarPass'
import MainTerrenos from './Pages/Terrenos/MainTerrenos'
import MainConstrucciones from './Pages/Construcciones/MainConstrucciones'
import MainDepartamento from './Pages/Departamentos/MainDepartamento'
import Institucional from './Pages/Institucional/Institucional'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Contacto from './Pages/Home/Contacto';
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathname.current) {
      window.scrollTo(0, 0);
    }
    prevPathname.current = location.pathname;
  }, [location]);

  return null;
};

const MainContent = () => {
  const rolesRequired = ['admin', 'empleado'] //rol requerido para acceder a las rutas protegidas
  const location = useLocation();
  const isAdminPath = location.pathname.toLowerCase().startsWith("/admin"); //verifica si la ruta actual es una ruta protegida
return (
  <main className={`${!isAdminPath ? 'contenedor-main' : ''}`}> 

 
      <Routes>
        {/* Rutas públicas en estas rutas pueden ingresar usuario comun sin problema es lo que pueden ver y hacer*/}
        <Route path={HOME} element={<Home/>} />
        <Route path={LOGIN} element={<Login/>} />
        <Route path={RECUPERAR} element={<RecuperarPass/>} />
        
        {/* <Route path={LIBRO_DIARIO} element={<LibroDiario/>} /> Ruta temporal, eliminar al tenerlo listo y descomentar su version privada */}

        {/* Rutas protegidas */}
       
        <Route path={HOME_SISTEMA_GESTION} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <HomeSistemaGestion/></ProtectedRoute>} />
        <Route path={FLUJO_CAJA} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <FlujoCaja/></ProtectedRoute>} />
        <Route path={LIBRO_DIARIO} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <LibroDiario/></ProtectedRoute>} />
        <Route path={TERRENOS_ADMIN} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Terrenos/></ProtectedRoute>} />
        <Route path={VTA_TERRENOS} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <VtaTerrenos/></ProtectedRoute>} />
        <Route path={EMPLEADOS} element={<ProtectedRoute rolesRequired={['admin']}> <Empleados/></ProtectedRoute>} />
        <Route path={COMPRA_MATERIALES} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <CompraMateriales/></ProtectedRoute>} />
        <Route path={STOCK} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Stock/></ProtectedRoute>} />
        <Route path={CLIENTES} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Clientes/></ProtectedRoute>} />
        <Route path={DEPARTAMENTOS_ADMIN} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Departamentos/></ProtectedRoute>} />
        <Route path={PAGOS_DPTO} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <PagosDepartamentos/></ProtectedRoute>} />
        <Route path={OBRAS} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Obras/></ProtectedRoute>} />
        <Route path={OPERACIONES} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Operaciones/></ProtectedRoute>} />
        <Route path={VEHICULOS} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Vehiculos/></ProtectedRoute>} />
        <Route path={USUARIO} element={<ProtectedRoute rolesRequired={['admin']}> <Usuario/></ProtectedRoute>} />
        <Route path={PENDIENTES} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Pendientes/></ProtectedRoute>} />
        <Route path={VIAJES} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Viajes/></ProtectedRoute>} />
        <Route path={ALQUILER} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Alquiler/></ProtectedRoute>} />
        <Route path={CERTIFICADOS} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Certificados/></ProtectedRoute>} />
        <Route path={CREAR_CERTIFICADOS} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <CrearCertificado/></ProtectedRoute>} />
        <Route path={REMUNERACIONES} element={<ProtectedRoute rolesRequired={['admin', 'empleado']}> <Remuneraciones/></ProtectedRoute>} />
        {/* Ruta no autorizada */}
        <Route path={UNAUTHORIZED} element={<div><h3>No autorizado</h3></div>} />
        
        { /* Ruta no encontradas */}

        <Route path={ERROR} element={<Error />} />
        <Route path={CONTACTO} element={<Contacto />} />
        <Route path={TERRENOS} element={<MainTerrenos />} />
        <Route path={DEPARTAMENTOS} element={<MainDepartamento/>} />
        <Route path={CONSTRUCCIONES} element={<MainConstrucciones/>} />
        <Route path={INSTITUCIONAL} element={<Institucional/>} />
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