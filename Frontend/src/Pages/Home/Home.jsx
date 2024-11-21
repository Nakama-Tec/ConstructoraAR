import './home.css'
import CarruselProyectos from '../Home/CarruselProyectos'
import PreguntasFrecuentes from './PreguntasFrecuentes'
import BannerPrincipal from './BannerPrincipal'

const Home = () => {
  return (
    <>
      <BannerPrincipal />
      <CarruselProyectos />
      <PreguntasFrecuentes/>
    </>
  )
}

export default Home