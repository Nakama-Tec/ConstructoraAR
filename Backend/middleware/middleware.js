const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Cargar las variables de entorno
dotenv.config();

// Obtener la clave secreta de las variables de entorno
const secretKey = process.env.SECRETKEY;


// Middleware para verificar el token
const verifyToken = (req, res, next) => {

    // Obtener el token del encabezado de autorización
    const authHeader = req.headers["authorization"]; //este dato proviene del front end
    

    // Comprobar si se ha definido la clave secreta
    if (!secretKey) {
        return res.status(500).json({ message: "Clave secreta no configurada en las variables de entorno" });
    }
  
    // Si no se proporciona el encabezado de autorización
    if (!authHeader) {//si no se envia el token
        return res.status(403).json({ message: "Falta Encabezado de autorización" });
    }
    // Validar el formato del token
    const tokenParts = authHeader.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(403).json({ message: "Formato de token inválido. Se esperaba 'Bearer <token>'" });
    }

    // Extraer el token del formato 'Bearer <token>'
    const token = tokenParts[1];
    
    // Verificar el token JWT usando la clave secreta
    jwt.verify(token, secretKey, (err, decoded) => {
        
        if (err) {
            // Error específico si el token ha expirado
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expirado" });
            }
            // Error específico si el token es inválido
            if (err.name === "JsonWebTokenError") {
                return res.status(403).json({ message: "Token inválido" });
            }
            // Error general en otros casos
            return res.status(500).json({ message: "Fallo al autenticar el token" });
        }

        // Guardar el id y rol del usuario en la solicitud
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

module.exports = { verifyToken };