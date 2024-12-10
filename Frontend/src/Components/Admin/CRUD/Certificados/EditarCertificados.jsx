import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_CERTIFICADOS_EDITAR, URL_CLIENTES_EDITAR } from '../../../../Constants/endpoints-API';

const EditarCertificados = ({ onCertificadoEditado }) => {
  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const handleEditarCertificados = () => {
    Swal.fire({
      title: 'Editar Certificado',
      html: `

        <input id="montoCert" class="swal2-input" value="${registroSeleccionado.montoCert}" />

        <input id="nroCertificado" class="swal2-input" value="${registroSeleccionado.nroCertificado}" />

        <input id="fechaEmisionCert" class="swal2-input" value="${registroSeleccionado.fechaEmisionCert}" />

        <input id="fechaPagoCert" class="swal2-input" value="${registroSeleccionado.fechaPagoCert}" />

        <input id="estadoCert" class="swal2-input" value="${registroSeleccionado.estadoCert}" />

        <input id="linkFacturaCert" class="swal2-input" value="${registroSeleccionado.linkFacturaCert}" />

        <input id="linkFacturaPagadaCert" class="swal2-input" value="${registroSeleccionado.linkFacturaPagadaCert}" />

        <br/>
        <br/>
        <label><strong>Selecciona la redeterminacion:</strong></label>
        <br/>
        <select id="redeterminacion" class="swal2-select">
        <option value="0" ${registroSeleccionado.redeterminacion === '0' ? 'selected' : ''}>No revalorizado</option>
        <option value="1" ${registroSeleccionado.redeterminacion === '1' ? 'selected' : ''}>Revalorizado</option>
      </select>

      <input id="valorredeterminacion" class="swal2-input" value="${registroSeleccionado.valorredeterminacion}" />

      <input id="fechaRedeterminacion" class="swal2-input" value="${registroSeleccionado.fechaRedeterminacion}" />

      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const montoCert = document.getElementById('montoCert').value;
        const nroCertificado = document.getElementById('nroCertificado').value;
        const fechaEmisionCert = document.getElementById('fechaEmisionCert').value;
        const fechaPagoCert = document.getElementById('fechaPagoCert').value;
        const estadoCert = document.getElementById('estadoCert').value;
        const linkFacturaCert = document.getElementById('linkFacturaCert').value;
        const linkFacturaPagadaCert = document.getElementById('linkFacturaPagadaCert').value;
        const redeterminacion = document.getElementById('redeterminacion').value;
        const valorredeterminacion = document.getElementById('valorredeterminacion').value;
        const fechaRedeterminacion = document.getElementById('fechaRedeterminacion').value;

        // Validaciones
        const montoRegex = /^[0-9]+$/;
        const nroCertificadoRegex = /^[0-9]+$/;
        const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
        const estadoRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const linkRegex = /^(http|https):\/\/[^ "]+$/;
        const valorredeterminacionRegex = /^[0-9]+$/;
        const fechaRedeterminacionRegex = /^\d{4}-\d{2}-\d{2}$/;
        const redeterminacionRegex = /^[0-1]$/;
     
        if (!montoCert || !montoRegex.test(montoCert)) {
          Swal.showValidationMessage('El monto debe ser un número.');
          return false;
        }
        if (!nroCertificado || !nroCertificadoRegex.test(nroCertificado)) {
          Swal.showValidationMessage('El número de certificado debe ser un número.');
          return false;
        }
        if (!fechaEmisionCert || !fechaRegex.test(fechaEmisionCert)) {
          Swal.showValidationMessage('La fecha de emisión debe tener el formato YYYY-MM-DD.');
          return false;
        }
        if (!fechaPagoCert || !fechaRegex.test(fechaPagoCert)) {
          Swal.showValidationMessage('La fecha de pago debe tener el formato YYYY-MM-DD.');
          return false;
        }
        if (!estadoCert || !estadoRegex.test(estadoCert)) {
          Swal.showValidationMessage('El estado debe ser un texto.');
          return false;
        }
        if (!linkFacturaCert || !linkRegex.test(linkFacturaCert)) {
          Swal.showValidationMessage('El link de la factura debe ser una URL.');
          return false;
        }
        if (!linkFacturaPagadaCert || !linkRegex.test(linkFacturaPagadaCert)) {
          Swal.showValidationMessage('El link de la factura pagada debe ser una URL.');
          return false;
        }
        if (!valorredeterminacion || !valorredeterminacionRegex.test(valorredeterminacion)) {
          Swal.showValidationMessage('El valor de redeterminación debe ser un número.');
          return false;
        }
        if (!fechaRedeterminacion || !fechaRedeterminacionRegex.test(fechaRedeterminacion)) {
          Swal.showValidationMessage('La fecha de redeterminación debe tener el formato YYYY-MM-DD.');
          return false;
        }
        if (!redeterminacion || !redeterminacionRegex.test(redeterminacion)) {
          Swal.showValidationMessage('La redeterminación debe ser 0 o 1.');
          return false;
        }



        return {
          montoCert,
          nroCertificado,
          fechaEmisionCert,
          fechaPagoCert,
          estadoCert,
          linkFacturaCert,
          linkFacturaPagadaCert,
          redeterminacion,
          valorredeterminacion,
          fechaRedeterminacion,
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${URL_CERTIFICADOS_EDITAR}${registroSeleccionado.id_certificado}`, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El certificado fue actualizado correctamente.', 'success');
          onClienteEditado(); 
          clearRegistroSeleccionado(); 
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al actualizar el certificado.', 'error');
        }
      } else {
        clearRegistroSeleccionado(); 
      }
    });
  };

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarCertificados();
    }
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarCertificados
