const express = require("express");
const router = express.Router(); // metodo propio de express que tiene el enrutamiento
const { verifyToken } = require("../middleware/middleware"); // importo la funcion veryfyToken del archivo authJwt.js
const {
  allCertificados,
  singleCertificado,
  createCertificado,
  editCertificado,
  deleteCertificado,
} = require("../Controllers/certificados");

//peticiones http
router.get("/certificados/", verifyToken, allCertificados); //muestra todo
router.get("/certificados/:id", verifyToken, singleCertificado); //para ver uno
router.post("/certificados/create", verifyToken, createCertificado);
router.put("/certificados/edit/:id", verifyToken, editCertificado);
router.put("/certificados/delete/:id", verifyToken, deleteCertificado);

module.exports = router;
