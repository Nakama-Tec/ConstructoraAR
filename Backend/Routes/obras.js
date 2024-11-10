const express = require("express")
const {allObras, singleObra, createObra,editObra,deleteObra} = require("../Controllers/obras")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js

const router = express.Router()

router.get("/obras", verifyToken,allObras)
router.get("/obras/:id", verifyToken,singleObra)
router.post("/obras/create/", verifyToken,createObra)
router.put("/obras/edit/:id", verifyToken,editObra)
router.put("/obras/delete/:id", verifyToken,deleteObra)


module.exports = router