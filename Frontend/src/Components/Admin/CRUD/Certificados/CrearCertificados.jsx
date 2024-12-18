import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthStore from "../../../../Context/useAuthStore";
import useRegistroStore from "../../../../Context/useRegistroStore";
import { URL_CERTIFICADOS, URL_CERTIFICADOS_CREAR, URL_OBRAS } from "../../../../Constants/endpoints-API";

const CrearCertificados = ({ onCertificadoRegistrado }) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const [obras, setObras] = useState([]);

  const getObras = async () => {
    try {
      const response = await axios.get(URL_OBRAS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setObras(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const handleRegistrarCertificados = () => {
    Swal.fire({
      title: "Registrar Certificado",
      html: `
            <input id="montoCert" type="number" min="0" placeholder="Monto del Certificado" class="swal2-input" />

            <input id="nroCertificado" type="number" min="0" placeholder="Numero del Certificado"  class="swal2-input" />
            <br>
            <br>
            <label><b>Fecha Emision</b></label> 
            <br>
            <input id="fechaEmisionCert"  placeholder="Fecha de Emision" type="date" class="swal2-input" />
            <br>
            <br>
            <label><b>Fecha Pago</b></label> 
            <br>
            <input id="fechaPagoCert"  placeholder="Fecha de Pago" type="date" class="swal2-input" />
            <br/>
            <br/>
            <label><strong>Selecciona el estado:</strong></label>
            <br/>
            <select id="estadoCert" class="swal2-select">
            <option value="0">Pagado</option>
            <option value="1">No Pagado</option>
            <br/>
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
            <br/>
            <br/>
            <label><strong>Valor redeterminacion:</strong></label>
            <br/>
            <input id="valorredeterminacion" type="number" min="0" placeholder="valor de la redeterminacion" class=" swal2-input" />
            <br>
            <br>
            <label><b>Fecha Redeterminacion</b></label> 
            <br>
            <input id="fechaRedeterminacion" placeholder="fecha de redeterminacion" type="date" class="swal2-input" />
            <br/>
            <br/>
            <label><strong>Selecciona la obra asociada:</strong></label>
            <br/>
            <select id="id_obra" class="swal2-select">
            ${obras.map((obra) => `<option value="${obra.id_obra}">${obra.nombreObra}</option>`).join('')}
            </select>

        `,
      confirmButtonText: "Registrar",
      showCancelButton: true,
      preConfirm: async () => {
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
        const id_obra = document.getElementById("id_obra").value;

        // Validaciones
        const montoRegex = /^[0-9]+$/;
        const nroCertificadoRegex = /^[0-9]+$/;
        const linkFacturaCertRegex = /^(?:(?:http|https|ftp):\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/
        const linkFacturaPagadaCertRegex = /^(?:(?:http|https|ftp):\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/

       if(!montoCert || !montoRegex.test(montoCert)){
          Swal.showValidationMessage("El monto del certificado no puede estar vacio y debe ser un numero.");
          return false;
        }

        if(!nroCertificado || !nroCertificadoRegex.test(nroCertificado)){
          Swal.showValidationMessage("El numero del certificado no puede estar vacio y debe ser un numero.");
          return false;
        }

        if(!linkFacturaCert || !linkFacturaCertRegex.test(linkFacturaCert)){
          Swal.showValidationMessage("El link de la factura no puede estar vacio y debe ser un link.");
          return false;
        }

        if(!linkFacturaPagadaCert || !linkFacturaPagadaCertRegex.test(linkFacturaPagadaCert)){
          Swal.showValidationMessage("El link de la factura pagada no puede estar vacio y debe ser un link.");
          return false;
        }

        try {
          const response = await axios.get(`${URL_CERTIFICADOS}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const certificados = response.data;
          //Verificar si el Numero del certificado ya se encuentra registrado
          const numeroExistente = certificados.some((certificado) => certificado.nroCertificado === parseInt(nroCertificado));
          if (numeroExistente) {
            Swal.showValidationMessage("El Certificado ya se encuentra registrado.");
            return false;
          }
        } catch (error) {
          console.error('Error al verificar el Certificado:', error);
          Swal.showValidationMessage("Hubo un problema al verificar el Certificado.");
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
          id_obra,
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
    getObras();
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearCertificados
