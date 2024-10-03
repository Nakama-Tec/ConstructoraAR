const express = require("express")
 const {allClientes, singleCliente, createCliente,editCliente,deleteCliente} = require("../controllers/clientes")
 const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/clientes", allClientes)
router.get("/clientes/:id", singleCliente)
router.post("/clientes/create/", createCliente)
router.put("/clientes/edit/:id", editCliente)
router.put("/clientes/delete/:id", deleteCliente)


module.exports = router