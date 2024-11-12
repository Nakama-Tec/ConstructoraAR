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
        <Route path="/" element={<Home/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
