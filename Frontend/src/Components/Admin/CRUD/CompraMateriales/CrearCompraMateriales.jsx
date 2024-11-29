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
  const [isCustomMaterial, setIsCustomMaterial] = useState(true); // Controla si se muestra "nuevo material"

  const getStockMaterial = async () => {
    try {
      const response = await axios.get(URL_STOCK, { headers: { Authorization: `Bearer ${token}` } });
      setStock(response.data); // Actualizamos el estado con los datos obtenidos
    } catch (error) {
      console.error('Error al obtener materiales:', error);
    }
  };

  const handleRegistrarCompraMaterial = async () => {
    await getStockMaterial();
  
    Swal.fire({
      title: 'Registrar Compra de Material',
      html: `
        <label for="materialType"><b>Tipo de Material</b></label>
        <br>
        <div>
          <input type="radio" id="materialExistente" name="materialType" value="existente" ${!isCustomMaterial ? 'checked' : ''} />
          <label for="materialExistente">Material Existente</label>
          <br />
          <input type="radio" id="materialNuevo" name="materialType" value="nuevo" ${isCustomMaterial ? 'checked' : ''} />
          <label for="materialNuevo">Nuevo Material</label>
        </div>
        <div id="dynamicContent">
          ${
            !isCustomMaterial
              ? `
              <select id="select_stock" class="swal2-select">
                ${stock
                  .map(
                    (stockMaterial) => `
                      <option value="${stockMaterial.nombreMaterial}">
                        ${stockMaterial.nombreMaterial || 'Sin Nombre'}
                      </option>`
                  )
                  .join('')}
              </select>
            `
              : `
              <input id="nombreMaterial" placeholder="Nuevo nombre del Material" class="swal2-input" />
            `
          }
        </div>
        <input id="cantidadMaterial" placeholder="Cantidad de Material" class="swal2-input" />
        <input id="precioMaterial" placeholder="Precio del Material" class="swal2-input" />
        <input id="fechaCompraMateriales" placeholder="Fecha de Compra" class="swal2-input" />
        <input id="estadoRetiro" placeholder="Estado de Retiro" class="swal2-input" />
        <input id="lugardeCompra" placeholder="Lugar de Compra" class="swal2-input" />
        <input id="destinoMaterial" placeholder="Destino del Material" class="swal2-input" />
        <input id="ubicacionStock" placeholder="Ubicación del Stock" class="swal2-input" />
        <label for="select_destino"><b>Ubicación del Material</b></label>
        <br>
        <select id="select_destino" class="swal2-select">
          ${stock
            .map(
              (stockMaterial) => `
                <option value="${stockMaterial.ubicacionStock}">
                  ${stockMaterial.ubicacionStock || 'Sin Nombre'}
                </option>`
            )
            .join('')}
        </select>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      didRender: () => {
        // Agregar eventos después de renderizar el modal
        document.getElementById('materialExistente').addEventListener('click', () => {
          setIsCustomMaterial(false);
        });

        document.getElementById('materialNuevo').addEventListener('click', () => {
          setIsCustomMaterial(true);
        });
      },
      preConfirm: () => {
        const nombreMaterial = isCustomMaterial
          ? document.getElementById('nombreMaterial').value
          : document.getElementById('select_stock').value;
        const ubicacionStock = document.getElementById('ubicacionStock').value;
        const cantidadMaterial = document.getElementById('cantidadMaterial').value;
        const precioMaterial = document.getElementById('precioMaterial').value;
        const fechaCompraMateriales = document.getElementById('fechaCompraMateriales').value;
        const estadoRetiro = document.getElementById('estadoRetiro').value;
        const lugardeCompra = document.getElementById('lugardeCompra').value;
        const destinoMaterial = document.getElementById('select_destino').value;

        if (!nombreMaterial || !ubicacionStock || !cantidadMaterial || !precioMaterial || !fechaCompraMateriales) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return {
          nombreMaterial,
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
    }
    getStockMaterial();
  }, [isRegistroModalOpen]);

  return null;
};

export default CrearCompraMateriales;
