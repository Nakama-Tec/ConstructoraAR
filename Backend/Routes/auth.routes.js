const express = require("express");
const { loginHandler, adminHandler } = require('../Controllers/auth.controllers');
const { requireAuth } = require('../middlewares/requireAuth');

const router = express.Router()

router.post("/login", loginHandler)
router.get('/admin', requireAuth, adminHandler) // 1 - Ingresa a la ruta (/admin), 2 - Verifica si el token es válido, 3 - Si es válido, ejecuta la función adminHandler

module.exports = router