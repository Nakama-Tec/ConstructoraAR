const { conection } = require("../DB/Config")

// Funcion para mostrar todos los detalles de los viajes

const allDetallesViajes = (req, res) => {
    const query = `SELECT dv.id_DetallesViaje as ID, o.nombreObra, o.direccionObra, veh.patenteVehiculo,
    veh.tipoVehiculo AS TIPOVehiculo, v.id_viaje, v.fechaViaje, sm.nombreMaterial AS Material, sm.ubicacionStock AS Deposito,
    sm.cantidadStock AS Cantidad_Material FROM Viajes v
JOIN 
    Obras o ON v.id_obra = o.id_obra
JOIN 
    Vehiculos veh ON veh.id_vehiculo = v.id_vehiculo
JOIN 
    DetallesViajes dv ON dv.id_viaje = v.id_viaje
JOIN 
    StockMateriales sm ON sm.id_stock = dv.id_stock
WHERE 
    o.activoObras = 1
    AND veh.activoVehiculo = 1
    AND v.activoViaje = 1
    AND dv.activoDetalleViaje = 1
    AND sm.activoStock = 1;
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
    const {cantidadMaterial ,id_viaje, id_stock} = req.body;
    const id = req.params.id;
    const query = `update DetallesViajes set id_viaje= ${id_viaje},  cantidadMaterial= ${cantidadMaterial}, id_stock= ${id_stock} where id_detalleViaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para crear un detalle de viaje

const createDetallesViajes = (req, res) => {
    const {cantidadMaterial ,id_viaje, id_stock} = req.body;
    const query = `insert into DetallesViajes (id_viaje, cantidadMaterial, id_stock) values (${id_viaje}, ${cantidadMaterial}, ${id_stock});`
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