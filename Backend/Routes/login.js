const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const {login} = require("../Controllers/login")


router.post("/login",login);


module.exports = router