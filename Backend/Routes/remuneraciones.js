const express = require("express")
const {allRemuneraciones, singleRemuneracion, createRemuneracion,editRemuneracion,deleteRemuneracion} = require("../Controllers/remuneraciones")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/remuneraciones", verifyToken,allRemuneraciones)
router.get("/remuneraciones/:id", verifyToken,singleRemuneracion)
router.post("/remuneraciones/create/", verifyToken,createRemuneracion)
router.put("/remuneraciones/edit/:id", verifyToken,editRemuneracion)
router.put("/remuneraciones/delete/:id", verifyToken,deleteRemuneracion)


module.exports = router