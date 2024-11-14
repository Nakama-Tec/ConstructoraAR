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
      { details: 'Ingresos por Ventas de Terrenos', month1: `${valorMes1Terreno}`, month2: '', month3: '', moth4: '', month5: '', month6: '', month7: '', month8: '', month9: '', month10: '', month11: '', month12: '' },
      { details: 'Ingresos por Alquiler duplex', month1: '', month2: '', month3: '', /* más meses */ },
      { details: 'Ingresos por Obras Privadas', month1: '', month2: '', month3: '', /* más meses */ },
      { details: 'Ingresos por Obras Públicas', month1: '', month2: '', month3: '', /* más meses */ },
      { details: 'Ingresos por Venta de Materiales', month1: '', month2: '', month3: '', /* más meses */ },
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
