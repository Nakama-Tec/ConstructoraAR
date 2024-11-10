const express = require("express")
const { allAlquilerDepartamentos, singleAlquilerDepartamento, createAlquilerDepartamento, editAlquilerDepartamentos, deleteAlquilerDepartamentos } = require("../Controllers/alquilerDepartamentos")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/alquiler",verifyToken,allAlquilerDepartamentos)
router.get("/alquiler/:id",verifyToken, singleAlquilerDepartamento)
router.post("/alquiler/create/", verifyToken,createAlquilerDepartamento)
router.put("/alquiler/edit/:id", verifyToken,editAlquilerDepartamentos)
router.put("/alquiler/delete/:id", verifyToken,deleteAlquilerDepartamentos)



module.exports = router