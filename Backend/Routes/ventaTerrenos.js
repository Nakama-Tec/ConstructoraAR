const express = require("express")
const {allVentaTerreno,singleVentaTerreno,createVentaTerreno,editVentaTerreno,deleteVentaTerreno} = require("../Controllers/ventaTerrenos")//importo los metodos del controlador

const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()// metodo propio de express que tiene el enrutamiento


//peticiones http
router.get("/ventaTerreno/",verifyToken,allVentaTerreno)//muestra todo
router.get("/ventaTerreno/:id", verifyToken,singleVentaTerreno)//para ver uno
router.post("/ventaTerreno/create",verifyToken,createVentaTerreno)
router.put("/ventaTerreno/edit/:id",verifyToken,editVentaTerreno)
router.put("/ventaTerreno/delete/:id",verifyToken,deleteVentaTerreno)

module.exports = router