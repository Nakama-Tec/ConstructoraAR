const express = require("express")
const {allPagosAlquileres, singlePagoAlquiler, createPagosAlquileres,editPagosAlquileres,deletePagosAlquileres} = require("../Controllers/pagosAlquileres")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/pagosAlquileres", verifyToken,allPagosAlquileres)
router.get("/pagosAlquileres/:id", verifyToken,singlePagoAlquiler)
router.post("/pagosAlquileres/create/", verifyToken,createPagosAlquileres)
router.put("/pagosAlquileres/edit/:id", verifyToken,editPagosAlquileres)
router.put("/pagosAlquileres/delete/:id", verifyToken,deletePagosAlquileres)


module.exports = router