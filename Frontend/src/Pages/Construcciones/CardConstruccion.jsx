
const CardConstruccion = ({ titulo, descripcion, imagen }) => {
  return (
    <div className="card-construccion">
      <img src={imagen} alt={titulo} className="card-imagen" />
      <div className="card-contenido">
        <h3 className="card-titulo">{titulo}</h3>
        <p className="card-descripcion">{descripcion}</p>
      </div>
      <a className="card-boton" href="#contacto">Consultar</a>
    </div>
  );
};

export default CardConstruccion;