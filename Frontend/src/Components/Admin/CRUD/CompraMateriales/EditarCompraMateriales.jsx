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

  // Obtener datos de stock
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

  // Generar opciones para el material
  const generateStockOptions = () =>
    stock
      .map(
        (material) =>
          `<option value="${material.nombreMaterial}" ${
            material.nombreMaterial === registroSeleccionado?.Nombre ? 'selected' : ''
          }>${material.nombreMaterial}</option>`
      )
      .join('');

  // Generar opciones para la ubicación
  const generateStockOptions2 = () =>
    stock
      .map(
        (material) =>
          `<option value="${material.ubicacionStock}">${material.ubicacionStock || 'Sin Nombre'}</option>`
      )
      .join('');

  // Manejar edición de la compra
  const handleEditarCompra = async () => {
    if (stock.length === 0) {
      await getStockMaterial();
    }

    Swal.fire({
      title: 'Editar Compra',
      html: `
        <label><b>Tipo de Material</b></label>
        <br><br>
        <input type="checkbox" id="toggleMaterialType" data-is-custom="false" class="swal2-confirm">
          Añadir el nuevo material
        </input>
        <div id="materialInputContainer">
          <select id="select_stock" class="swal2-select">${generateStockOptions()}</select>
        </div>
        <br>
        <label><b>Cantidad</b></label>
        <br>
        <input id="cantidadMaterial" type="number" min="0" class="swal2-input" value="${
          registroSeleccionado?.Cantidad || ''
        }" />
        <br>
        <br>
        <label><b>Precio</b></label>
        <br>
        <input id="precioMaterial" type="number" min="0" class="swal2-input" value="${
          registroSeleccionado?.Precio || ''
        }" />
        <br>
        <br>
        <label><b>Fecha Compra</b></label>
        <br>
        <input id="fechaCompraMateriales" type="date" class="swal2-input" value="${
          registroSeleccionado?.Fecha_Compra || ''
        }" />
        <br>
        <br>
        <label><b>Estado</b></label>
        <br>
        <select id="estadoRetiro" class="swal2-select">
          <option value="Entregado" ${
            registroSeleccionado?.Estado === 'Entregado' ? 'selected' : ''
          }>Entregado</option>
          <option value="Pendiente" ${
            registroSeleccionado?.Estado === 'Pendiente' ? 'selected' : ''
          }>Pendiente</option>
        </select>
        <br/>
        <br/>
        <label><b>Ubicación del Material</b></label>
        <br/>
        <br/>
        <input type="checkbox" id="toggleDestinoType" data-is-custom="false" class="swal2-confirm">
          Añadir la nueva ubicación
        </input>
        <div id="materialInputContainer2">
          <select id="select_destino" class="swal2-select">${generateStockOptions2()}</select>
        </div>
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      didRender: () => {
        const toggleCustomInput = (toggleButtonId, inputContainerId, optionsGenerator) => {
          const toggleButton = document.getElementById(toggleButtonId);
          const inputContainer = document.getElementById(inputContainerId);

          toggleButton.addEventListener('click', () => {
            const isCustom = toggleButton.getAttribute('data-is-custom') === 'true';
            toggleButton.setAttribute('data-is-custom', !isCustom);
            toggleButton.textContent = isCustom
              ? 'Usar existente'
              : 'Agregar nuevo';
            inputContainer.innerHTML = isCustom
              ? `<select class="swal2-select">${optionsGenerator()}</select>`
              : `<input placeholder="Añade la información" class="swal2-input" />`;
          });
        };

        toggleCustomInput('toggleMaterialType', 'materialInputContainer', generateStockOptions);
        toggleCustomInput('toggleDestinoType', 'materialInputContainer2', generateStockOptions2);
      },
      preConfirm: () => {
        const nombreMaterial = document.querySelector('#materialInputContainer select')?.value || '';
        const cantidadMaterial = document.getElementById('cantidadMaterial').value;
        const precioMaterial = document.getElementById('precioMaterial').value;
        const fechaCompraMateriales = document.getElementById('fechaCompraMateriales').value;
        const estadoRetiro = document.getElementById('estadoRetiro').value;
        const destinoMaterial = document.querySelector('#materialInputContainer2 select')?.value || '';

        // Validaciones
        const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        if (!nombreMaterial || !nombreRegex.test(nombreMaterial)) {
          Swal.showValidationMessage('El nombre del material no debe contener números.');
          return false;
        }
        if (!cantidadMaterial || isNaN(cantidadMaterial) || Number(cantidadMaterial) <= 0) {
          Swal.showValidationMessage('La cantidad debe ser un número mayor a 0.');
          return false;
        }
        if (!precioMaterial || isNaN(precioMaterial) || Number(precioMaterial) <= 0) {
          Swal.showValidationMessage('El precio debe ser un número mayor a 0.');
          return false;
        }
        if (!fechaCompraMateriales) {
          Swal.showValidationMessage('Debe ingresar una fecha válida.');
          return false;
        }

        return { nombreMaterial, cantidadMaterial, precioMaterial, fechaCompraMateriales, estadoRetiro, destinoMaterial };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${URL_COMPRA_MATERIALES_EDITAR}${registroSeleccionado.ID}`,
            result.value,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
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
