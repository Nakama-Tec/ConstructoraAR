const { conection } = require("../DB/Config")

const allTerrenos = (req, res) => {
    const query = `select * from Terrenos where activoTerreno=1;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const singleTerreno = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from Terrenos where id_terreno = ${id};`

    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const editTerreno = (req, res) => {
    const { direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno} = req.body;
    const id = req.params.id;
    const query = `update Terrenos set direccionTerreno = '${direccionTerreno}', metrosTerrenos = '${metrosTerrenos}', disponibilidadTerreno = '${disponibilidadTerreno}', precioTerreno = '${precioTerreno}' where id_terreno=${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({ msg: "Terreno actualizado" });
    })
}

const createTerreno = (req, res) => {
    const { direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno } = req.body;
    const query = `insert into Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno) values ('${direccionTerreno}', '${metrosTerrenos}', '${disponibilidadTerreno}', '${precioTerreno}');`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({ msg: "Terreno creado" });
    })
}

const deleteTerreno = (req, res) => {
    const id = req.params.id;
    const query = `update Terrenos set activoTerreno=0 where id_terreno = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

module.exports = { allTerrenos, singleTerreno, createTerreno, editTerreno, deleteTerreno }