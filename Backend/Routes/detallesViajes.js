const express = require("express")
const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {allDetallesViajes,singleDetallesViajes,createDetallesViajes,editDetallesViajes,deleteDetallesViajes} = require("../Controllers/detallesViajes")

//peticiones http
router.get("/detalleViajes/",verifyToken,allDetalleViajes)//muestra todo
router.get("/detalleViajes/:id",verifyToken, singleDetalleViajes)//para ver uno
router.post("/detalleViajes/create",verifyToken,createDetalleViajes)
router.put("/detalleViajes/edit/:id",verifyToken,editDetalleViajes)
router.put("/detalleViajes/delete/:id",verifyToken,deleteDetalleViajes)

module.exports = router