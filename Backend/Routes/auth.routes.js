const express = require("express");
const { login } = require('../Controllers/auth.controllers');

const router = express.Router()

router.post('/login', login);

module.exports = router