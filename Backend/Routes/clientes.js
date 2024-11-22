const express = require("express")
 const {allClientes, singleCliente, createCliente,editCliente,deleteCliente} = require("../Controllers/clientes")
 const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/clientes",verifyToken,allClientes)
router.get("/clientes/:id", verifyToken,singleCliente)
router.post("/clientes/create/", verifyToken,createCliente)
router.put("/clientes/edit/:id", verifyToken,editCliente)
router.put("/clientes/delete/:id",verifyToken, deleteCliente)


module.exports = router