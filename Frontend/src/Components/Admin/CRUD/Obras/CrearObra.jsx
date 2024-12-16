import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthStore from "../../../../Context/useAuthStore";
import useRegistroStore from "../../../../Context/useRegistroStore";
import { URL_OBRAS_CREAR, URL_CLIENTES } from "../../../../Constants/endpoints-API";

const CrearObra = ({ onObraRegistrado }) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const [clientes, setClientes] = useState([]);


  const getClientes = async () => {
    try {
      const response = await axios.get(URL_CLIENTES, { headers: { Authorization: `Bearer ${token}` } });
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener Clientes:', error);
    }
  };


  const handleRegistrarObra = () => {
    Swal.fire({
      title: "Registrar Obra",
      html: `
              <input id="nombreObra" placeholder="Nombre de la Obra" class="swal2-input" />
  
              <input id="direccionObra" placeholder="Direccion de la Obras"  class="swal2-input" />
              
              <input id="descripcionObra" placeholder="Descripcion de la Obra"  class="swal2-input" />

             <input id="precioObra" placeholder="Precio de la Obra" type="number" min="0" class="swal2-input" />
              <br>
              <br>
              <label><b>Fecha Inicio</b></label> 
              <br>
              <input id="fechainicioObra" placeholder="Fecha Inicio" type="date" class="swal2-input" />
              <br>
              <br>
              <label><b>Fecha Fin</b></label> 
              <br>
              <input id="fechafinObra" placeholder="Fecha Fin" type="date" class="swal2-input" />
              <br>
              <br>
              <label><b>Sector Obra</b></label> 
              <br>
              <select id="sectorObra" class="swal2-select">
                <option value="0">Privado</option>
                <option value="1">Publico</option>
              </select>
              <br>
              <br>
              <label><b>Progreso Obra</b></label> 
              <br>
              <input id="progresoObra" placeholder="Progreso de la Obra" type="number" min="0" max="100" class="swal2-input" />
              <br>
              <br>
              <label><b>Cliente</b></label> 
              <br>
              <select id="id_cliente" class="swal2-select">
               ${clientes
                .map(
                (cliente) =>
                 `<option value="${cliente.id_cliente}" ${cliente.id === cliente.id_cliente ? 'selected' : ''
                }>${cliente.nombreCliente} ${cliente.apellidoCliente}</option>`
                )
                .join('')}
               </select>

              
          `,
      confirmButtonText: "Registrar",
      showCancelButton: true,
      preConfirm: () => {
        const nombreObra = document.getElementById("nombreObra").value;
        const direccionObra = document.getElementById("direccionObra").value;
        const descripcionObra = document.getElementById("descripcionObra").value;
        const fechainicioObra = document.getElementById("fechainicioObra").value;
        const fechafinObra = document.getElementById("fechafinObra").value;
        const precioObra = document.getElementById("precioObra").value;
        const sectorObra = document.getElementById("sectorObra").value;
        const progresoObra = document.getElementById("progresoObra").value;
        const id_cliente = document.getElementById("id_cliente").value;

        // Validaciones
        const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const descripcionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const fechainicioRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const fechafinRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const precioRegex = /^[0-9]+$/;
        const sectorRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const progresoRegex = /^[0-9]+$/;
        const id_clienteRegex = /^[0-9]+$/;

        if (!nombreObra || !nombreRegex.test(nombreObra)) {
          Swal.showValidationMessage("El nombre no debe contener números.");
          return false;
        }
        if (!direccionObra || !direccionRegex.test(direccionObra)) {
          Swal.showValidationMessage("La dirección no debe contener caracteres especiales.");
          return false;
        }
        if (!descripcionObra || !descripcionRegex.test(descripcionObra)) {
          Swal.showValidationMessage("La descripción no debe contener caracteres especiales.");
          return false;
        }
        if (!fechainicioObra || !fechainicioRegex.test(fechainicioObra)) {
          Swal.showValidationMessage("La fecha de inicio no debe contener caracteres especiales.");
          return false;
        }
        if (!fechafinObra || !fechafinRegex.test(fechafinObra)) {
          Swal.showValidationMessage("La fecha de fin no debe contener caracteres especiales.");
          return false;
        }
        if (!precioObra || !precioRegex.test(precioObra)) {
          Swal.showValidationMessage("El precio no debe contener letras.");
          return false;
        }
        if (!sectorObra || !sectorRegex.test(sectorObra)) {
          Swal.showValidationMessage("El sector no debe contener caracteres especiales.");
          return false;
        }
        if (!progresoObra || !progresoRegex.test(progresoObra)) {
          Swal.showValidationMessage("El progreso no debe contener letras.");
          return false;
        }
        if (!id_cliente || !id_clienteRegex.test(id_cliente)) {
          Swal.showValidationMessage("El ID del cliente no debe contener letras.");
          return false;
        }


        return {
          nombreObra,
          direccionObra,
          descripcionObra,
          fechainicioObra,
          fechafinObra,
          precioObra,
          sectorObra,
          progresoObra,
          id_cliente,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_OBRAS_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire(
            "¡Éxito!",
            "La Obra fue registrado correctamente.",
            "success"
          );
          onObraRegistrado();
          closeRegistroModal();
        } catch (error) {
          Swal.fire(
            "Error",
            "Hubo un problema al registrar la Obra.",
            "error"
          );
        }
      } else {
        closeRegistroModal();
      }
    });
  };

  useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarObra();
    }
    getClientes();
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearObra
