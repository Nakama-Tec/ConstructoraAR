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
      .map((material) => `<option value="${material.nombreMaterial}">${material.nombreMaterial || 'Sin Nombre'}</option>`)
      .join('');

  const generateStockOptions2 = () =>
    stock
      .map((material) => `<option value="${material.ubicacionStock}">${material.ubicacionStock || 'Sin Nombre'}</option>`)
      .join('');

  // Registrar compra de material
  const handleRegistrarCompraMaterial = async () => {
    await getStockMaterial();

    Swal.fire({
      title: 'Registrar Compra de Material',
      html: `
        <label><b>Tipo de Material</b></label>
        <div>
          <input type="checkbox" id="toggleMaterialType" data-is-custom="false">
            Añadir nuevo material
          </input>
        </div>
        <div id="materialInputContainer">
          <select id="select_stock" class="swal2-select">
            ${generateStockOptions()}
          </select>
        </div>
        <input id="cantidadMaterial" placeholder="Cantidad de Material" type="number" min="0" class="swal2-input" />
        <input id="precioMaterial" placeholder="Precio del Material" type="number" min="0" class="swal2-input" />
        <br>
        <br>
        <label><b>Fecha Compra</b></label> 
        <br>
        <input id="fechaCompraMateriales" placeholder="Fecha de Compra" type="date" class="swal2-input" />
        <br>
        <br>
        <label><b>Estado</b></label> 
         <br>
        <select id="estadoRetiro" class="swal2-select">
          <option value="Entregado">Entregado</option>
          <option value="Pendiente">Pendiente</option>
          </select>
        <input id="lugardeCompra" placeholder="Lugar de Compra" class="swal2-input" />
        <br><br>
        <label for="select_destino"><b>Ubicación del Material</b></label>
        <div>
          <input type="checkbox" id="toggleMaterialType2" data-is-custom="false" class="swal2-button">
            Añadir nueva ubicación
          </input>
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
        const toggleMaterialType = document.getElementById('toggleMaterialType');
        const toggleMaterialType2 = document.getElementById('toggleMaterialType2');
        const isCustomMaterial = toggleMaterialType?.getAttribute('data-is-custom') === 'true';
        const isCustomUbicacion = toggleMaterialType2?.getAttribute('data-is-custom') === 'true';
      
        const nombreMaterial = isCustomMaterial
          ? document.getElementById('nombreMaterial')?.value || ''
          : document.getElementById('select_stock')?.value || '';
        const cantidadMaterial = document.getElementById('cantidadMaterial')?.value || '';
        const precioMaterial = document.getElementById('precioMaterial')?.value || '';
        const fechaCompraMateriales = document.getElementById('fechaCompraMateriales')?.value || '';
        const estadoRetiro = document.getElementById('estadoRetiro')?.value || '';
        const lugardeCompra = document.getElementById('lugardeCompra')?.value || '';
        const destinoMaterial = isCustomUbicacion
          ? document.getElementById('destinoMaterial')?.value || ''
          : document.getElementById('select_destino')?.value || '';
      
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
          Swal.showValidationMessage('Debe ingresar una fecha de compra válida.');
          return false;
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
    } getStockMaterial(); 
  }, [isRegistroModalOpen]);

  return null;
};

export default CrearCompraMateriales;
