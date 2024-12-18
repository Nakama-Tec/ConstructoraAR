import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';


const VerUsuarios = ({ onUsuarioVer }) => {
  const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();

  const handleVerUsuario = () => {
      Swal.fire({
        title: 'Detalle del Usuario',
        icon: 'info',
        html: `
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tbody>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nombre Usuario :</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreUsuario}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Mail Usuario :</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.mailUsuario}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Contraseña Usuario:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.passwordUsuario}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Rol del Usuario:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.rol}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">ID Empleado:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.id_Empleado}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Nombre Empleado:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nomEmpleado}</td>
              </tr>
            </tbody>
          </table>
        `,
        confirmButtonText: 'Cerrar',
        customClass: {
          popup: 'swal-wide',
        },
        width: '600px', // Aumentar el ancho del modal para mejor presentación
        didClose: () => {
          clearVerRegistroSeleccionado(); // Limpiar los registros al cerrar el modal
        },
      });
    };

  useEffect(() => {
    if (verRegistroSeleccionado) {
      handleVerUsuario();
    }
  }, [verRegistroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default VerUsuarios