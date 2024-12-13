import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// import RouteControllers from './Context/RouteControllers'
import "bootstrap/dist/css/bootstrap.min.css";
// Paginas
import Login from './Pages/Login/Login'
import Admin from './Pages/Admin/Admin'
import Home from './Pages/Home/Home'
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

function App() {



  return (
    <BrowserRouter>
      <Header />
      <main>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/terrenos" element={<MainTerrenos/>} />
        <Route path="/construcciones" element={<MainConstrucciones/>} />
        <Route path="/departamentos" element={<MainDepartamento/>} />
        <Route path="/institucional" element={<Institucional/>} />
        <Route path="/contacto" element={<Contacto/>} />
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
