const express = require("express")
const {allCompraMateriales,singleCompraMateriales,createCompraMateriales,editCompraMateriales,deleteCompraMateriales} = require("../Controllers/compraMateriales")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()// metodo propio de express que tiene el enrutamiento


//peticiones http
router.get("/compraMateriales/",verifyToken,allCompraMateriales)//muestra todo
router.get("/compraMateriales/:id", verifyToken,singleCompraMateriales)//para ver uno
router.post("/compraMateriales/create",verifyToken,createCompraMateriales)
router.put("/compraMateriales/edit/:id",verifyToken, editCompraMateriales)
router.put("/compraMateriales/delete/:id",verifyToken,deleteCompraMateriales)

module.exports = router