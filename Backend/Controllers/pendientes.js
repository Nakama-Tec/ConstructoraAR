const { conection } = require("../DB/Config")

const allPedientes = (req, res) => {
    const query = `select * from Pendientes where activoPendiente=1;`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const singlePendiente = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from Pendientes where id_pendiente = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}


const createPendiente = (req, res) => {
    const { Descripcion, fechaCreacion, fechaLimite, prioridad, estado } = req.body;
    const query = `insert into Pendientes (Descripcion, fechaCreacion, fechaLimite, prioridad, estado) values ('${Descripcion}', '${fechaCreacion}', '${fechaLimite}', '${prioridad}', '${estado}');`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const editPendiente = (req, res) => {
    const { Descripcion, fechaCreacion, fechaLimite, prioridad, estado } = req.body;
    const { id } = req.params;
    const query = `update Pendientes set Descripcion='${Descripcion}', fechaCreacion='${fechaCreacion}', fechaLimite='${fechaLimite}', prioridad='${prioridad}', estado='${estado}' where id_pendiente=${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const deletePendiente = (req, res) => {
    const id = req.params.id;
    const query = `update Pendientes set activoPendiente=0 where id_pendiente=${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

module.exports = { allPedientes,singlePendiente,createPendiente,editPendiente,deletePendiente }