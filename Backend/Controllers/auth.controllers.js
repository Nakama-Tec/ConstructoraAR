const {Request, Response} = require('express');
const jwt = require('jsonwebtoken');

const loginHandler = (req, res) => {
    const token = jwt.sign({
        username: "testName",
    }, 'secret', {
        expiresIn: 60 * 60 * 24 // 24 hs
    })

    return res.json({
        token // Devuelve el token
    })
}

const adminHandler = (req, res) => {
    
    return res.json({
        admin: req.user,
        message: 'Bienvenido Admin'
    })
    
}

module.exports = {loginHandler, adminHandler}