import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouteControllers from './Context/RouteControllers'

// Paginas
import Login from './Pages/Login/Login'
// import Admin from './Pages/Admin/Admin'
import Home from './Pages/Home/Home'

function App(props) {

  // const isAuth = useAuthStore(state => state.isAuth)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />

          <Route path="/admin" component={<RouteControllers/>} {...props}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
