const express = require("express")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()
const {allStockMateriales,singleStockMateriales,editStockMateriales,deleteStockMateriales} = require("../Controllers/stockMateriales")

//peticiones http
router.get("/stockMateriales/",verifyToken,allStockMateriales)//muestra todo
router.get("/stockMateriales/:id", verifyToken,singleStockMateriales)//para ver uno
// router.post("/stockMateriales/create/",verifyToken,createStockMateriales)
router.put("/stockMateriales/edit/:id",verifyToken,editStockMateriales)
router.put("/stockMateriales/delete/:id",verifyToken,deleteStockMateriales)

module.exports = router