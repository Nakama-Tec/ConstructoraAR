const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {recuperarPass,cambiarPass} = require("../Controllers/recuperarPass")

router.post("/recuperarPass",recuperarPass); // no lleva verificacion de token al ser el inicio del proceso 
router.post('/reset-password',verifyToken,cambiarPass)//aqui si va la verifiacion del token para el proceso de recuperacion

module.exports = router