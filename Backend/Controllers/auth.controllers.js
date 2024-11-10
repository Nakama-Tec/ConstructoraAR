const { conection } = require("../DB/Config")
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const {username, password} = req.body;
    const values = [username, password];
    const query = (`SELECT * FROM Usuarios WHERE nombreUsuario = ? AND passwordUsuario = ?`);
        conection.query(query, values, (err, result) => {
            if(err){
                res.status(500).send(err);
            } else {
                if(result.length > 0){
                    res.status(200).send({
                        "id": result[0].id,
                        "user": result[0].nombreUsuario,
                        
                    })
            } else {
                res.status(400).send({message: 'Usuario no existe'})
            }
        }
    })
  }

module.exports = {login}