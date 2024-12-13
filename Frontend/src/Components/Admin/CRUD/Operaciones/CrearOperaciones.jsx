import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_OPERACIONES_CREAR } from '../../../../Constants/endpoints-API';

const CrearOperaciones = ({ onOperacionRegistrado }) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const handleRegistrarOperaciones = () => {
    Swal.fire({
      title: 'Registrar Operaciones',
      html: `
        <input id="nombreOperacion" placeholder="Nombre Operaciones" class="swal2-input" />
        <input id="montoOperacion" type="number" min="0" placeholder="Monto Operacion" class="swal2-input" />
        <input id="detalleOperacion" placeholder="Detalle de la Operacion" class="swal2-input" />
        <br>
        <br>
        <label><b>Fecha Operacion</b></label>
        <br>
        <input id="fechaOperacion" type="date" class="swal2-input" />
        <br>
        <br>
        <label><strong>Selecciona el tipo de operación:</strong></label>
        <br>
        <select id="tipoOperacion" class="swal2-select">
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </select>
        <br>
        <div id="detalleTipoOperacion"></div>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      didOpen: () => {
        const tipoOperacionSelect = document.getElementById('tipoOperacion');
        const detalleTipoOperacionDiv = document.getElementById('detalleTipoOperacion');

        const renderDetalleOperacion = () => {
          const tipo = tipoOperacionSelect.value;
          let detalleHtml = '';

          if (tipo === 'Ingreso') {
            detalleHtml = `
              <br>
              <label><strong>Tipo de Ingreso:</strong></label>
              <br>
              <select id="tipoIngreso" class="swal2-select">
                <option value="Cobro Deuda">Cobro Deuda</option>
                <option value="Otros ingresos">Otros ingresos</option>
              </select>
            `;
          } else if (tipo === 'Egreso') {
            detalleHtml = `
              <br>
              <label><strong>Tipo de Egreso:</strong></label>
              <br>
              <select id="tipoEgreso" class="swal2-select">
                <option value="Luz">Luz</option>
                <option value="Agua">Agua</option>
                <option value="Telefono">Telefono</option>
                <option value="Oficina">Oficina</option>
                <option value="Pagos Tercerizados Obra Privada">Pagos Tercerizados Obra Privada</option>
                <option value="Pagos Tercerizados Obra Pública">Pagos Tercerizados Obra Pública</option>
                <option value="Administración y Venta">Administración y Venta</option>
                <option value="Impuesto">Impuesto</option>
                <option value="Amortizaciones">Amortizaciones</option>
                <option value="Intereses">Intereses</option>  
                <option value="Otros egresos">Otros egresos</option>
              </select>
            `;
          } 
          detalleTipoOperacionDiv.innerHTML = detalleHtml;
        };

        tipoOperacionSelect.addEventListener('change', renderDetalleOperacion);
        renderDetalleOperacion(); // Render inicial
      },
      preConfirm: () => {
        const nombreOperacion = document.getElementById('nombreOperacion').value;
        const tipoOperacion = document.getElementById('tipoOperacion').value;
        const montoOperacion = document.getElementById('montoOperacion').value;
        const detalleOperacion = document.getElementById('detalleOperacion').value;
        const fechaOperacion = document.getElementById('fechaOperacion').value;
        const detalleTipoOperacion = tipoOperacion === 'Ingreso' 
          ? document.getElementById('tipoIngreso').value 
          : document.getElementById('tipoEgreso').value;

        // Validaciones
        const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const detallesRegex = /^[^@]+$/;

        if (!nombreOperacion || !nombreRegex.test(nombreOperacion)) {
          Swal.showValidationMessage("El nombre no debe contener números.");
          return false;
        }

        if (!detalleOperacion || !detallesRegex.test(detalleOperacion)) {
          Swal.showValidationMessage("El detalle de la operación no debe contener caracteres no válidos.");
          return false;
        }

        return {
          nombreOperacion,
          tipoOperacion,
          detalleTipoOperacion,
          montoOperacion,
          detalleOperacion,
          fechaOperacion
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_OPERACIONES_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'La Operación fue registrada correctamente.', 'success');
          onOperacionRegistrado();
          closeRegistroModal();
        } catch (error) {
          console.error('Error al registrar la Operación:', error);
          Swal.fire('Error', 'Hubo un problema al registrar la operación.', 'error');
        }
      } else {
        closeRegistroModal();
      }
    });
  };

  useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarOperaciones();
    }
  }, [isRegistroModalOpen]);

  return null;
};

export default CrearOperaciones;