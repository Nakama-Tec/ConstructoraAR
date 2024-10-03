const express = require("express")
const {allAlquileres, singleAlquiler, createAlquiler,editAlquiler,deleteAlquiler} = require("../Controllers/alquilerDepartamentos")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/alquiler", allAlquileres)
router.get("/alquiler/:id", singleAlquiler)
router.post("/alquiler/create/", verifyToken,createAlquiler)
router.put("/alquiler/edit/:id", verifyToken,editAlquiler)
router.put("/alquiler/delete/:id", verifyToken,deleteAlquiler)



module.exports = router