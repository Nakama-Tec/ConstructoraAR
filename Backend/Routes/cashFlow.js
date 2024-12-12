const express = require("express");
const {allCashFlow, singlerCashFlow, allCashFlowAño} = require("../Controllers/cashFlow");
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js


const router = express.Router();

router.post("/cashFlow/post",verifyToken,allCashFlow)
router.get("/cashFlow/:id",verifyToken,singlerCashFlow)
router.get('/CashFlow/get/:año',verifyToken,allCashFlowAño)

module.exports = router