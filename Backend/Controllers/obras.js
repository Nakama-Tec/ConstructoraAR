const { conection } = require("../DB/Config")


const allObras = (req, res) => {
    const query = `SELECT 
    Obras.*,
    Clientes.nombreCliente,
    Clientes.apellidoCliente,
    Clientes.id_cliente
    FROM 
    Obras
    LEFT JOIN 
    Clientes 
    ON 
    Obras.id_cliente = Clientes.id_cliente
    where activoObras = 1;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleObra = (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const query = `select * from Obras where id_obra=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}
const createObra = (req, res) => {
    const {nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra,id_cliente, direccionObra} = req.body

    const query = `insert into Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras,direccionObra) values("${nombreObra}","${descripcionObra}","${fechainicioObra}","${fechafinObra}", "${precioObra}","${sectorObra}","${progresoObra}", "${id_cliente}",1,"${direccionObra}")`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editObra = (req, res) => {
    const id = req.params.id
    console.log(req.body);
    const {nombreObra,direccionObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente} = req.body
    const query = `update Obras set nombreObra="${nombreObra}",  direccionObra="${direccionObra}",descripcionObra="${descripcionObra}", fechainicioObra="${fechainicioObra}",fechafinObra="${fechafinObra}", precioObra="${precioObra}", sectorObra="${sectorObra}", progresoObra="${progresoObra}",id_cliente="${id_cliente}", activoObras=1 where id_obra=${id}`
    conection.query(query, (err,results) => {
        if(err) throw err
        res.send(results)
    })
}

const deleteObra = (req, res) => {
    const id = req.params.id
    const query = `update Obras set activoObras=0 where id_obra=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

module.exports = {allObras, singleObra,createObra,editObra,deleteObra}
