import './home.css'
import CarruselProyectos from '../Home/CarruselProyectos'
import PreguntasFrecuentes from './PreguntasFrecuentes'
import BannerPrincipal from './BannerPrincipal'
import Servicios from './Servicios'

const Home = () => {
  return (
    <>
      <BannerPrincipal />
      <CarruselProyectos />
      <Servicios />
      <PreguntasFrecuentes/>
    </>
  )
}

export default Home