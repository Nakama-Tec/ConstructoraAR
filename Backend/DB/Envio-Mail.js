const nodemailer = require('nodemailer');//es una libreria que permite enviar correos electronicos
const dotenv = require("dotenv"); // es una libreria que permite acceder a las variables de entorno

dotenv.config();

let transporter = nodemailer.createTransport({
   
     service: process.env.SERVICE,//poner proveedor de servicio de mail ejemplo gmail/hotmail
        auth: {
            user: process.env.EMAIL, //poner email
            pass: process.env.PASS_2 //poner contraseña
        }

});

module.exports = {transporter};