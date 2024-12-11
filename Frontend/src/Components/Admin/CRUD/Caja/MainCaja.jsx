import React from 'react';
import { useTable } from 'react-table';//es necesario instalar npm install react-table
import '../../../../Styles/CashFlowTable.css'

const MainCaja = () => {

  const valorMes1Terreno = 1000;

  const columns = React.useMemo(
    () => [
      { Header: 'Detalles', accessor: 'details' },
      { Header: 'MES 1', accessor: 'month1' },
      { Header: 'MES 2', accessor: 'month2' },
      { Header: 'MES 3', accessor: 'month3' },
      { Header: 'MES 4', accessor: 'month4' },
      { Header: 'MES 5', accessor: 'month5' },
      { Header: 'MES 6', accessor: 'month6' },
      { Header: 'MES 7', accessor: 'month7' },
      { Header: 'MES 8', accessor: 'month8' },
      { Header: 'MES 9', accessor: 'month9' },
      { Header: 'MES 10', accessor: 'month10' },
      { Header: 'MES 11', accessor: 'month11' },
      { Header: 'MES 12', accessor: 'month12' },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      { details: '1.   Detalles de Ingresos' },
    { details: '1.1  Ingresos por Ventas de Terrenos', month1: 'valorMes1Terreno', month2: '', month3: '' },
    { details: '1.2  Ingresos por Alquiler duplex', month1: '', month2: '', month3: '' },
    { details: '1.3  Ingresos por Obras Privadas', month1: '', month2: '', month3: '' },
    { details: '1.4  Ingresos por Obras Publicas', month1: '', month2: '', month3: '' },
    { details: '1.5  Cobro de Deudas', month1: '', month2: '', month3: '' },
    { details: '1.6  Otros Ingresos', month1: '', month2: '', month3: '' },
    { details: '1.0  Total Ingresos' },
    { details: '2.   Detalles de Egresos' },
    { details: '2.1  Luz', month1: '', month2: '', month3: '' },
    { details: '2.2  Agua', month1: '', month2: '', month3: '' },
    { details: '2.3  Teléfono', month1: '', month2: '', month3: '' },
    { details: 'Egresos en Consumo' },
    { details: '2.4  Compra de Elementos de Oficina', month1: '', month2: '', month3: '' },
    { details: '2.5  Compra de Materiales de Obra', month1: '', month2: '', month3: '' },
    { details: '2.6  Salarios Administrativos', month1: '', month2: '', month3: '' },
    { details: '2.7  Salarios de Obras Privadas', month1: '', month2: '', month3: '' },
    { details: '2.8  Salarios de Obras Públicas', month1: '', month2: '', month3: '' },
    { details: '2.9  Pagos a Tercerizados O.Privadas', month1: '', month2: '', month3: '' },
    { details: '2.10 Pagos a Tercerizados O.Públicas', month1: '', month2: '', month3: '' },
    { details: '2.11 Administración y Ventas', month1: '', month2: '', month3: '' },
    { details: '2.12 Impuestos', month1: '', month2: '', month3: '' },
    { details: '2.13 Amortizaciones', month1: '', month2: '', month3: '' },
    { details: '2.14 Intereses', month1: '', month2: '', month3: '' },
    { details: 'Egresos Operativos' },
    { details: '2.0  Total de Egresos' },
    { details: '3.0  Saldo Neto' },
    { details: '4.0  Saldo Acumulado' },

      // Agregar más filas según la estructura de la imagen
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="cash-flow-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th key={headerGroup.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MainCaja
