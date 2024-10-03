const express = require("express")
const {allRemuneraciones, singleRemuneracion, createRemuneracion,editRemuneracion,deleteRemuneracion} = require("../Controllers/remuneraciones")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/remuneraciones", allRemuneraciones)
router.get("/remuneraciones/:id", singleRemuneracion)
router.post("/remuneraciones/create/", createRemuneracion)
router.put("/remuneraciones/edit/:id", editRemuneracion)
router.put("/remuneraciones/delete/:id", deleteRemuneracion)


module.exports = router