const { conection } = require("../DB/Config");

const alldaily_books = (req, res) => {
  // Obtenemos la fecha enviada desde el front
  const { fechaPorDia } = req.body;

  // Query para obtener los registros del libro diario según la fecha
  const query = `
    SELECT 'CERTIFICADO' as TIPO, o.nombreObra as Descripcion, c.montoCert as Monto, c.fechaPagoCert as Fecha
    FROM Certificados c
    JOIN Obras o ON o.id_obra = c.id_obra
    WHERE c.fechaPagoCert = ?

    UNION ALL

    SELECT 'VENTA TERRENO' as TIPO, t.direccionTerreno as Descripcion, t.precioTerreno as Monto, vt.fechaVentaTerreno as Fecha
    FROM VentaTerrenos vt
    JOIN Terrenos t ON t.id_terreno = vt.id_terreno
    WHERE vt.fechaVentaTerreno = ?

    UNION ALL

    SELECT 'OPERACION' as TIPO, concat(op.nombreOperacion, " ", op.tipoOperacion) as Descripcion, op.montoOperacion as Monto, op.fechaOperacion as Fecha
    FROM Operaciones op
    WHERE op.fechaOperacion = ?

    UNION ALL

    SELECT 'COMPRA MATERIAL' as TIPO, concat(stm.nombreMaterial, " (", cm.cantidadMaterial, ")") as Descripcion, 
        cm.precioMaterial as Monto, cm.fechaCompraMateriales as Fecha
    FROM CompraMateriales cm
    JOIN StockMateriales stm ON stm.id_stock = cm.id_stock
    WHERE cm.fechaCompraMateriales = ?

    UNION ALL

    SELECT 'REMUNERACION' as TIPO, (CASE WHEN rm.tipoEmpleado = 0 THEN 'Administrativo' ELSE 'Obrero' END) as Descripcion, 
        rm.montoRemuneracion as Monto, rm.fechaRemuneracion as Fecha
    FROM Remuneraciones rm
    WHERE rm.fechaRemuneracion = ?

    UNION ALL

    SELECT 'ALQUILER' as TIPO, concat(dp.nombreDepartamento, " - ", dp.direccionDepartamento) as Descripcion, 
        pal.montoPagoAlquiler as Monto, pal.fechaPagoAlquiler as Fecha
    FROM PagosAlquileres pal
    JOIN AlquilerDepartamentos ald ON ald.id_alquilerDepto = pal.id_alquilerDepto
    JOIN Departamentos dp ON dp.id_departamento = ald.id_departamento
    WHERE pal.fechaPagoAlquiler = ?`;

  // Ejecutamos la consulta en la base de datos
  conection.query(query, [fechaPorDia, fechaPorDia, fechaPorDia, fechaPorDia, fechaPorDia, fechaPorDia], (err, results) => {
    if (err) {
      // Si hay un error en la consulta, retornamos el error
      return res.status(500).json({ error: 'Error en la base de datos', details: err.message });
    }

    // Si los resultados tienen registros, se procede a verificar la fecha
    if (results.length > 0) {
      return res.json({
        message: 'Fecha encontrada',
        fecha: fechaPorDia,
        data: results  // Incluye los resultados obtenidos
      });
    } else {
      // Si no se encontraron registros, retornamos un mensaje de no encontrado
      return res.status(401).json({ message: 'Fecha no encontrada' });
    }
  });
};

const singlediary_book = (req, res) => {
  // Aquí puedes agregar la lógica para obtener un solo libro diario si lo necesitas
};

module.exports = { alldaily_books, singlediary_book };
