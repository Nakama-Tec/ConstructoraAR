const express = require("express")
const router = express.Router()// metodo propio de express que tiene el enrutamiento
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {allDepartamentos,singleDepartamentos,createDepartamentos,editDepartamentos,deleteDepartamentos} = require("../controllers/departamentos")

//peticiones http
router.get("/departamentos/",allDepartamentos)//muestra todo
router.get("/departamentos/:id", singleDepartamentos)//para ver uno
router.post("/departamentos/create/",createDepartamentos)
router.put("/departamentos/edit/:id",editDepartamentos)
router.put("/departamentos/delete/:id",deleteDepartamentos)

module.exports = router