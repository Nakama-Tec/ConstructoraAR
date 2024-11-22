const express = require("express")
const {allPedientes,singlePendiente,createPendiente,editPendiente,deletePendiente} = require("../Controllers/pendientes")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/pendientes", verifyToken,allPedientes)
router.get("/pendiente/:id", verifyToken,singlePendiente)
router.post("/pendiente/create/", verifyToken,createPendiente)
router.put("/pendiente/edit/:id", verifyToken,editPendiente)
router.put("/pendiente/delete/:id", verifyToken,deletePendiente)



module.exports = router