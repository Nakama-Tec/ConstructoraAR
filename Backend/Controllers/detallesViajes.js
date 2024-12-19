const { conection } = require("../DB/Config")

// Funcion para mostrar todos los detalles de los viajes

const allDetallesViajes = (req, res) => {
    const query = `SELECT 
    DV.id_DetallesViaje,
    DV.cantidadStock,
    DV.fechaViaje,
    O.id_obra,
    O.nombreObra,
    O.direccionObra,
    V.id_vehiculo,
    V.patenteVehiculo,
    V.tipoVehiculo,
    SM.id_stock,
    SM.nombreMaterial,
    SM.ubicacionStock
FROM 
    DetallesViajes DV
INNER JOIN 
    Obras O ON DV.id_obra = O.id_obra
INNER JOIN 
    Vehiculos V ON DV.id_vehiculo = V.id_vehiculo
INNER JOIN 
    StockMateriales SM ON DV.id_stock = SM.id_stock
WHERE 
    DV.activoDetalleViaje = 1;
`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para mostrar un detalle de viaje en particular

const singleDetallesViajes = (req, res) => {
    const id = req.params.id;
    const query = `select * from DetallesViajes where id_detalleViaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para editar un detalle de viaje

const editDetallesViajes = (req, res) => {
    const {fechaViaje, cantidadStock , id_obra, id_vehiculo, id_stock} = req.body;
    const id = req.params.id;
    const query = `update DetallesViajes set cantidadStock=${cantidadStock}, fechaViaje='${fechaViaje}', id_obra=${id_obra}, id_vehiculo=${id_vehiculo}, id_viaje=1, id_stock= ${id_stock} where id_DetallesViaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para crear un detalle de viaje

const createDetallesViajes = (req, res) => {
    const {cantidadStock, fechaViaje, id_obra, id_vehiculo, id_stock} = req.body;
    const query = `insert into DetallesViajes (cantidadStock, fechaViaje, id_obra, id_vehiculo, id_viaje, id_stock) values (${cantidadStock}, '${fechaViaje}', 1, ${id_obra}, ${id_vehiculo}, ${id_stock});` 
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para eliminar un detalle de viaje

const deleteDetallesViajes = (req, res) => {
    const id = req.params.id;
    const query = `update DetallesViajes set activoDetalleViaje = 0 where id_detalleViaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

module.exports = {allDetallesViajes, singleDetallesViajes, createDetallesViajes, editDetallesViajes, deleteDetallesViajes}