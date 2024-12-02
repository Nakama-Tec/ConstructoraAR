import { Link } from 'react-router-dom'

const Error = () => {
  
  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="max-w-lg text-center">
    <img 
      src="https://static.vecteezy.com/system/resources/previews/019/633/898/non_2x/404-error-in-desktop-free-png.png" 
      alt="404" 
      className="w-full max-w-xs mx-auto"
    />
    <h2 className="mt-6 text-3xl font-bold text-gray-800">Página no encontrada</h2>
    <p className="mt-4 text-gray-600">
      Lo sentimos, no pudimos encontrar la página que estás buscando. 
    </p>
    <Link 
      to={"/"}
      className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition relative top-8"
    >
      Volver al inicio
    </Link>
  </div>
</div>

  )
}

export default Error
