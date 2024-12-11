import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import RouteControllers from './Context/RouteControllers'

// Paginas
import Login from './Pages/Login/Login'
import Admin from './Pages/Admin/Admin'
import Home from './Pages/Home/Home'
import MainTerrenos from './Pages/Terrenos/MainTerrenos'
import MainConstrucciones from './Pages/Construcciones/MainConstrucciones'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/terrenos" element={<MainTerrenos/>} />
        <Route path="/construcciones" element={<MainConstrucciones/>} />
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
