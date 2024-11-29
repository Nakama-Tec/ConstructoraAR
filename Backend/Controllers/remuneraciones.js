const { conection } = require("../DB/Config")

const allRemuneraciones = (req, res) => {
    const query = `select * from Remuneraciones where activoRemuneracion= 1;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const singleRemuneracion = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from Remuneraciones where id_remuneracion = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const editRemuneracion = (req, res) => {
    const id = req.params.id;
    const { detalle, montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion } = req.body;
    const query = `update Remuneraciones set detalle= '${detalle}', montoRemuneracion=  '${montoRemuneracion}', cantEmpleado= '${cantEmpleado}', tipoEmpleado= '${tipoEmpleado}', fechaRemuneracion= '${fechaRemuneracion}', sectorRemuneracion= '${sectorRemuneracion}' where id_remuneracion = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

const createRemuneracion = (req, res) => {
    const { detalle, montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion } = req.body;
    const query = `insert into Remuneraciones (detalle, montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion) values ('${detalle}','${montoRemuneracion}', '${cantEmpleado}', '${tipoEmpleado}', '${fechaRemuneracion}', '${sectorRemuneracion}');`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

const deleteRemuneracion = (req, res) => {
    const id = req.params.id;
    const query = `update Remuneraciones set activoRemuneracion=0 where id_remuneracion = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}


module.exports = { allRemuneraciones, singleRemuneracion, createRemuneracion, editRemuneracion, deleteRemuneracion }