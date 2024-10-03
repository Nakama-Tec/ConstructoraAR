const express = require("express")
const {allTerrenos, singleTerreno, createTerreno,editTerreno,deleteTerreno} = require("../Controllers/terrenos")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/terrenos", allTerrenos)
router.get("/terrenos/:id", singleTerreno)
router.post("/terrenos/create/", createTerreno)
router.put("/terrenos/edit/:id", editTerreno)
router.put("/terrenos/delete/:id", deleteTerreno)


module.exports = router