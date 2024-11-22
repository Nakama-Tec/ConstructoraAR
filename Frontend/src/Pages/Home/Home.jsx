import './home.css'
import CarruselServicios from '../Home/CarruselServicios'
import PreguntasFrecuentes from './PreguntasFrecuentes'
import BannerPrincipal from './BannerPrincipal'

const Home = () => {
  return (
    <>
      <BannerPrincipal />
      <CarruselServicios />
      <PreguntasFrecuentes/>
    </>
  )
}

export default Home