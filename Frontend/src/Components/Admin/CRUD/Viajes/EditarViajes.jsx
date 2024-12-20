import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_VIAJES_EDITAR, URL_VEHICULOS, URL_OBRAS, URL_STOCK, URL_DETALLES_VIAJES_CREAR, URL_DETALLES_VIAJES_EDITAR } from '../../../../Constants/endpoints-API';


const EditarViaje = ({ onViajeEditado }) => {

  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);
  const [vehiculos, setVehiculos] = useState([]);
  const [obras, setObras] = useState([]);
  const [stocks, setStocks] = useState([]);

  const getVehiculos = async () => {
    try {
      const response = await axios.get(URL_VEHICULOS, { headers: { Authorization: `Bearer ${token}` } });
      setVehiculos(response.data);
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  };

  const getObra = async () => {
    try {
      const response = await axios.get(URL_OBRAS, { headers: { Authorization: `Bearer ${token}` } });
      setObras(response.data);
    } catch (error) {
      console.error('Error al obtener la obra:', error);
    }
  };

  const getStock = async () =>{
    try {
      const response = await axios.get(URL_STOCK, { headers: { Authorization: `Bearer ${token}` } });
      setStocks(response.data);
    } catch (error) {
      console.error('Error al obtener el stock:', error);
  }};



  const handleEditarViaje = () => {
    Swal.fire({
      title: 'Editar Viaje',
      html: `
      <label><b>Fecha Viaje</b></label> 
      <br>
      <input id="fechaViaje" class="swal2-input" type="date" value="${registroSeleccionado.fechaViaje}" />
      <br>
      <br>
      <label><b>Patente Vehiculo</b></label> 
      <br>
      <select id="select_vehiculo" class="swal2-select">
      ${vehiculos
      .map(
      (vehiculo) =>
      `<option value="${vehiculo.id_vehiculo}" ${vehiculo.id_vehiculo === registroSeleccionado.id_vehiculo ? 'selected' : ''
      }>${vehiculo.patenteVehiculo}</option>`
      )
      .join('')}
      </select>
      <br>
      <br>
      <label><b>Selecciona la obra</b></label> 
      <br>
      <select id="select_obra" class="swal2-select">
      ${obras
      .map(
      (obra) =>
      `<option value="${obra.id_obra}" ${obra.id_obra === registroSeleccionado.id_obra ? 'selected' : ''
      }>${obra.nombreObra}</option>`
      )
      .join('')}
      </select>
      <br>
      <br>
      <label><b>Selecciona el Material</b></label> 
      <br>
      <select id="select_stock" class="swal2-select">
      ${stocks
      .map(
      (stock) =>
      `<option value="${stock.id_stock}" ${stock.id_stock === registroSeleccionado.id_stock ? 'selected' : ''
      }>${stock.nombreMaterial}</option>`
      )
      .join('')}
      </select>
      <br>
      <br>
      <label><b>Cantidad</b></label> 
      <br>
      <input id="cantidadStock" class="swal2-input" placeholder="Cantidad" type="number" value="${registroSeleccionado.cantidadStock}" />
      <br>

      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
      const fechaViaje = document.getElementById('fechaViaje')?.value;
      const id_vehiculo = document.getElementById('select_vehiculo')?.value;
      const id_obra = document.getElementById('select_obra')?.value;
      const id_stock = document.getElementById('select_stock')?.value;
      const cantidadStock = document.getElementById('cantidadStock')?.value;
    
      if (!fechaViaje || !id_vehiculo || !id_obra || !id_stock) {
      Swal.showValidationMessage('Todos los campos son obligatorios');
      return null;
      }
    
      return {
      fechaViaje,
      id_vehiculo,
      id_obra,
      id_stock,
      cantidadStock
      };
      }
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
      try {
      await axios.put(`${URL_DETALLES_VIAJES_EDITAR}${registroSeleccionado.id_DetallesViaje}`, result.value, {
      headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire('¡Éxito!', 'El viaje fue actualizado correctamente.', 'success');
      onViajeEditado();
      clearRegistroSeleccionado();
      } catch (error) {
      console.error('Error al actualizar viaje:', error);
      Swal.fire('Error', 'Hubo un problema al actualizar el viaje.', 'error');
      }
      } else {
      clearRegistroSeleccionado();
      }
    });
  };
  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarViaje();
    }
    getVehiculos();
    getObra();
    getStock();
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarViaje
