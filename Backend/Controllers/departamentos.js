const { conection } = require("../DB/Config")


const allDepartamentos = (req, res) => {
    const query = `select * from Departamentos where activoDepto=1;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleDepartamentos = (req, res) => {
    const id = req.params.id
    const query = `select * from Departamentos where id_departamento=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}
const createDepartamentos = (req, res) => {
    const {nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion} = req.body

    const query = `insert into Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto) values("${nombreDepartamento}","${direccionDepartamento}","${disponibilidadDepartamento}","${descripcionDepartamento}","${precioDepartamento}", "${precioExpensa}", "${serviciosIncluidos}", "${contratoDescripcion}", 1)`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editDepartamentos = (req, res) => {
    const id = req.params.id
    const {nombreDepartamento, direccionDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, disponibilidadDepartamento} = req.body
    const query = `update Departamentos set nombreDepartamento="${nombreDepartamento}",direccionDepartamento="${direccionDepartamento}", descripcionDepartamento="${descripcionDepartamento}", precioDepartamento="${precioDepartamento}", precioExpensa="${precioExpensa}", serviciosIncluidos="${serviciosIncluidos}", contratoDescripcion="${contratoDescripcion}", disponibilidadDepartamento="${disponibilidadDepartamento}", activoDepto=1 where id_departamento=${id}`
    conection.query(query, (err,results) => {
        if(err) throw err
        res.send(results)
    })
}

const deleteDepartamentos = (req, res) => {
    const id = req.params.id
    const query = `update Departamentos set activoDepto=0 where id_departamento=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

module.exports = {allDepartamentos, singleDepartamentos,createDepartamentos,editDepartamentos,deleteDepartamentos}