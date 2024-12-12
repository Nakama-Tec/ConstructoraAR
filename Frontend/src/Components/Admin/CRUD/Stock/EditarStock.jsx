import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_STOCK, URL_STOCK_EDITAR } from '../../../../Constants/endpoints-API';

const EditarStock = ({ onStockEditar }) => {
  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  // Obtener lista de stock (aunque no es usado en el `select_stock2`)
  const getStock = async () => {
    try {
      const response = await axios.get(URL_STOCK, { headers: { Authorization: `Bearer ${token}` } });
      console.log('Stock cargado:', response.data);
    } catch (error) {
      console.error('Error al obtener el Stock:', error);
    }
  };

  // Mostrar el modal para editar stock
  const handleEditarStock = () => {
    Swal.fire({
      title: 'Editar el Stock',
      html: `
        <label><b>Nombre Material</b></label> 
        <br>
        <input id="nombreMaterial" class="swal2-input" value="${registroSeleccionado?.nombreMaterial || ''}" />
        <br>
        <br>
        <label><b>Ubicacion</b></label> 
        <br>
        <input id="ubicacionStock" class="swal2-input" value="${registroSeleccionado?.ubicacionStock || ''}" />
         <br>
        <br>
        <label><b>Cantidad</b></label> 
        <br>
        <input id="cantidadStock" type="number" min="0" class="swal2-input" value="${registroSeleccionado?.cantidadStock || ''}" />
        <br>
        <br>
        <label><b>Disponibilidad</b></label> 
        <br>
        <select id="select_stock" class="swal2-select">
          <option value="SI" ${registroSeleccionado?.activoStock === 'SI' ? 'selected' : ''}>SI</option>
          <option value="NO" ${registroSeleccionado?.activoStock === 'NO' ? 'selected' : ''}>NO</option>
        </select>
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const nombreMaterial = document.getElementById('nombreMaterial').value;
        const ubicacionStock = document.getElementById('ubicacionStock').value;
        const cantidadStock = parseInt(document.getElementById('cantidadStock').value, 10);
        const activoStock = document.getElementById('select_stock').value === 'SI' ? 1 : 0;

        const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const ubicacionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;



        if (!nombreRegex || nombreRegex.test(nombreMaterial) ) {
          Swal.showValidationMessage('El nombre del material no es válido.');
        }
        if (!ubicacionRegex || ubicacionRegex.test(ubicacionStock)) {
          Swal.showValidationMessage('La ubicación del stock no es válida.');
        }

        return {
          nombreMaterial,
          ubicacionStock,
          cantidadStock,
          activoStock,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
      
        try {
          await axios.put(`${URL_STOCK_EDITAR}${registroSeleccionado.id_stock}`, result.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire('¡Éxito!', 'El stock fue actualizado correctamente.', 'success');
          onStockEditar();
          clearRegistroSeleccionado();
        } catch (error) {
          console.error('Error al actualizar el stock:', error);
          Swal.fire('Error', 'Hubo un problema al actualizar el stock.', 'error');
        }
      } else {
        clearRegistroSeleccionado();
      }
    });
  };

  // Efectos para inicializar datos y manejar el modal
  useEffect(() => {
    getStock();
  }, []);

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarStock();
    }
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarStock;
