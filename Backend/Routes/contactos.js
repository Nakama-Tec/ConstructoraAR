const express = require("express");
const {allContactos,singleContactos,createContactos,editContactos,deleteContactos} = require("../Controllers/contactos");
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router();

router.get("/contactos",allContactos);
router.get("/contactos/:id",singleContactos);
router.post("/contactos/create",createContactos);
router.put("/contactos/edit/:id",editContactos);
router.delete("/contactos/delete/:id",deleteContactos);

module.exports = router;