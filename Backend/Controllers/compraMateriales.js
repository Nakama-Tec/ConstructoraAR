const { conection } = require("../DB/Config")

// Funcion para mostrar todas las compras de materiales

const allCompraMateriales = (req, res) => {
    const query = `select c.id_compraMaterial,s.nombreMaterial as Nombre, c.cantidadMaterial as Cantidad, c.precioMaterial as Precio, c.estadoRetiro as Estado,c.fechaCompraMateriales as Fecha_Compra,
c.lugardeCompra as Proveedor,c.destinoMaterial as Destino from StockMateriales s
join CompraMateriales c on s.id_stock = c.id_stock 
where c.activoCompra=1;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para mostrar una compra de material en particular
const singleCompraMateriales = (req, res) => {
    const id = req.params.id;
    const query = `select * from CompraMateriales where id_compraMaterial = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}



//Funcion para editar una compra de material
const editCompraMateriales = (req, res) => {
    const {
        nombreMaterial,      // Nombre del material
        ubicacionStock,      // Ubicación del stock (destino)
        cantidadMaterial,    // Cantidad comprada
        precioMaterial,      // Precio unitario
        fechaCompraMateriales, // Fecha de compra
        estadoRetiro,        // Estado del retiro
        lugardeCompra,        // Proveedor o lugar de compra
        destinoMaterial      // Destino del material
    } = req.body;

    const id = req.params.id;

    // Solo se actualizan compras activas
    const query = `
        UPDATE CompraMateriales
        SET nombreMaterial = ?,
            ubicacionStock = ?,
            cantidadMaterial = ?, 
            precioMaterial = ?, 
            fechaCompraMateriales = ?, 
            estadoRetiro = ?, 
            lugardeCompra = ?,
            destinoMaterial = ?
        WHERE id_compraMaterial = ? AND activoCompra = 1;
    `;

    const params = [nombreMaterial, ubicacionStock, cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, destinoMaterial, id];

    conection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error al actualizar la compra de material:", err);
            res.status(500).send("Error al actualizar la compra de material.");
        } else if (results.affectedRows === 0) {
            res.status(404).send("Compra de material no encontrada o desactivada.");
        } else {
            res.status(200).send("Compra de material actualizada con éxito.");
        }
    });
};

const createCompraMateriales = (req, res) => {
    const {
        nombreMaterial,    // Nombre del material
        ubicacionStock,    // Ubicación del stock (destino)
        cantidadMaterial,  // Cantidad comprada
        precioMaterial,    // Precio unitario
        estadoRetiro,      // Estado del retiro
        fechaCompraMateriales, // Fecha de compra
        lugardeCompra,     // Proveedor o lugar de compra
        destinoMaterial    // Destino del material
    } = req.body;

    // Llamar al procedimiento almacenado
    const query = `CALL gestionarCompraMaterial(
        ?, ?, ?, ?, ?, ?, ?, ?
    )`;

    const params = [
        nombreMaterial,
        ubicacionStock,
        cantidadMaterial,
        precioMaterial,
        estadoRetiro,
        fechaCompraMateriales,
        lugardeCompra,
        destinoMaterial
    ];

    conection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error al crear la compra de material.");
        } else {
            res.status(201).send("Compra de material registrada con éxito.");
        }
    });
};





//Funcion para eliminar una compra de material
const deleteCompraMateriales = (req, res) => {
    const id = req.params.id;

    // Solo desactiva compras activas
    const query = `
        UPDATE CompraMateriales SET activoCompra = 0  WHERE id_compraMaterial = ? ;
    `;

    conection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar la compra de material:", err);
            res.status(500).send("Error al eliminar la compra de material.");
        } else if (results.affectedRows === 0) {
            res.status(404).send("Compra de material no encontrada o ya desactivada.");
        } else {
            res.status(200).send("Compra de material eliminada (lógica) con éxito.");
        }
    });
};


module.exports = { allCompraMateriales, singleCompraMateriales, createCompraMateriales, editCompraMateriales, deleteCompraMateriales }