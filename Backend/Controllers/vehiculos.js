const { conection } = require("../DB/Config")


const allVehiculos = (req, res) => {
    const query = `select * from Vehiculos where activoVehiculo=1;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleVehiculo = (req, res) => {
    const id = req.params.id
    const query = `select * from Vehiculos where id_vehiculo=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}
const createVehiculo = (req, res) => {
    const {marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo} = req.body

    const query = `insert into Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo) values("${marcaVehiculo}","${patenteVehiculo}","${tipoVehiculo}","${seguroVehiculo}")`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editVehiculo = (req, res) => {
    const id = req.params.id
    const {marcaVehiculo,patenteVehiculo, tipoVehiculo, seguroVehiculo} = req.body
    const query = `update Vehiculos set marcaVehiculo="${marcaVehiculo}",patenteVehiculo="${patenteVehiculo}", tipoVehiculo="${tipoVehiculo}",seguroVehiculo="${seguroVehiculo}" where id_vehiculo=${id}`
    conection.query(query, (err,results) => {
        if(err) throw err
        res.send(results)
    })
}

const deleteVehiculo = (req, res) => {
    const id = req.params.id
    const query = `update Vehiculos set activoVehiculo=0 where id_vehiculo=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

module.exports = {allVehiculos, singleVehiculo,createVehiculo,editVehiculo,deleteVehiculo}