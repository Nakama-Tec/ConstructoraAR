const express = require("express")
const {allVehiculos, singleVehiculo, createVehiculo,editVehiculo,deleteVehiculo} = require("../Controllers/vehiculos")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js

const router = express.Router()

router.get("/vehiculos",verifyToken, allVehiculos)
router.get("/vehiculos/:id", verifyToken,singleVehiculo)
router.post("/vehiculos/create/", verifyToken,createVehiculo)
router.put("/vehiculos/edit/:id", verifyToken,editVehiculo)
router.put("/vehiculos/delete/:id",verifyToken, deleteVehiculo)


module.exports = router