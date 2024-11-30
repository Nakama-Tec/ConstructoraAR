import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FLUJO_CAJA, STOCK, DEPARTAMENTOS, OBRAS, OPERACIONES, VEHICULOS, TERRENOS, VTA_TERRENOS, COMPRA_MATERIALES, VIAJES, PENDIENTES, ALQUILER, USUARIO, PAGOS_DPTO, REMUNERACIONES } from "../../Routes/routes";
import { FaUser, FaUsers, FaMapMarkedAlt, FaMoneyCheckAlt, FaMoneyBillWave,FaCashRegister, FaCar, FaBoxes, FaBuilding, FaHardHat, FaTasks, FaSignInAlt } from 'react-icons/fa';


const Aside = () => {
  return (
    <Sidebar style={{ width: '300px' }}>
      <Menu menuItemStyles={{ button: { color: '#000', fontWeight: 'bold', backgroundColor: '#aeaeae' } }}>
<MenuItem icon={<FaUser />} component={<Link to="/clientes" />}> CLIENTES</MenuItem>
<MenuItem icon={<FaUsers />} component={<Link to="/empleados" />}> EMPLEADOS</MenuItem>
<SubMenu label="TERRENOS" icon={<FaBuilding />}>
<MenuItem icon={<FaMapMarkedAlt />} component={<Link to={TERRENOS} />}> TERRENOS</MenuItem>
<MenuItem icon={<FaMoneyCheckAlt />} component={<Link to={VTA_TERRENOS} />}> VENTAS TERRENOS</MenuItem>
</SubMenu>
<MenuItem icon={<FaCashRegister />} component={<Link to={FLUJO_CAJA} />}> FLUJO CAJA</MenuItem>
<MenuItem icon={<FaMoneyBillWave />} component={<Link to={COMPRA_MATERIALES} />}> COMPRA DE MATERIALES</MenuItem>
<MenuItem icon={<FaBoxes />} component={<Link to={STOCK} />}> STOCK</MenuItem>
<SubMenu label="DEPARTAMENTOS" icon={<FaBuilding />}>
<MenuItem icon={<FaBuilding />} component={<Link to={DEPARTAMENTOS} />}> DEPTOS</MenuItem>
<MenuItem icon={<FaTasks />} component={<Link to={ALQUILER} />}> ALQUILERES</MenuItem>
<MenuItem icon={<FaMoneyBillWave />} component={<Link to={PAGOS_DPTO} />}> PAGOS ALQUILERES</MenuItem>
</SubMenu>
<MenuItem icon={<FaHardHat />} component={<Link to={OBRAS} />}> OBRAS</MenuItem>
<MenuItem icon={<FaCar/>} component={<Link to={VEHICULOS} />}> VEHICULOS</MenuItem>
<MenuItem icon={<FaMoneyCheckAlt />} component={<Link to={OPERACIONES} />}> OPERACIONES</MenuItem>
<MenuItem icon={<FaTasks />} component={<Link to={VIAJES} />}> VIAJES</MenuItem>
<MenuItem icon={<FaTasks />} component={<Link to={PENDIENTES} />}> PENDIENTES</MenuItem>
<MenuItem icon={<FaSignInAlt />} component={<Link to={USUARIO} />}> USUARIO</MenuItem>
<MenuItem icon={<FaMoneyCheckAlt />} component={<Link to={REMUNERACIONES} />}> REMUNERACIONES</MenuItem>



      </Menu>
    </Sidebar>
  );
};

export default Aside;