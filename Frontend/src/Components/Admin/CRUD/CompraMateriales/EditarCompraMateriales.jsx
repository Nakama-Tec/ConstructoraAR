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

  // Obtener stock de materiales desde el backend
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

  // Generar opciones para el select de materiales
  const generateStockOptions = () =>
    stock
      .map((material) => `<option value="${material.Nombre}">${registroSeleccionado.Nombre || 'Sin Nombre'}</option>`)
      .join('');

  const generateStockOptions2 = () =>
    stock
      .map((material) => `<option value="${material.ubicacionStock}">${registroSeleccionado.Destino || 'Sin Nombre'}</option>`)
      .join('');

  const handleEditarCompra = () => {
    Swal.fire({
      title: 'Editar Compra',
      html: `
        <label><b>Tipo de Material</b></label>
        <div>
          <button type="button" id="toggleMaterialType" data-is-custom="false" class="swal2-button">
            Usar material existente
          </button>
        </div>
        <div id="materialInputContainer">
          <select id="select_stock" class="swal2-select">
            ${generateStockOptions()}
          </select>
        </div>
        <input id="cantidadMaterial" placeholder="Cantidad de Material" class="swal2-input" value="${registroSeleccionado.Cantidad}" />
        <input id="precioMaterial" placeholder="Precio del Material" class="swal2-input" value="${registroSeleccionado.Precio}" />
        <input id="fechaCompraMateriales" placeholder="Fecha de Compra" class="swal2-input" value="${registroSeleccionado.Fecha_Compra}" />
        <input id="estadoRetiro" placeholder="Estado de Retiro" class="swal2-input" value="${registroSeleccionado.Estado}" />
        <input id="lugardeCompra" placeholder="Lugar de Compra" class="swal2-input" value="${registroSeleccionado.Proveedor}" />
        <br><br>
        <label for="select_destino"><b>Ubicación del Material</b></label>
        <div>
          <button type="button" id="toggleMaterialType2" data-is-custom="false" class="swal2-button">
            Usar Deposito/Obra existente
          </button>
        </div>
        <div id="materialInputContainer2">
          <select id="select_destino" class="swal2-select">
            ${generateStockOptions2()}
          </select>
        </div>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      didRender: () => {
        const toggleButton = document.getElementById('toggleMaterialType');
        const toggleButton2 = document.getElementById('toggleMaterialType2');
        const materialInputContainer = document.getElementById('materialInputContainer');
        const materialInputContainer2 = document.getElementById('materialInputContainer2');

        // Evento para cambiar entre opciones de material existente o nuevo
        toggleButton.addEventListener('click', () => {
          const isCustom = toggleButton.getAttribute('data-is-custom') === 'true';
          toggleButton.setAttribute('data-is-custom', !isCustom);
          toggleButton.textContent = isCustom ? 'Usar material existente' : 'Agregar nuevo material';
          materialInputContainer.innerHTML = isCustom
            ? `<select id="select_stock" class="swal2-select">${generateStockOptions()}</select>`
            : `<input id="nombreMaterial" placeholder="Nuevo nombre del Material" class="swal2-input" />`;
        });

        // Evento para cambiar entre opciones de destino existente o nuevo
        toggleButton2.addEventListener('click', () => {
          const isCustom = toggleButton2.getAttribute('data-is-custom') === 'true';
          toggleButton2.setAttribute('data-is-custom', !isCustom);
          toggleButton2.textContent = isCustom ? 'Usar Deposito/Obra existente' : 'Agregar nuevo destino';
          materialInputContainer2.innerHTML = isCustom
            ? `<select id="select_destino" class="swal2-select">${generateStockOptions2()}</select>`
            : `<input id="destinoMaterial" placeholder="Nuevo destino del Material" class="swal2-input" />`;
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
        const lugardeCompra = document.getElementById('lugardeCompra').value;
        const destinoMaterial = document.getElementById('select_destino').value;

        if (!nombreMaterial || !cantidadMaterial || !precioMaterial || !fechaCompraMateriales) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return {
          nombreMaterial,
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
          alert(registroSeleccionado.ID)
          await axios.put(`${URL_COMPRA_MATERIALES_EDITAR}${registroSeleccionado.ID}`, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'La Compra fue actualizada correctamente.', 'success');
          onCompraMaterialEditado();
          clearRegistroSeleccionado();
        } catch (error) {
          console.error('Error al actualizar la compra:', error);
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
    getStockMaterial();
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarCompraMateriales;
