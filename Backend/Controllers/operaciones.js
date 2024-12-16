const { conection } = require("../DB/Config");

// Obtener todas las operaciones activas
const allOperaciones = (req, res) => {
  const query = `SELECT * FROM Operaciones WHERE activoOperacion = 1;`;
  conection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener operaciones:", err);
      return res.status(500).json({ error: "Error al obtener operaciones" });
    }
    res.json(results);
  });
};

// Obtener una operación por ID
const singleOperaciones = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM Operaciones WHERE id_operacion = ?`;
  conection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener la operación:", err);
      return res.status(500).json({ error: "Error al obtener la operación" });
    }
    res.json(results);
  });
};

// Crear una nueva operación
const createOperaciones = (req, res) => {
  const { nombreOperacion, tipoOperacion, detalleTipoOperacion, montoOperacion, detalleOperacion, fechaOperacion } = req.body;

  const query = `INSERT INTO Operaciones (nombreOperacion, tipoOperacion, detalleTipoOperacion, montoOperacion, detalleOperacion, fechaOperacion) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [nombreOperacion, tipoOperacion, detalleTipoOperacion, montoOperacion, detalleOperacion, fechaOperacion];

  conection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al crear operación:", err);
      return res.status(500).json({ error: "Error al crear operación" });
    }
    res.status(201).json({ message: "Operación creada correctamente", id: results.insertId });
  });
};

// Editar una operación existente
const editOperaciones = (req, res) => {
  const id = req.params.id;
  const { nombreOperacion, tipoOperacion, detalleTipoOperacion, montoOperacion, detalleOperacion, fechaOperacion } = req.body;

  const query = `UPDATE Operaciones SET nombreOperacion = ?, tipoOperacion = ?, detalleTipoOperacion = ?, montoOperacion = ?, detalleOperacion = ?, fechaOperacion = ? WHERE id_operacion = ?`;
  const values = [nombreOperacion, tipoOperacion, detalleTipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, id];

  conection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al editar operación:", err);
      return res.status(500).json({ error: "Error al editar operación" });
    }
    res.json({ message: "Operación actualizada correctamente" });
  });
};

// Eliminar una operación (marcar como inactiva)
const deleteOperaciones = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE Operaciones SET activoOperacion = 0 WHERE id_operacion = ?`;

  conection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar operación:", err);
      return res.status(500).json({ error: "Error al eliminar operación" });
    }
    res.json({ message: "Operación eliminada correctamente" });
  });
};

module.exports = { allOperaciones, singleOperaciones, createOperaciones, editOperaciones, deleteOperaciones };



