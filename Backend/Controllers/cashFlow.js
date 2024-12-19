const { conection } = require("../DB/Config")

const allCashFlow =(req,res)=>{
// todas las fechas vienen desde el front por medio de un formulario y es traida por req.body
    const {fechaInicio, fechaFin} = req.body
 
    const query = `
select "1.1  Ingresos por Ventas de Terrenos" as TIPO, sum(t.precioTerreno) as Monto from Terrenos t 
join VentaTerrenos vt on t.id_terreno = vt.id_terreno where vt.fechaVentaTerreno >='${fechaInicio}'  and vt.fechaVentaTerreno <='${fechaFin}'
UNION ALL

select "1.2  Ingresos por Alquiler duplex " as TIPO,sum(montoPagoAlquiler) as Monto from PagosAlquileres
where fechaPagoAlquiler >= '${fechaInicio}' and fechaPagoAlquiler <='${fechaFin}'
UNION ALL

select "1.3  Ingresos por Obras Privadas " as TIPO, sum(montoCert) as Monto from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >= '${fechaInicio}'  and fechaPagoCert <='${fechaFin}' and sectorObra = 1
UNION ALL
select "1.4  Ingresos por Obras Publicas " as TIPO, sum(montoCert) as Monto from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >='${fechaInicio}'  and fechaPagoCert <='${fechaFin}' and sectorObra = 0
UNION ALL

select "1.5  Cobro de Deudas" as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Ingreso" and detalleTipoOperacion = "Cobro deudas"
UNION ALL

select "1.6  Otros Ingresos" as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}' 
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Ingreso" and detalleTipoOperacion = "Otros ingresos"
UNION ALL
select "2.1  Luz  " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}'and tipoOperacion = "Egreso" and detalleTipoOperacion = "Luz"
UNION ALL
select "2.2  Agua  " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Agua"
UNION ALL
select "2.3  Teléfono " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Telefono"
UNION ALL
select "2.4  Compra de Elementos de Oficina" as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Oficina"
UNION ALL
select "2.5  Compra de Materiales Obra  " as TIPO,sum(precioMaterial) as Monto from CompraMateriales where fechaCompraMateriales >= '${fechaInicio}'
and fechaCompraMateriales <='${fechaFin}'
UNION ALL
select "2.6  Salarios Administrativos " as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '${fechaInicio}'
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 0 and sectorRemuneracion = 1
UNION ALL
select "2.7  Salarios de Obras Privadas  " as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '${fechaInicio}'
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 1 and sectorRemuneracion = 1
UNION ALL
select "2.8  Salarios de Obras Publicas " as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '${fechaInicio}'
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 1 and sectorRemuneracion = 0
UNION ALL
select "2.9  Pagos a Tercerizados O.Privadas" as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Pagos Tercerizados Obra Privada"
UNION ALL
select "2.10  Pagos a Tercerizados O.Publicas" as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}' 
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Pagos Tercerizados Obra Pública"
UNION ALL
select "2.11 Administración y Ventas " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Administración y Venta"
UNION ALL
select "2.12 Impuestos   " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Impuesto"
UNION ALL
select "2.13 Amortizaciones " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Amortizaciones"
UNION ALL
select "2.14 Intereses " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Intereses"
UNION ALL
select "2.15 Otros Egresos " as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}'
and fechaOperacion <='${fechaFin}' and tipoOperacion = "Egreso" and detalleTipoOperacion = "Otros egresos"

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