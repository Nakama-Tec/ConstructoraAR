const { conection } = require("../DB/Config")

const allStockMateriales = (req,res)=>{
    const query = `select * from StockMateriales where activoStock=1;`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

const singleStockMateriales = (req,res)=>{
    const id = req.params.id;
    const query = `select * from StockMateriales where id_stock = ${id};`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

const editStockMateriales = (req,res)=>{
    const id = req.params.id;
    const {nombreMaterial, ubicacionStock,cantidadStock} = req.body;

    const query = `update StockMateriales set nombreMaterial = '${nombreMaterial}',ubicacionStock = '${ubicacionStock}' ,cantidadStock = ${cantidadStock} where id_stock = ${id};`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

const deleteStockMateriales = (req,res)=>{
    const id = req.params.id;
    const query = `update StockMateriales set activoStock = 0 where id_stock = ${id};`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

module.exports = {allStockMateriales, singleStockMateriales, editStockMateriales, deleteStockMateriales}
