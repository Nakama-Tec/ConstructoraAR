import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Aside = () => {
  return (
<Sidebar>
  <Menu menuItemStyles={{button: {color: '#13395e', fontWeight: 'bold', backgroundColor: '#a0a0a0'}}}>
    <MenuItem element={<Link to="/clientes" />}> CLIENTES</MenuItem>
    <MenuItem element={<Link to="/empleados" />}> EMPLEADOS</MenuItem>
    <MenuItem element={<Link to="/terrenos" />}> TERRENOS</MenuItem>
  </Menu>
</Sidebar>
  )
}

export default Aside
