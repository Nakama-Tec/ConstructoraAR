const {Request, Response, NextFunction} = require('express');
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    const authHeader = req.headers.authorization
 
     if(!authHeader) return res.status(401).json({
         message: 'No Autorizado'
     })
 
     const token = authHeader.split(' ')[1]
 
     if(!token) return res.status(401).json({
         message: 'No Autorizado'
     })
 
     jwt.verify(token, 'secret', (err, user) => {
         if(err) return res.status(401).json({
             message: 'No Autorizado'
         })
 
         //console.log(user)
         req.user = user
         next()
     })
 
 }

module.exports = {requireAuth}