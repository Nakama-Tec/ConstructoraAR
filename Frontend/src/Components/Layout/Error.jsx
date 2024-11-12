import '../../Styles/Error.css'


const Error = () => {
  


  return (
    <div className='container-error'>
      <div className='img-error'>
        <img src="https://static.vecteezy.com/system/resources/previews/019/633/898/non_2x/404-error-in-desktop-free-png.png" alt='404' />
      </div>
      <div className="title-error">
        <h2>PAGINA NO ENCONTRADA</h2>
        <button>Volver al inicio</button>
      </div>
    </div>
  )
}

export default Error
