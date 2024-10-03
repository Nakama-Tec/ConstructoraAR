const express = require("express")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()
const {allStockMateriales,singleStockMateriales,createStockMateriales,editStockMateriales,deleteStockMateriales} = require("../Controllers/stockMateriales")

//peticiones http
router.get("/stockMateriales/",allStockMateriales)//muestra todo
router.get("/stockMateriales/:id", singleStockMateriales)//para ver uno
router.post("/stockMateriales/create",createStockMateriales)
router.put("/stockMateriales/edit/:id",editStockMateriales)
router.put("/stockMateriales/delete/:id",deleteStockMateriales)

module.exports = router