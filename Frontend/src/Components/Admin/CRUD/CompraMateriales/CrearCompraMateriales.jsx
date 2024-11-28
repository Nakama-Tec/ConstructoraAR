import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_COMPRA_MATERIALES_CREAR, URL_STOCK } from '../../../../Constants/endpoints-API';

const CrearCompraMateriales = ({ onCompraMaterialRegistrado }) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);
  const [stock, setStock] = useState([]);

  const getStockMaterial = async () => {
    try {
      const response = await axios.get(URL_STOCK, { headers: { Authorization: `Bearer ${token}` } });
      setStock(response.data); // Actualizamos el estado con los datos obtenidos
    } catch (error) {
      console.error('Error al obtener materiales:', error);
    }
  };

  const handleRegistrarCompraMaterial = async () => {
    // Asegurarse de que los datos del stock están cargados
     await getStockMaterial();

    Swal.fire({
      title: 'Registrar Compra de Material',
      html: `
        <label for="select_stock"><b>Nombre del material</b></label>
        <br>
        <select id="select_stock" class="swal2-select">
          ${stock
            .map(
              (stockMaterial) =>
                `<option value="${stockMaterial.id_stock}">
                  ${stockMaterial.nombreMaterial || 'Sin Nombre'}
                </option>`
            )
            .join('')}
        </select>
       
        <input id="cantidadMaterial" placeholder="Cantidad de Material" class="swal2-input" />
        <input id="precioMaterial" placeholder="Precio del Material" class="swal2-input" />
        <input id="fechaCompraMateriales" placeholder="Fecha de Compra" class="swal2-input" />
        <input id="estadoRetiro" placeholder="Estado de Retiro" class="swal2-input" />
        <input id="lugardeCompra" placeholder="Lugar de Compra" class="swal2-input" />
        <input id="destinoMaterial" placeholder="Destino del Material" class="swal2-input" />
         <input id="ubicacionStock" placeholder="Ubicación del Stock" class="swal2-input" />
         <label for="select_stock"><b>Nombre del material</b></label>
        <br>
        <select id="select_stock" class="swal2-select">
          ${stock
            .map(
              (stockMaterial) =>
                `<option value="${stockMaterial.id_stock}">
                  ${stockMaterial.ubicacionStock || 'Sin Nombre'}
                </option>`
            )
            .join('')}
        </select>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      preConfirm: () => {
        const selectStock = document.getElementById('select_stock').value;
        const ubicacionStock = document.getElementById('ubicacionStock').value;
        const cantidadMaterial = document.getElementById('cantidadMaterial').value;
        const precioMaterial = document.getElementById('precioMaterial').value;
        const fechaCompraMateriales = document.getElementById('fechaCompraMateriales').value;
        const estadoRetiro = document.getElementById('estadoRetiro').value;
        const lugardeCompra = document.getElementById('lugardeCompra').value;
        const destinoMaterial = document.getElementById('destinoMaterial').value;

        if (!selectStock || !ubicacionStock || !cantidadMaterial || !precioMaterial || !fechaCompraMateriales) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return {
          selectStock,
          ubicacionStock,
          cantidadMaterial,
          precioMaterial,
          fechaCompraMateriales,
          estadoRetiro,
          lugardeCompra,
          destinoMaterial,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_COMPRA_MATERIALES_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` },
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
      getStockMaterial();
    }
  }, [isRegistroModalOpen]);

  return null;
};

export default CrearCompraMateriales;
