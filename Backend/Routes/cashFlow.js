const express = require("express");
const {allCashFlow, singlerCashFlow} = require("../Controllers/cashFlow");
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js


const router = express.Router();

router.get("/cashFlow",verifyToken,allCashFlow)
router.get("/cashFlow/:id",verifyToken,singlerCashFlow)

module.exports = router