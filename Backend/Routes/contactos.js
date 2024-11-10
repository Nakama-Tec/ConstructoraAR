const express = require("express");
const {allContactos,singleContactos,createContactos,editContactos,deleteContactos} = require("../Controllers/contactos");
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router();

router.get("/contactos",verifyToken,allContactos);
router.get("/contactos/:id",verifyToken,singleContactos);
router.post("/contactos/create",createContactos);//no lleva verificacion de token aqui se hace desde el front de landingpage
router.put("/contactos/edit/:id",verifyToken,editContactos);
router.delete("/contactos/delete/:id",verifyToken, deleteContactos);

module.exports = router;