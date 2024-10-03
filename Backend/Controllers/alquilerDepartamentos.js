const { conection } = require("../DB/config");

const allAlquileres = (req,res)=>{
    const query = "select * from AlquilerDepartamentos"
    
    conection.query(query, (err,results)=>{
    
        if (err) throw err;
        
            res.json(results)
    })
}
const singleAlquiler = (req,res) =>{

}
const createAlquiler = (req,res) =>{

}
const editAlquiler = (req,res) =>{

}
const deleteAlquiler = (req,res) =>{

}

module.exports = {allAlquileres, singleAlquiler,createAlquiler,editAlquiler,deleteAlquiler}
