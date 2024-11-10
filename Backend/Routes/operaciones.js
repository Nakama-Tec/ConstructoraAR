const express = require("express")
const {allOperaciones,singleOperaciones,createOperaciones,editOperaciones,deleteOperaciones} = require("../Controllers/operaciones")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js

const router = express.Router()// metodo propio de express que tiene el enrutamiento


//peticiones http
router.get("/Operaciones/",verifyToken,allOperaciones)//muestra todo
router.get("/Operaciones/:id",verifyToken, singleOperaciones)//para ver uno
router.post("/Operaciones/create",verifyToken,createOperaciones)
router.put("/Operaciones/edit/:id",verifyToken,editOperaciones)
router.put("/Operaciones/delete/:id",verifyToken,deleteOperaciones)

module.exports = router