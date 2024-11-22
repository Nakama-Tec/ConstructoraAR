const { conection } = require("../DB/Config")

const allPedientes = (req, res) => {
    const query = `select * from Pendientes;`;
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
    const { fechaPendiente, descripcionPendiente, id_usuario } = req.body;
    const query = `insert into Pendientes (fechaPendiente, descripcionPendiente, id_usuario, activoPendiente) values ('${fechaPendiente}', '${descripcionPendiente}', '${id_usuario}', '${activoPendiente}');`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const editPendiente = (req, res) => {
    const { id_pendiente, fechaPendiente, descripcionPendiente } = req.body;
    const query = `update Pendientes set fechaPendiente= '${fechaPendiente}', descripcionPendiente= '${descripcionPendiente}', activoPendiente= ${activoPendiente} where id_pendiente = ${id_pendiente};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const deletePendiente = (req, res) => {
    const id = req.params.id;
    const query = `update Pendientes set activoPendiente=0 where id_pendiente = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

module.exports = { allPedientes,singlePendiente,createPendiente,editPendiente,deletePendiente }