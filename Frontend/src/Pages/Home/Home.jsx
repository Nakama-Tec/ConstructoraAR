import './home.css'
import CarruselServicios from '../Home/CarruselServicios'
import PreguntasFrecuentes from './PreguntasFrecuentes'
import BannerPrincipal from './BannerPrincipal'
import Servicios from './Servicios'
import Contacto from './Contacto'
import TopButton from '../../Components/Layout/TopButton'


const Home = () => {
  return (
    <>
      <BannerPrincipal />
      <Servicios />
      <CarruselServicios />
      <PreguntasFrecuentes/>      
      <Contacto/>    
      <TopButton />  
    </>
  )
}

export default Home