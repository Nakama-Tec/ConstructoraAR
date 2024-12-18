import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_STOCK, URL_STOCK_EDITAR, URL_COMPRA_MATERIALES } from '../../../../Constants/endpoints-API';

const EditarStock = ({ onStockEditar }) => {
  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);
  const [materiales, setMateriales] = useState([]);
  const [stock, setStock] = useState([])

  const getStock = async () => {
    try {
      const response = await axios.get(URL_STOCK, { headers: { Authorization: `Bearer ${token}` } });
      setStock(response.data)
    } catch (error) {
      console.error('Error al obtener el Stock:', error);
    }
  };

  const getCompraMaterial = async () => {
    try {
      const response = await axios.get(URL_COMPRA_MATERIALES, { headers: { Authorization: `Bearer ${token}` } });
      setMateriales(response.data);
    } catch (error) {
      console.error('Error al obtener la compra de materiales:', error);
    }
  };

  const handleEditarStock = () => {
    Swal.fire({
      title: 'Editar el Stock',
      html: `
        <label><b>Nombre Material</b></label> 
        <br>
        <select id="select_material" class="swal2-select">
        ${materiales
        .map(
          (material) =>
            `<option value="${material.Nombre}" ${
            material.Nombre === registroSeleccionado.nombreMaterial ? 'selected' : ''
            }>${material.Nombre}</option>`
        )
        
        .join('')}
      </select>
        <br>
        <br>
        <label><b>Ubicacion</b></label> 
        <br>
        <select id="select_ubicacion" class="swal2-select">
        ${stock
        .map(
          (inventario) =>
            `<option value="${inventario.ubicacionStock}" ${
            inventario.id_stock === registroSeleccionado?.id_stock ? 'selected' : ''
            }>${inventario.ubicacionStock}</option>`
        )
        
        .join('')}
      </select>
         <br>
        <br>
        <label><b>Cantidad</b></label> 
        <br>
        <input id="cantidadStock" type="number" min="0" class="swal2-input" value="${registroSeleccionado?.cantidadStock || ''}" />
        <br>
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const nombreMaterial = document.getElementById('select_material').value;
        const ubicacionStock = document.getElementById('select_ubicacion').value;
        const cantidadStock = parseInt(document.getElementById('cantidadStock').value, 10);

        return {
          nombreMaterial,
          ubicacionStock,
          cantidadStock,
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

  useEffect(() => {
    getStock();
  }, []);

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarStock();
    }
    getCompraMaterial();
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarStock;
