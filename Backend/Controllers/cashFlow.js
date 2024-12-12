const { conection } = require("../DB/Config")

const allCashFlow =(req,res)=>{
// todas las fechas vienen desde el front por medio de un formulario y es traida por req.body
    const {fechaInicio, fechaFin} = req.body
    console.log(fechaInicio, fechaFin)
//Las fechas de inicio y fin las traigo del front son las que cumplen el roll para que sea un mes
 
    const query = `select "Ingresos por Ventas de Terrenos" as TIPO_1, sum(t.precioTerreno) as Monto_1 from Terrenos t 
join VentaTerrenos vt on t.id_terreno = vt.id_terreno
where vt.fechaVentaTerreno >= '${fechaInicio}' and vt.fechaVentaTerreno <='${fechaFin}'
UNION ALL
select "Ingresos por Obras Privadas" as TIPO_2, sum(montoCert) as Monto_2 from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >= '${fechaInicio}' and fechaPagoCert <='${fechaFin}' 
and sectorObra = 1
UNION ALL
select "Ingresos por Obras Publicas" as TIPO_3, sum(montoCert) as Monto_3 from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >= '${fechaInicio}' and fechaPagoCert <='${fechaFin}' 
and sectorObra = 0
UNION ALL
select "Ingresos por Alquiler duplex " as TIPO_4,sum(montoPagoAlquiler) as Monto_4 from PagosAlquileres where fechaPagoAlquiler >= '${fechaInicio}' 
and fechaPagoAlquiler <='${fechaFin}'
UNION ALL
select "OPERACIONES" as TIPO_5,sum(montoOperacion) as Monto_5 from Operaciones where fechaOperacion >= '${fechaInicio}' 
and fechaOperacion <='${fechaFin}'
UNION ALL
select "Compra de Materiales Obra" as TIPO_6,sum(precioMaterial) as Monto_6 from CompraMateriales where fechaCompraMateriales >= '${fechaInicio}' and fechaCompraMateriales <='${fechaFin}'
UNION ALL
select "Salarios Administrativos" as TIPO_7,sum(montoRemuneracion) as Monto_7 from Remuneraciones where fechaRemuneracion >= '${fechaInicio}' 
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 0 and sectorRemuneracion = 1
UNION ALL
select "Salarios de Obras Privadas" as TIPO_8,sum(montoRemuneracion) as Monto_8 from Remuneraciones where fechaRemuneracion >= '${fechaInicio}' 
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 1 and sectorRemuneracion = 1
UNION ALL
select "Salarios de Obras Publicas" as TIPO_,sum(montoRemuneracion) as Monto_9 from Remuneraciones where fechaRemuneracion >= '${fechaInicio}' 
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 1 and sectorRemuneracion = 0
`
conection.query(query,(err,results)=>{
    if(err) {
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
});

} 

const allCashFlowAño = async (req, res) => {
    const { año } = req.params;
    const datos = await obtenerDatosPorAño(año); // Función para recuperar datos del año
    res.json(datos);
  };

const singlerCashFlow = (req,res) =>{}

module.exports = {allCashFlow, singlerCashFlow, allCashFlowAño}