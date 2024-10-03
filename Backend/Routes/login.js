const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {login,recuperarPass} = require("../Controllers/login")


router.post("/login",login);
router.post("/recuperarPass",recuperarPass);

module.exports = router