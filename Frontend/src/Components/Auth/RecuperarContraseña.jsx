import { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuthStore from "../../Context/useAuthStore";
import Error from "../Layout/Error"
import 'bootstrap-icons/font/bootstrap-icons.css';
import WhatsAppButton from "../../Components/Layout/Whatsapp/WhatsAppButton";

const RecuperarContraseña = () => {
  const token = useAuthStore((state) => state.token);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const form = useRef();

  const onSubmit = (data) => {
    // Enviar el correo al usuario con la confirmación
    emailjs.sendForm('service_dsdwt6f', 'template_b4f9l48', form.current, {
      publicKey: '8dmLv8MowtYvWjLXg',
    })
    .then(
      () => {
        Swal.fire({
          title: "Mensaje enviado!",
          text: "Te contactaré pronto para continuar con la recuperación de tu contraseña.",
          icon: "success"
        });
        reset();
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Problemas con el envío!",
          text: "Estamos trabajando para solucionarlo."
        });
      },
    );

    // Enviar el correo al admin notificando la solicitud de cambio de contraseña
    emailjs.send('service_dsdwt6f', 'template_admin_notificacion', {
      emailUsuario: data.email, // Correo electrónico del usuario que está solicitando el cambio
    }, {
      publicKey: '8dmLv8MowtYvWjLXg',
    })
    .then(
      () => {
      },
      (error) => {
        console.error("Error al enviar la notificación al admin", error);
      }
    );
  };

  return (
    <>
    {!token ?
    <div id="contacto" className="main-section">
      <div className="form-area">
        <div className="container p-md-3 p-md-5 rounded my-5">
          <Row className="single-form g-0">
            <Col lg={6}>
              <div className="izquierda-contacto">
                <h2>
                  <span>Recuperar Contraseña</span>
                  <br />
                </h2>
              </div>
            </Col>
            <Col lg={6}>
              <div className="derecha-contacto">
                <i className="bi bi-caret-left-fill"></i>
                <Form
                  ref={form}
                  onSubmit={handleSubmit(onSubmit)}
                  className="formularioContacto"
                >
                     <Form.Group
                  className="mb-3"
                  controlId="formularioContacto.ControlInput1"
                >
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="nombre@mail.com"
                    name="email"
                    required
                    maxLength={74}
                    {...register("email", {
                      required: true,
                      maxLength: 74,
                      pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/i,
                    })}
                  />

                  {errors.email?.type === "required" && (
                    <p className="text-danger">El campo email es requerido</p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="text-danger">
                      El formato del email es incorrecto
                    </p>
                  )}
                </Form.Group>
                  <Button type="submit" variant="success border-3 shadow fs-3">
                    Enviar
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div> 
      <WhatsAppButton />  
    </div> : <Error/>}
    </>
  );
};

export default RecuperarContraseña;
