const { conection } = require("../DB/Config")

const allEmpleado = (req, res) => {
    const query = `select * from Empleados;`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const singleEmpleado = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from Empleados where id_empleado = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });}

const createEmpleado = (req, res) => {
    const { nombreEmpleado, apellidoEmpleado, dniEmpleado, direccionEmpleado, telefonoEmpleado, emailEmpleado, id_obra } = req.body;
    const query = `insert into Empleados (nombreEmpleado, apellidoEmpleado, dniEmpleado, direccionEmpleado, telefonoEmpleado, emailEmpleado, id_obra, activoEmpleado) values ('${nombreEmpleado}', '${apellidoEmpleado}', '${dniEmpleado}', '${direccionEmpleado}', '${telefonoEmpleado}', '${emailEmpleado}', '${id_obra}', '${activoEmpleado}');`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

const editEmpleado = (req, res) => {
    const { id_empleado, nombreEmpleado, apellidoEmpleado, dniEmpleado, direccionEmpleado, telefonoEmpleado, emailEmpleado } = req.body;
    const query = `update Empleados set nombreEmpleado= '${nombreEmpleado}', apellidoEmpleado= '${apellidoEmpleado}', dniEmpleado= '${dniEmpleado}', direccionEmpleado= '${direccionEmpleado}', telefonoEmpleado= '${telefonoEmpleado}', emailEmpleado= '${emailEmpleado}', activoEmpleado= ${activoEmpleado} where id_empleado = ${id_empleado};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

const deleteEmpleado = (req, res) => {
    const id = req.params.id;
    const query = `update Empleados set activoEmpleado=0 where id_empleado = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}



module.exports = {allEmpleado,singleEmpleado,createEmpleado,editEmpleado,deleteEmpleado}