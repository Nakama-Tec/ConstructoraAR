const { conection } = require("../DB/Config")

// Funcion para mostrar todos los viajes

const allViajes = (req, res) => {
    const query = `
select V.id_viaje, V.fechaViaje, O.nombreObra, VH.patenteVehiculo from Viajes V
join Obras O on O.id_obra = V.id_obra
join Vehiculos VH on VH.id_vehiculo = V.id_vehiculo WHERE V.activoViaje = 1;`

    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para mostrar un viaje en particular

const singleViaje = (req, res) => {
    const id = req.params.id;
    const query = `select * from Viajes where id_viaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para editar un viaje

const editViaje = (req, res) => {
    const {fechaViaje, id_obra, id_vehiculo} = req.body;
    const id = req.params.id;
    const query = `update Viajes set fechaViaje= '${fechaViaje}', id_obra= '${id_obra}', id_vehiculo= ${id_vehiculo} where id_viaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para crear un viaje

const createViaje = (req, res) => {
    const {fechaViaje, id_obra, id_vehiculo} = req.body;
    const query = `insert into Viajes (fechaViaje, id_obra, id_vehiculo) values ('${fechaViaje}', ${id_obra}, ${id_vehiculo});`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({
            message: "Viaje creado exitosamente",
            id: results.insertId,
          });
    })
}

//Funcion para eliminar un viaje

const deleteViaje = (req, res) => {
    const id = req.params.id;
    const query = `update Viajes set activoViaje = 0 where id_viaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

module.exports = {allViajes, singleViaje, createViaje, editViaje, deleteViaje}
