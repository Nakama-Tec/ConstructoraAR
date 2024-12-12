import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import RouteControllers from './Context/RouteControllers'
import "bootstrap/dist/css/bootstrap.min.css";
// Paginas
import Login from './Pages/Login/Login'
import Admin from './Pages/Admin/Admin'
import Home from './Pages/Home/Home'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
