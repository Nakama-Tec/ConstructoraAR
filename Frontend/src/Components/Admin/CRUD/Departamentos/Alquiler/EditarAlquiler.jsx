import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import { URL_ALQUILERES_EDITAR, URL_DEPARTAMENTOS, URL_CLIENTES } from '../../../../../Constants/endpoints-API';

const EditarAlquiler = ({ onAlquilerEditado }) => {
    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
    const [departamentos, setDepartamentos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const getDepartamentos = async () => {
        try {
            const response = await axios.get(URL_DEPARTAMENTOS, { headers: { Authorization: `Bearer ${token}` } });
            setDepartamentos(response.data);
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
        }
    };

    const getClientes = async () => {
        try {
            const response = await axios.get(URL_CLIENTES, { headers: { Authorization: `Bearer ${token}` } });
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener el Cliente:', error);
        }
    };

    const handleEditarAlquiler = () => {
        Swal.fire({
            title: 'Editar Alquiler',
            html: `
                <label><b>Fecha Inicio</b></label> 
                <br>
                <input id="fechaInicioAlquiler" class="swal2-input" type="date" value="${registroSeleccionado.FechaInicioAlquiler}" />
                <br> 
                <br>
                <label><b>Fecha Fin</b></label> 
                <br>
                <input id="fechaFinAlquiler" class="swal2-input" type="date" value="${registroSeleccionado.FechaFinAlquiler}" />
                <br/>
                <br/>
                <label><b>Selecciona el departamento:</b></label>
                <select id="select_departamento" class="swal2-select">
                ${departamentos
                    .map(
                        (departamento) =>
                            `<option value="${departamento.id_departamento}" ${
                                departamento.id_departamento === registroSeleccionado.id_alquilerDepto ? 'selected' : ''
                            }>${departamento.nombreDepartamento} </option>`
                    )
                    .join('')}
            </select>
            <br/>
            <br/>
            <label><b>Selecciona el cliente:</b></label>
            <select id="select_cliente" class="swal2-select">
                ${clientes
                    .map(
                        (clientes) =>
                            `<option value="${clientes.id_cliente}" ${
                                clientes.id_cliente === registroSeleccionado.id_alquilerDepto ? 'selected' : ''
                            }>${clientes.nombreCliente} ${clientes.apellidoCliente}</option>`
                    )
                    .join('')}
            </select>
            `,
            confirmButtonText: 'Enviar',
            showCancelButton: true,
            preConfirm: () => {
                const fechaInicioAlquiler = document.getElementById('fechaInicioAlquiler').value;
                const fechaFinAlquiler = document.getElementById('fechaFinAlquiler').value;
                const id_departamento = document.getElementById('select_departamento').value;
                const id_cliente = document.getElementById('select_cliente').value;

                if (!fechaInicioAlquiler || !fechaFinAlquiler || !id_departamento || !id_cliente) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                }

                return {
                    fechaInicioAlquiler,
                    fechaFinAlquiler,
                    id_departamento,
                    id_cliente,
                };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${URL_ALQUILERES_EDITAR}${registroSeleccionado.id_alquilerDepto}`, result.value, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    Swal.fire('¡Éxito!', 'El alquiler fue actualizado correctamente.', 'success');
                    onAlquilerEditado();
                    clearRegistroSeleccionado();
                } catch (error) {
                    console.error('Error al actualizar alquiler:', error);
                    Swal.fire('Error', 'Hubo un problema al actualizar el alquiler.', 'error');
                }
            } else {
                clearRegistroSeleccionado();
            }
        });
    };

    useEffect(() => {
        if (registroSeleccionado) {
            handleEditarAlquiler();
        }
        getDepartamentos();
        getClientes();
    }, [registroSeleccionado]);

    return null; // Este componente no renderiza nada en pantalla
};

export default EditarAlquiler;
