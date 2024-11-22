const express = require("express");
const { alldaily_books, getdaily_books, singlediary_book } = require("../Controllers/libroDiario");
const { verifyToken } = require("../middleware/middleware"); // Importamos verifyToken desde el middleware

const router = express.Router();

// Ruta para obtener los registros del libro diario según una fecha (POST)
router.post("/libroDiario/post", verifyToken, alldaily_books);

// Ruta para obtener los registros del libro diario según una fecha (GET)
router.get("/libroDiario/get", verifyToken, getdaily_books);

// Ruta para obtener un único registro del libro diario por ID
// router.get("/libroDiario/:id", verifyToken, singlediary_book);

module.exports = router;
