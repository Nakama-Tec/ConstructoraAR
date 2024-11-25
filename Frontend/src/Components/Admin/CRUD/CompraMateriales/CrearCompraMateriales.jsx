import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_COMPRA_MATERIALES_CREAR } from '../../../../Constants/endpoints-API';

const CrearCompraMateriales = ({onCompraMaterialRegistrado}) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const handleRegistrarCompraMaterial = () => {
    Swal.fire({
      title: 'Registrar Operaciones',
      html: `
        <input id="nombreMaterial" placeholder="Nombre del Material class="swal2-input" />
        
        <input id="ubicacionStock" placeholder="Ubicación del Stock" class="swal2-input" />

        <input id="cantidadMaterial" placeholder="Cantidad de Material" class="swal2-input" />

        <input id="precioMaterial" placeholder="Precio del Material" class="swal2-input" />

        <input id="fechaCompraMateriales" placeholder="Fecha de Compra" class="swal2-input" />

        <input id="estadoRetiro" placeholder="Estado de Retiro" class="swal2-input" />

        <input id="lugardeCompra" placeholder="Lugar de Compra" class="swal2-input" />

        <input id="destinoMaterial" placeholder="Destino del Material" class="swal2-input" />
-

      `,
      confirmButtonText: 'Registrar',//nombre del boton de confirmacion
      showCancelButton: true,//para que aparezca el boton de cancelar
      preConfirm: () => {
          const nombreOperacion = document.getElementById('nombreOperacion').value;
          const tipoOperacion = document.getElementById('tipoOperacion').value;
          const montoOperacion = document.getElementById('montoOperacion').value;
          const detalleOperacion = document.getElementById('detalleOperacion').value;
          const fechaOperacion = document.getElementById('fechaOperacion').value;
          if (!nombreOperacion || !tipoOperacion || !montoOperacion || !detalleOperacion || !fechaOperacion) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          }

        return {
          nombreOperacion,
          tipoOperacion,
          montoOperacion,
          detalleOperacion,
          fechaOperacion
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {//si se confirma la accion de registrar
        try {
          await axios.post(URL_COMPRA_MATERIALES_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'La compra del material fue registrada correctamente.', 'success');
          onCompraMaterialRegistrado(); 
          closeRegistroModal(); 
        } catch (error) {
          console.error('Error al registrar la compra del material:', error);
          Swal.fire('Error', 'Hubo un problema al registrar la compra del material.', 'error');
        }
      } else {
        closeRegistroModal(); 
      }
    });
  };

useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarCompraMaterial();
    }
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearCompraMateriales
