const jwt = require("jsonwebtoken");
const { conection } = require("../DB/Config")
const dotenv = require("dotenv");
const { transporter } = require("../DB/Envio-Mail");
dotenv.config()

// Función para la recuperación de contraseña
const recuperarPass = (req, res) => {
    // Solo necesitamos el nombre de usuario (o DNI) para verificar la identidad del usuario
    const { nombreUsuario } = req.body;

    // Verificamos si el usuario existe en la base de datos
    const query = `SELECT * FROM usuarios WHERE nombreUsuario = ?`;
    conection.query(query, [nombreUsuario], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        // Si el usuario no existe
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0]; // Tomamos el primer resultado (el usuario encontrado)

        // Generamos un token JWT con la información del usuario y una fecha de expiración
        const token = jwt.sign(
            { id: user.id_usuario, role: user.rol },
            process.env.SECRETKEY,
            { expiresIn: '1h' }
        );

        // Enviamos el correo con el link de recuperación
        const resetPasswordUrl = `http://localhost:${port}//reset-password?token=${token}`; //cambiar miapp por la pagina de recuperacion

        let mailOptions = {
            from: process.env.FROM,
            to: user.email,  // Usamos el correo del usuario
            subject: "Recuperación de contraseña",
            text: `
                Hola ${user.nombreUsuario},
                
                Hemos recibido una solicitud para recuperar tu contraseña. Haz clic en el siguiente enlace para restablecerla:

                ${resetPasswordUrl}

                Si no solicitaste este cambio, puedes ignorar este correo.

                Este enlace expirará en 1 hora.
            `
        };

        // Enviamos el correo
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error en el envío de correo:', err);
                return res.status(500).json({ message: 'Error en el envío de correo' });
            }

            // Si todo sale bien, informamos al usuario
            res.status(200).json({ message: 'Correo de recuperación enviado' });
        });
    });
};

// Función para el cambio de contraseña (se debe verificar el token primero)
const cambiarPass = (req, res) => {
    const { token, newPassword } = req.body;

    // Verificamos el token de recuperación
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        const userId = decoded.id;  // Extraemos el ID del usuario del token

        // Actualizamos la contraseña en la base de datos
        const query = `UPDATE usuarios SET pass = ? WHERE id_usuario = ?`;
        conection.query(query, [newPassword, userId], (err, results) => {
            if (err) {
                console.error('Error al actualizar la contraseña:', err);
                return res.status(500).json({ message: 'Error en la base de datos' });
            }

            // Confirmamos que la contraseña fue actualizada
            res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
        });
    });
};

module.exports = { recuperarPass, cambiarPass };
