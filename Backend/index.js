const express = require('express'); // es una libreria que permite crear un servidor
const {conection} = require('./DB/Config')
const alquilerDepartamentos = require("./Routes/alquilerDepartamentos")
const cashFlow = require("./Routes/cashFlow")
const certificados = require("./Routes/certificados")
const clientes = require("./Routes/clientes")
const compraMateriales = require("./Routes/compraMateriales")
const departamentos = require("./Routes/departamentos")
const detallesViajes = require("./Routes/detallesViajes")
const libroDiario = require("./Routes/libroDiario")
const obras = require("./Routes/obras")
const operaciones = require("./Routes/operaciones")
const pagosAlquileres = require("./Routes/pagosAlquileres")
const remuneraciones = require("./Routes/remuneraciones")
const stockMateriales = require("./Routes/stockMateriales")
const terrenos = require("./Routes/terrenos")
const usuarios = require("./Routes/usuarios")
const vehiculos = require("./Routes/vehiculos")
const ventaTerrenos = require("./Routes/ventaTerrenos")
const viajes = require("./Routes/viajes")
const login = require("./Routes/login")
const recuperarPass = require("./Routes/recuperarPass")
const contactos = require("./Routes/contactos")
const bodyParser = require('body-parser'); // elemento para que me lleguen los correos
const auth = require('./Routes/auth.routes')
const cors = require('cors');
const app = express()
const port = 8000;
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(bodyParser.json()); // elemento para que me lleguen los correos
app.use(express.json())
app.use("/", alquilerDepartamentos,cashFlow,certificados,clientes,compraMateriales,departamentos,detallesViajes,libroDiario,obras,operaciones,pagosAlquileres,remuneraciones,stockMateriales,terrenos,usuarios,vehiculos,ventaTerrenos,viajes,login,contactos,recuperarPass);
// conectar con MySQL
conection.connect((error) => {
    if (error) {
        console.error("Error conectando a MySQL:", error);
        return;
    }
    console.log("Conectado a MySQL");
});

app.get("/", (req, res) => {
    console.log("API FUNCIONANDO")
    res.send({message: "CONSTRUCTORA AR - API CONECTADA ✓"})
})


app.listen(port, () => {
    console.log(`🔝 Escuchando en el puerto ${port}\n 🔹 Ingresar: http://localhost:${port}/`)
})