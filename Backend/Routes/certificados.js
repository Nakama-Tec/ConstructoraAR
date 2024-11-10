const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {allCertificados,singleCertificados,createCertificados,editCertificados,deleteCertificados} = require("../Controllers/certificados")

//peticiones http
router.get("/certificados/",verifyToken,allCertificados)//muestra todo
router.get("/certificados/:id", verifyToken,singleCertificados)//para ver uno
router.post("/certificados/create",verifyToken, createCertificados)
router.put("/certificados/edit/:id",verifyToken, editCertificados)
router.put("/certificados/delete/:id",verifyToken,deleteCertificados)

module.exports = router