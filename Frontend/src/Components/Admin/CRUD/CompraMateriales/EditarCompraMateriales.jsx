import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_COMPRA_MATERIALES_EDITAR, URL_STOCK } from '../../../../Constants/endpoints-API';

const EditarCompraMateriales = ({ onCompraMaterialEditado }) => {
  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);
  const [stock, setStock] = useState([]);

  const getStockMaterial = async () => {
    try {
      const response = await axios.get(URL_STOCK, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock(response.data);
    } catch (error) {
      console.error('Error al obtener materiales:', error);
    }
  };

  const generateStockOptions = () => {
    if (!registroSeleccionado) return '';

    const opciones = stock.map((material) =>
      `<option value="${material.nombreMaterial}" ${
        material.nombreMaterial === registroSeleccionado.Nombre ? 'selected' : ''
      }>${material.nombreMaterial}</option>`
    );

    return opciones.join('');
  };

  const handleEditarCompra = async () => {
    if (stock.length === 0) {
      await getStockMaterial(); // Asegura que los datos estén cargados
    }

    Swal.fire({
      title: 'Editar Compra',
      html: `
        <label><b>Tipo de Material</b></label>
        <br>
        <br>
          <input type="checkbox" id="toggleMaterialType" data-is-custom="false">
            Añadir nuevo material
          </input>
        <div id="materialInputContainer">
          <select id="select_stock" class="swal2-select">
            ${generateStockOptions()}
          </select>
        </div>
        <br>
        <label><b>Cantidad</b></label>
        <br>
        <input id="cantidadMaterial" type="number" min="0" class="swal2-input" value="${registroSeleccionado?.Cantidad || ''}" />
        <br>
        <br>
        <label><b>Precio</b></label>
        <br>
        <input id="precioMaterial" type="number" min="0" class="swal2-input" value="${registroSeleccionado?.Precio || ''}" />
        <br>
        <br>
        <label><b>Fecha Compra</b></label>
        <br>
        <input id="fechaCompraMateriales" type="date" class="swal2-input" value="${registroSeleccionado?.Fecha_Compra || ''}" />
        <br>
        <br>
        <label><b>Estado</b></label>
        <br>
        <select id="estadoRetiro" class="swal2-select">
          <option value="Entregado" ${registroSeleccionado?.Estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
          <option value="Pendiente" ${registroSeleccionado?.Estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
        </select>
        <br>
        <br>
        <br>
        <label><b>Ubicación del Material</b></label>
        <br>
        <div id="materialInputContainer2">
          <select id="select_destino" class="swal2-select">
            ${stock.map((material) => `<option value="${material.ubicacionStock}">${material.ubicacionStock}</option>`).join('')}
          </select>
        </div>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      didRender: () => {
        const toggleMaterialType = document.getElementById('toggleMaterialType');
        toggleMaterialType.addEventListener('click', () => {
          const isCustom = toggleMaterialType.getAttribute('data-is-custom') === 'true';
          toggleMaterialType.setAttribute('data-is-custom', !isCustom);
          toggleMaterialType.textContent = isCustom ? 'Usar material existente' : 'Agregar nuevo material';
          const container = document.getElementById('materialInputContainer');
          container.innerHTML = isCustom
            ? `<select id="select_stock" class="swal2-select">
                ${generateStockOptions()}
              </select>`
            : `<input id="nombreMaterial" placeholder="Nuevo nombre del Material" class="swal2-input" />`;
        });
      },
      preConfirm: () => {
        const isCustomMaterial = document.getElementById('toggleMaterialType').getAttribute('data-is-custom') === 'true';
        const nombreMaterial = isCustomMaterial
          ? document.getElementById('nombreMaterial').value
          : document.getElementById('select_stock').value;
        const cantidadMaterial = document.getElementById('cantidadMaterial').value;
        const precioMaterial = document.getElementById('precioMaterial').value;
        const fechaCompraMateriales = document.getElementById('fechaCompraMateriales').value;
        const estadoRetiro = document.getElementById('estadoRetiro').value;
        const destinoMaterial = document.getElementById('select_destino').value;

        if (!nombreMaterial || !cantidadMaterial || !precioMaterial || !fechaCompraMateriales) {
          Swal.showValidationMessage('Todos los campos son obligatorios.');
        }

        return { nombreMaterial, cantidadMaterial, precioMaterial, fechaCompraMateriales, estadoRetiro, destinoMaterial };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${URL_COMPRA_MATERIALES_EDITAR}${registroSeleccionado.ID}`, result.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire('¡Éxito!', 'La compra fue actualizada correctamente.', 'success');
          onCompraMaterialEditado();
          clearRegistroSeleccionado();
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al actualizar la compra.', 'error');
        }
      } else {
        clearRegistroSeleccionado();
      }
    });
  };

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarCompra();
    }
  }, [registroSeleccionado]);

  useEffect(() => {
    getStockMaterial();
  }, []);

  return null;
};

export default EditarCompraMateriales;