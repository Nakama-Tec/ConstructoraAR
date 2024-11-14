import { Button, Row, Form } from "react-bootstrap";
import axios from 'axios';
import { useState,useEffect } from 'react';
import useAuthStore from '../../../Context/useAuthStore';
import SweetAlert from 'react-bootstrap-sweetalert'; // SweetAlert es un componente que se usa para mostrar alertas

// no usamos useNavigate ni Link porque no vamos a navegar a otra pagina 

const Prueba1 = () => {

  const initialState = {
    nombreCliente: "",
    condicionCliente: "",
    cuilCliente: "",
    telefonoCliente: "",
    mailCliente: "",
    direccionCliente: "",
    datosGarantes: "",
    activoCliente: ""
  };

  const [datos, setDatos] = useState(initialState); // setDatos es una funcion que se usa para cambiar el estado de los datos
  const [showAlert, setShowAlert] = useState(false); // estado que se usa para mostrar la alerta
  const token = useAuthStore((state) => state.token); // esto es necesario para generar el token y ver usuarios admin tengan previlegios
  const userRole = useAuthStore((state) => state.userRole); // useRole es una funcion que se usa para ver si el usuario es admin
  const clearAuth = useAuthStore((state) => state.clearAuth); // clearAuth es una funcion que se usa para cerrar sesion

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value }); // setDatos es una funcion que se usa para cambiar el estado de los datos
  };

  const handleSave = async (e) => { // async es una funcion que se usa para hacer una funcion asincrona
    e.preventDefault(); // e.preventDefault() es una funcion que se usa para prevenir el comportamiento por defecto de un evento
    setShowAlert(true); 
    try {
      let response = await axios.post(URL_CLIENTES_CREAR, {
        nombreCliente: datos.nombreCliente,
        condicionCliente: datos.condicionCliente,
        cuilCliente: datos.cuilCliente,
        telefonoCliente: datos.telefonoCliente,
        mailCliente: datos.mailCliente,
        direccionCliente: datos.direccionCliente,
        datosGarantes: datos.datosGarantes,
        activoCliente: datos.activoCliente
      }, {
        headers: { // headers es un objeto que se usa para enviar informacion al servidor  
          Authorization: `Bearer ${token}` // Asegúrate de tener el token adecuado
        }
      });
      if (response) {
        alert("Nuevo Cliente Agregado");
        setShowAlert(true); // setShowAlert es una funcion que se usa para mostrar la alerta
        setDatos(initialState); // Restablecer el estado de los datos
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hideAlert = () => { setShowAlert(false); };

  return (
    <div>
      <h2>Crear Cliente</h2>

      <Form style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="modalCrear">
        <Form.Group style={{ width: "40%" }} className="mb-3" controlId="exampleForm.ControlInput1">
          <Row>
            <Form.Label> Nombre del Cliente: </Form.Label>
            <Form.Control type="text" placeholder="Nombre del Cliente" onChange={handleChange} name="nombreCliente" className="nombreCliente" />
            <br />
            <Form.Label> Condicion del Cliente: </Form.Label>
            <Form.Control type="text" placeholder="Condicion del Cliente" onChange={handleChange} name="condicionCliente" className="condicionCliente" />
            <br />
            <Form.Label> CUIL del Cliente: </Form.Label>
            <Form.Control type="text" placeholder="CUIL del Cliente" onChange={handleChange} name="cuilCliente" className="cuilCliente" />
            <br />
            <Form.Label> Telefono del Cliente: </Form.Label>
            <Form.Control type="text" placeholder="Telefono del Cliente" onChange={handleChange} name="telefonoCliente" className="telefonoCliente" />
            <br />
            <Form.Label> Mail del Cliente: </Form.Label>
            <Form.Control type="text" placeholder="Mail del Cliente" onChange={handleChange} name="mailCliente" className="mailCliente" />
            <br />
            <Form.Label> Direccion del Cliente: </Form.Label>
            <Form.Control type="text" placeholder="Direccion del Cliente" onChange={handleChange} name="direccionCliente" className="direccionCliente" />
            <br />
            <Form.Label> Datos de los Garantes: </Form.Label>
            <Form.Control type="text" placeholder="Datos de los Garantes" onChange={handleChange} name="datosGarantes" className="datosGarantes" />
            <br />
            <Form.Label> Estado del Cliente: </Form.Label>
            <Form.Control as="select" onChange={handleChange} name="activoCliente" value={datos.activoCliente || ""} className="activoCliente" required >
              <option value="">Seleccione un Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Control>
          </Row>
        </Form.Group>
      </Form>
      <br />

      <Button onClick={handleSave}>GUARDAR</Button>
      {/* en el siguiente codigo se usa un formulario para crear un cliente y se usa el SweetAlert para mostrar una alerta */}
      {showAlert && (<SweetAlert success title={<span style={{ color: 'black' }}>Gracias</span>} onConfirm={hideAlert}>
        <span style={{ color: 'black' }}>Cliente Agregado Correctamente!</span>
      </SweetAlert>)}
    </div>
  );
};

export default Prueba1;