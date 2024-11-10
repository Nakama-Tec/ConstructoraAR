const express = require("express")
const {allViajes, singleViaje, createViaje,editViaje,deleteViaje} = require("../Controllers/viajes")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js

const router = express.Router()

router.get("/viajes", verifyToken,allViajes)
router.get("/viajes/:id", verifyToken,singleViaje)
router.post("/viajes/create/", verifyToken,createViaje)
router.put("/viajes/edit/:id",verifyToken, editViaje)
router.put("/viajes/delete/:id",verifyToken, deleteViaje)


module.exports = router