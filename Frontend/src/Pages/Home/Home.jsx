import './home.css'
import CarruselServicios from '../Home/CarruselServicios'
import PreguntasFrecuentes from './PreguntasFrecuentes'
import BannerPrincipal from './BannerPrincipal'
import Servicios from './Servicios'

const Home = () => {
  return (
    <>
      <BannerPrincipal />
      <Servicios />
      <CarruselServicios />
      <PreguntasFrecuentes/>
    </>
  )
}

export default Home