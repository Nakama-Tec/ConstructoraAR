import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FLUJO_CAJA, LIBRO_DIARIO, STOCK, DEPARTAMENTOS, OBRAS, OPERACIONES, LOGIN } from "../../Routes/routes";

const Aside = () => {
  return (
    <Sidebar>
      <Menu menuItemStyles={{ button: { color: '#13395e', fontWeight: 'bold', backgroundColor: '#a0a0a0' } }}>
        <MenuItem component={<Link to={LIBRO_DIARIO} />}> LIBRO DIARIO</MenuItem>
        <MenuItem component={<Link to="/clientes" />}> CLIENTES</MenuItem>
        <MenuItem component={<Link to="/empleados" />}> EMPLEADOS</MenuItem>
        <MenuItem component={<Link to="/terrenos" />}> TERRENOS</MenuItem>
        <MenuItem component={<Link to={FLUJO_CAJA} />}> FLUJO CAJA</MenuItem>
        <MenuItem component={<Link to={STOCK} />}> STOCK</MenuItem>
        <MenuItem component={<Link to={DEPARTAMENTOS} />}> DEPARTAMENTOS</MenuItem>
        <MenuItem component={<Link to={OBRAS} />}> OBRAS</MenuItem>
        <MenuItem component={<Link to={OPERACIONES} />}> OPERACIONES</MenuItem>
        <MenuItem component={<Link to={LOGIN} />}> LOGIN</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Aside;
