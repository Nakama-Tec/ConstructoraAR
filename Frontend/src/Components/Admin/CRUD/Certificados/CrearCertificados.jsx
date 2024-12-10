import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthStore from "../../../../Context/useAuthStore";
import useRegistroStore from "../../../../Context/useRegistroStore";
import { URL_CERTIFICADOS_CREAR} from "../../../../Constants/endpoints-API";

const CrearCertificados = ({ onCertificadoRegistrado }) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);


  const handleRegistrarCertificados = () => {
    Swal.fire({
      title: "Registrar Certificado",
      html: `
            <input id="montoCert" type="number" placeholder="Monto del Certificado" class="swal2-input" />

            <input id="nroCertificado" type="number" placeholder="Numero del Certificado"  class="swal2-input" />
            
            <input id="fechaEmisionCert"  placeholder="Fecha de Emision"  class="swal2-input" />

            <input id="fechaPagoCert"  placeholder="Fecha de Pago"  class="swal2-input" />

            <input id="estadoCert"  placeholder="Estado"  class="swal2-input" /> 

            <input id="linkFacturaCert" placeholder="Link de Facturacion" class="swal2-input" />

            <input id="linkFacturaPagadaCert" placeholder="Link de factura del Certificado" class="swal2-input" />

            <br/>
            <br/>
            <label><strong>Selecciona la redeterminacion:</strong></label>
            <br/>
            <select id="redeterminacion" class="swal2-select">
            <option value="0">No revalorizado</option>
            <option value="1">Revalorizado</option>
            </select>

            <input id="valorredeterminacion" placeholder="valor de la redeterminacion" class="swal2-input" />

            <input id="fechaRedeterminacion" placeholder="fecha de redeterminacion" class="swal2-input" />
            
           
          <br/>
        `,
      confirmButtonText: "Registrar",
      showCancelButton: true,
      preConfirm: () => {
        const montoCert = document.getElementById("montoCert").value;
        const nroCertificado = document.getElementById("nroCertificado").value;
        const fechaEmisionCert = document.getElementById("fechaEmisionCert").value;
        const fechaPagoCert = document.getElementById("fechaPagoCert").value;
        const estadoCert = document.getElementById("estadoCert").value;
        const linkFacturaCert = document.getElementById("linkFacturaCert").value;
        const linkFacturaPagadaCert = document.getElementById("linkFacturaPagadaCert").value;
        const redeterminacion = document.getElementById("redeterminacion").value;
        const valorredeterminacion = document.getElementById("valorredeterminacion").value;
        const fechaRedeterminacion = document.getElementById("fechaRedeterminacion").value;

        // Validaciones
        const montoRegex = /^[0-9]+$/;
        const nroCertificadoRegex = /^[0-9]+$/;
        const fechaEmisionCertRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        const fechaPagoCertRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        const estadoCertRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const linkFacturaCertRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const linkFacturaPagadaCertRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const valorredeterminacionRegex = /^[0-9]+$/;
        const fechaRedeterminacionRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;


        if (!montoRegex.test(montoCert) ||!nroCertificadoRegex.test(nroCertificado) ||!fechaEmisionCertRegex.test(fechaEmisionCert) ||
          !fechaPagoCertRegex.test(fechaPagoCert) ||!estadoCertRegex.test(estadoCert) ||!linkFacturaCertRegex.test(linkFacturaCert) ||
          !linkFacturaPagadaCertRegex.test(linkFacturaPagadaCert) ||!valorredeterminacionRegex.test(valorredeterminacion) ||
          !fechaRedeterminacionRegex.test(fechaRedeterminacion)) { Swal.showValidationMessage("Verifica los datos ingresados.");}
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
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_CERTIFICADOS_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire(
            "¡Éxito!",
            "El certificado fue registrado correctamente.",
            "success"
          );
          onCertificadoRegistrado();
          closeRegistroModal();
        } catch (error) {
          Swal.fire(
            "Error",
            "Hubo un problema al registrar el certificado.",
            "error"
          );
        }
      } else {
        closeRegistroModal();
      }
    });
  };

  useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarCertificados();
    }
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearCertificados
