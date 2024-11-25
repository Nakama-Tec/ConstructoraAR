const { conection } = require("../DB/Config")

// cambiar endpoints
const allAlquilerDepartamentos = (req, res) => {
    
    const query = `select A.id_alquilerDepto, A.FechaInicioAlquiler, A.FechaFinAlquiler, D.NombreDepartamento, D.DireccionDepartamento, D.DescripcionDepartamento, D.PrecioDepartamento,D.PrecioExpensa, C.NombreCliente, C.ApellidoCliente, C.TelefonoCliente 
from AlquilerDepartamentos A
join Departamentos D
on D.id_departamento = A.id_departamento
join Clientes C
on C.id_cliente = A.id_cliente
where A.activoAlquiler = 1`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleAlquilerDepartamento = (req, res) => {
    const id = req.params.id;
    const query = `select * from AlquilerDepartamentos where id_alquilerDepartamento = ${id}`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const createAlquilerDepartamento = (req, res) => {
    const {fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente } = req.body;
    const query = `insert into AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente) values ('${fechaInicioAlquiler}','${fechaFinAlquiler}', ${id_departamento}, ${id_cliente})`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
    
}

const editAlquilerDepartamentos = (req, res) => {
    const { id_departamento, id_cliente, fechaInicioAlquiler, fechaFinAlquiler } = req.body;
    const id = req.params.id;
    const query = `update AlquilerDepartamentos set id_departamento = ${id_departamento}, id_cliente = ${id_cliente}, fechaInicioAlquiler = '${fechaInicioAlquiler}', fechaFinAlquiler = '${fechaFinAlquiler}' where id_alquilerDepto = ${id}`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const deleteAlquilerDepartamentos = (req, res) => {
    const id = req.params.id;
    const query = `update AlquilerDepartamentos set activoAlquiler=0 where id_alquilerDepto = ${id}`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

module.exports = { allAlquilerDepartamentos, singleAlquilerDepartamento, createAlquilerDepartamento, editAlquilerDepartamentos, deleteAlquilerDepartamentos }