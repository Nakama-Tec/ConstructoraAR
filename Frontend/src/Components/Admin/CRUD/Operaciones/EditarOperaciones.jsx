import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_OPERACIONES_EDITAR } from '../../../../Constants/endpoints-API';

const EditarOperaciones = ({ onOperacionEditado }) => {
  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const handleEditarOperaciones = () => {
    Swal.fire({
      title: 'Editar Operación',
      html: `
        <input id="nombreOperacion" class="swal2-input" value="${registroSeleccionado.nombreOperacion || ''}" placeholder="Nombre Operación" />
        <input id="montoOperacion" class="swal2-input" type="number" min="0" value="${registroSeleccionado.montoOperacion || ''}" placeholder="Monto Operación" />
        <input id="detalleOperacion" class="swal2-input" value="${registroSeleccionado.detalleOperacion || ''}" placeholder="Detalle Operación" />
        <br><br>
        <label><b>Fecha Operación</b></label><br>
        <input id="fechaOperacion" class="swal2-input" type="date" value="${registroSeleccionado.fechaOperacion || ''}" /><br><br>
        <label><strong>Selecciona el tipo de operación:</strong></label><br>
        <select id="tipoOperacion" class="swal2-select">
          <option value="Ingreso" ${registroSeleccionado.tipoOperacion === 'Ingreso' ? 'selected' : ''}>Ingreso</option>
          <option value="Egreso" ${registroSeleccionado.tipoOperacion === 'Egreso' ? 'selected' : ''}>Egreso</option>
        </select>
        <br>
        <div id="detalleTipoOperacion"></div>
      `,
      confirmButtonText: 'Guardar Cambios',
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
              <label><strong>Tipo de Ingreso:</strong></label><br>
              <select id="tipoIngreso" class="swal2-select">
                <option value="Cobro Deuda" ${registroSeleccionado.detalleTipoOperacion === 'Cobro Deuda' ? 'selected' : ''}>Cobro Deuda</option>
                <option value="Otros ingresos" ${registroSeleccionado.detalleTipoOperacion === 'Otros ingresos' ? 'selected' : ''}>Otros ingresos</option>
              </select>
            `;
          } else if (tipo === 'Egreso') {
            detalleHtml = `
              <br>
              <label><strong>Tipo de Egreso:</strong></label><br>
              <select id="tipoEgreso" class="swal2-select">
                <option value="Luz" ${registroSeleccionado.detalleTipoOperacion === 'Luz' ? 'selected' : ''}>Luz</option>
                <option value="Agua" ${registroSeleccionado.detalleTipoOperacion === 'Agua' ? 'selected' : ''}>Agua</option>
                <option value="Telefono" ${registroSeleccionado.detalleTipoOperacion === 'Telefono' ? 'selected' : ''}>Telefono</option>
                <option value="Oficina" ${registroSeleccionado.detalleTipoOperacion === 'Oficina' ? 'selected' : ''}>Oficina</option>
                <option value="Pagos Tercerizados Obra Privada" ${registroSeleccionado.detalleTipoOperacion === 'Pagos Tercerizados Obra Privada' ? 'selected' : ''}>Pagos Tercerizados Obra Privada</option>
                <option value="Pagos Tercerizados Obra Pública" ${registroSeleccionado.detalleTipoOperacion === 'Pagos Tercerizados Obra Pública' ? 'selected' : ''}>Pagos Tercerizados Obra Pública</option>
                <option value="Administración y Venta" ${registroSeleccionado.detalleTipoOperacion === 'Administración y Venta' ? 'selected' : ''}>Administración y Venta</option>
                <option value="Impuesto" ${registroSeleccionado.detalleTipoOperacion === 'Impuesto' ? 'selected' : ''}>Impuesto</option>
                <option value="Amortizaciones" ${registroSeleccionado.detalleTipoOperacion === 'Amortizaciones' ? 'selected' : ''}>Amortizaciones</option>
                <option value="Intereses" ${registroSeleccionado.detalleTipoOperacion === 'Intereses' ? 'selected' : ''}>Intereses</option>
                <option value="Otros egresos" ${registroSeleccionado.detalleTipoOperacion === 'Otros egresos' ? 'selected' : ''}>Otros egresos</option>
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
          Swal.showValidationMessage('El nombre no debe contener números.');
          return false;
        }

        if (!detalleOperacion || !detallesRegex.test(detalleOperacion)) {
          Swal.showValidationMessage('El detalle de la operación no debe contener caracteres no válidos.');
          return false;
        }

        return {
          nombreOperacion,
          tipoOperacion,
          detalleTipoOperacion,
          montoOperacion,
          detalleOperacion,
          fechaOperacion,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${URL_OPERACIONES_EDITAR}${registroSeleccionado.id_operacion}`,
            result.value,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire('¡Éxito!', 'La operación fue actualizada correctamente.', 'success');
          onOperacionEditado();
          clearRegistroSeleccionado();
        } catch (error) {
          console.error('Error al actualizar la operación:', error);
          Swal.fire('Error', 'Hubo un problema al actualizar la operación.', 'error');
        }
      } else {
        clearRegistroSeleccionado();
      }
    });
  };

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarOperaciones();
    }
  }, [registroSeleccionado]);

  return null;
};

export default EditarOperaciones;
