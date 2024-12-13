const { conection } = require("../DB/Config")

const allPagosAlquileres = (req, res) => {
    const query = `select P.id_pagoAlquiler, P.FechaPagoAlquiler, A.id_alquilerDepto, P.MontoPagoAlquiler, C.NombreCliente, C.ApellidoCliente, D.NombreDepartamento
    from PagosAlquileres P
    join AlquilerDepartamentos A
    on A.id_alquilerDepto = P.id_alquilerDepto
    join Clientes C
    on C.id_cliente = A.id_cliente
    join Departamentos D
    on D.id_departamento = A.id_departamento
    where activoPagoAlquiler=1;`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const singlePagoAlquiler = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from PagosAlquileres where id_pago_alquiler = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const editPagosAlquileres = (req, res) => {
    const id = req.params.id
    const {fechaPagoAlquiler, montoPagoAlquiler} = req.body;
    const query = `update PagosAlquileres set fechaPagoAlquiler='${fechaPagoAlquiler}', montoPagoAlquiler='${montoPagoAlquiler}' where id_pagoAlquiler=${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const createPagosAlquileres = (req, res) => {
    const { fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto } = req.body;
    const query = `insert into PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto) values ('${fechaPagoAlquiler}', '${montoPagoAlquiler}', '${id_alquilerDepto}');`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const deletePagosAlquileres = (req, res) => {
    const id = req.params.id;
    const query = `update PagosAlquileres set activoPagoAlquiler=0 where id_pagoAlquiler = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};


module.exports = { allPagosAlquileres, singlePagoAlquiler, createPagosAlquileres, editPagosAlquileres, deletePagosAlquileres };
