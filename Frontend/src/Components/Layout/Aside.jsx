import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Aside = () => {
  return (
<Sidebar>
  <Menu menuItemStyles={{button: {color: '#13395e', fontWeight: 'bold', backgroundColor: '#a0a0a0'}}}>
    <MenuItem element={<Link to={LIBRO_DIARIO} />}> LIBRO DIARIO</MenuItem>
    <MenuItem element={<Link to="/clientes" />}> CLIENTES</MenuItem>
    <MenuItem element={<Link to="/empleados" />}> EMPLEADOS</MenuItem>
    <MenuItem element={<Link to="/terrenos" />}> TERRENOS</MenuItem>
    <MenuItem element={<Link to={FLUJO_CAJA} />}> FLUJO CAJA</MenuItem>
    <MenuItem element={<Link to={STOCK} />}> STOCK</MenuItem>
    <MenuItem element={<Link to={DEPARTAMENTOS} />}> DEPARTAMENTOS</MenuItem>
    <MenuItem element={<Link to={OBRAS} />}> OBRAS</MenuItem>
    <MenuItem element={<Link to={OPERACIONES} />}> OPERACIONES</MenuItem>
    
  </Menu>
</Sidebar>
  )
}

export default Aside
