const express = require("express");
const {alldaily_books,singlediary_book} = require("../Controllers/libroDiario");
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js

const router = express.Router();


router.post("/libroDiario",verifyToken,alldaily_books)
router.get("/libroDiario/:id",verifyToken,singlediary_book)

module.exports = router