const express = require("express")
const {allObras, singleObra, createObra,editObra,deleteObra} = require("../Controllers/obras")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/obras", allObras)
router.get("/obras/:id", singleObra)
router.post("/obras/create/", createObra)
router.put("/obras/edit/:id", editObra)
router.put("/obras/delete/:id", deleteObra)


module.exports = router