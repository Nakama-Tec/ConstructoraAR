import './home.css'
import CarruselServicios from '../Home/CarruselServicios'
import PreguntasFrecuentes from './PreguntasFrecuentes'
import BannerPrincipal from './BannerPrincipal'
import Servicios from './Servicios'
import Contacto from './Contacto'


const Home = () => {
  return (
    <>
      <BannerPrincipal />
      <Servicios />
      <CarruselServicios />
      <PreguntasFrecuentes/>      
      <Contacto/>
    </>
  )
}

export default Home