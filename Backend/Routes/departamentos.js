const express = require("express")
const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {allDepartamentos,singleDepartamentos,createDepartamentos,editDepartamentos,deleteDepartamentos} = require("../Controllers/departamentos")


//peticiones http
router.get("/departamentos/",verifyToken,allDepartamentos)//muestra todo
router.get("/departamentos/:id", verifyToken,singleDepartamentos)//para ver uno
router.post("/departamentos/create/",verifyToken,createDepartamentos)
router.put("/departamentos/edit/:id",verifyToken,editDepartamentos)
router.put("/departamentos/delete/:id",verifyToken, deleteDepartamentos)

module.exports = router