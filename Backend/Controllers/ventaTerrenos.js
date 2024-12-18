const { conection } = require("../DB/Config")

const allVentaTerreno = (req,res) =>{
const query = `SELECT V.id_ventaTerreno, V.FechaVentaTerreno, T.id_terreno, T.DireccionTerreno, T.PrecioTerreno, C.NombreCliente, C.ApellidoCliente, C.TelefonoCliente, C.CondicionCliente
from VentaTerrenos V
join Terrenos T
on T.id_terreno = V.id_terreno
join Clientes C
on C.id_cliente = V.id_cliente
WHERE V.activoTerreno = 1;
`
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results)
})
}
const singleVentaTerreno = (req,res)=>{
const id = req.params.id;
const query = `SELECT * FROM VentaTerrenos WHERE id_ventaTerreno = ${id}`;

conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}
const createVentaTerreno = (req,res) =>{
const {id_terreno,id_cliente,fechaVentaTerreno} = req.body;
const query = `INSERT INTO VentaTerrenos (id_terreno,id_cliente,fechaVentaTerreno) VALUES (${id_terreno},${id_cliente},'${fechaVentaTerreno}')`;
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}
const editVentaTerreno = (req,res)=>{
const id = req.params.id;
const {id_terreno,id_cliente,fechaVentaTerreno} = req.body;
const query = `UPDATE VentaTerrenos SET id_terreno = ${id_terreno},id_cliente=${id_cliente},fechaVentaTerreno = '${fechaVentaTerreno}' WHERE id_ventaTerreno = ${id}`;
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results)
})
}
const deleteVentaTerreno = (req,res)=>{
const id = req.params.id;
const query = `update VentaTerrenos set activoTerreno=0 where id_ventaTerreno=${id}`;
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}

module.exports = {allVentaTerreno,singleVentaTerreno,createVentaTerreno,editVentaTerreno,deleteVentaTerreno}