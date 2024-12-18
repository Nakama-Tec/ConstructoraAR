import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import { URL_ALQUILERES, URL_PAGOS_ALQUILERES_CREAR } from '../../../../../Constants/endpoints-API';

const CrearPagoDepto = ({ onPagoAlquilerRegistrado }) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const [alquileres, setAlquileres] = useState([]);

  const getClientes = async () => {
    try {
      const response = await axios.get(URL_ALQUILERES, { headers: { Authorization: `Bearer ${token}` } });
      setAlquileres(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleRegistrarDepto = () => {

    Swal.fire({
      title: 'Registrar Pago Alquiler',
      html: `
        <input id="MontoPagoAlquiler" placeholder="Monto Pagado" type="number" min="0" class="swal2-input" />
        <br/>
        <br/>
        <label><strong>Selecciona la fecha de pago:</strong></label>
        <br/>
        <input id="FechaPagoAlquiler" type="date" class="swal2-input" />
        <br/>
        <br/>
        <label><strong>Selecciona el departamento alquilado:</strong></label>
        <br/>
        <select id="id_alquilerDepto" class="swal2-select">
          ${alquileres.map(alquiler => `<option value="${alquiler.id_alquilerDepto}">${alquiler.NombreDepartamento}</option>`).join('')}
        </select>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      preConfirm: () => {
        const fechaPagoAlquiler = document.getElementById('FechaPagoAlquiler').value;
        const montoPagoAlquiler = document.getElementById('MontoPagoAlquiler').value;
        const id_alquilerDepto = document.getElementById('id_alquilerDepto').value;


        if (!montoPagoAlquiler || !fechaPagoAlquiler || !id_alquilerDepto) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return {
          fechaPagoAlquiler,
          montoPagoAlquiler,
          id_alquilerDepto
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_PAGOS_ALQUILERES_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El pago de alquiler fue registrado correctamente.', 'success');
          onPagoAlquilerRegistrado();
          closeRegistroModal();
        } catch (error) {
          console.error('Error al registrar el pago de alquiler:', error);
          Swal.fire('Error', 'Hubo un problema al registrar el pago de alquiler.', 'error');
        }
      } else {
        closeRegistroModal();
      }
    });
  };

  useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarDepto();
    }
    getClientes(); // Obtener los clientes al abrir el modal
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearPagoDepto;
