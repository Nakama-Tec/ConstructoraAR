const express = require("express")
const {allTerrenos, singleTerreno, createTerreno,editTerreno,deleteTerreno} = require("../Controllers/terrenos")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/terrenos", verifyToken,allTerrenos)
router.get("/terrenos/:id", verifyToken,singleTerreno)
router.post("/terrenos/create/",verifyToken, createTerreno)
router.put("/terrenos/edit/:id", verifyToken,editTerreno)
router.put("/terrenos/delete/:id", verifyToken,deleteTerreno)


module.exports = router