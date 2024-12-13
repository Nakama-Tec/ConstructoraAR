const { conection } = require("../DB/Config")

const allUsuarios = (req, res) => {
    const query = `SELECT  
    u.id_usuario,
    u.nombreUsuario,
    u.mailUsuario,
    u.passwordUsuario,
    u.rol,
    u.activoUsuario,
    u.id_Empleado,
    CONCAT(e.nombreEmpleado, ' ', e.apellidoEmpleado) AS nomEmpleado
    FROM 
    Usuarios u
    JOIN 
    Empleados e 
    ON  
    u.id_Empleado = e.id_Empleado
    where activoUsuario=1;`


    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

// const singleUsuario = (req, res) => {
//     const id = req.params.id;
//     const query = `select * from Usuarios where id_usuario = ${id};`
//     conection.query(query, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     })
// }

const editUsuarios = (req, res) => {
    const { nombreUsuario, mailUsuario, passwordUsuario, rol, id_Empleado } = req.body;
    const {id} = req.params;
    const query = `update Usuarios set nombreUsuario= '${nombreUsuario}', mailUsuario= '${mailUsuario}', passwordUsuario= '${passwordUsuario}', rol= '${rol}', id_Empleado= ${id_Empleado} where id_usuario = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

const createUsuarios = (req, res) => {
    const { nombreUsuario, mailUsuario, passwordUsuario, rol, id_Empleado } = req.body;
    const query = `insert into Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, id_Empleado) values ('${nombreUsuario}', '${mailUsuario}', '${passwordUsuario}', '${rol}', ${id_Empleado} );`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}


const deleteUsuarios = (req, res) => {
    const id = req.params.id;
    const query = `update Usuarios set activoUsuario=0 where id_usuario = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}
module.exports = { allUsuarios, createUsuarios, editUsuarios, deleteUsuarios }