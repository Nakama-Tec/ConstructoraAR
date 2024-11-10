const express = require("express")
const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {allDetallesViajes,singleDetallesViajes,createDetallesViajes,editDetallesViajes,deleteDetallesViajes} = require("../Controllers/detallesViajes")

//peticiones http
router.get("/detalleViajes/",verifyToken,allDetallesViajes)//muestra todo
router.get("/detalleViajes/:id",verifyToken, singleDetallesViajes)//para ver uno
router.post("/detalleViajes/create",verifyToken,createDetallesViajes)
router.put("/detalleViajes/edit/:id",verifyToken,editDetallesViajes)
router.put("/detalleViajes/delete/:id",verifyToken,deleteDetallesViajes)

module.exports = router