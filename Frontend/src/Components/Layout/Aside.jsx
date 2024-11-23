import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FLUJO_CAJA, STOCK, DEPARTAMENTOS, OBRAS, OPERACIONES, LOGIN, VEHICULOS, COMPRA_MATERIALES } from "../../Routes/routes";
import { FaUser, FaUsers, FaMapMarkedAlt, FaMoneyBillWave, FaCar, FaBoxes, FaBuilding, FaHardHat, FaTasks, FaSignInAlt } from 'react-icons/fa';

const Aside = () => {
  return (
    <Sidebar>
      <Menu menuItemStyles={{ button: { color: '#000', fontWeight: 'bold', backgroundColor: '#8c8c8c' } }}>
<MenuItem icon={<FaUser />} component={<Link to="/clientes" />}> CLIENTES</MenuItem>
<MenuItem icon={<FaUsers />} component={<Link to="/empleados" />}> EMPLEADOS</MenuItem>
<MenuItem icon={<FaMapMarkedAlt />} component={<Link to="/terrenos" />}> TERRENOS</MenuItem>
<MenuItem icon={<FaMoneyBillWave />} component={<Link to={FLUJO_CAJA} />}> FLUJO CAJA</MenuItem>
<MenuItem icon={<FaMoneyBillWave />} component={<Link to={COMPRA_MATERIALES} />}> COMPRA DE MATERIALES</MenuItem>
<MenuItem icon={<FaBoxes />} component={<Link to={STOCK} />}> STOCK</MenuItem>
<MenuItem icon={<FaBuilding />} component={<Link to={DEPARTAMENTOS} />}> DEPARTAMENTOS</MenuItem>
<MenuItem icon={<FaHardHat />} component={<Link to={OBRAS} />}> OBRAS</MenuItem>
<MenuItem icon={<FaCar/>} component={<Link to={VEHICULOS} />}> VEHICULOS</MenuItem>
<MenuItem icon={<FaTasks />} component={<Link to={OPERACIONES} />}> OPERACIONES</MenuItem>
<MenuItem icon={<FaSignInAlt />} component={<Link to={LOGIN} />}> LOGIN</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Aside;