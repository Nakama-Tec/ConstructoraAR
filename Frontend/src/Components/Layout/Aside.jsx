import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { 
  FLUJO_CAJA, STOCK, DEPARTAMENTOS, OBRAS, OPERACIONES, VEHICULOS, DETALLEVIAJES, TERRENOS, VTA_TERRENOS, 
  COMPRA_MATERIALES, VIAJES, PENDIENTES, ALQUILER, USUARIO, PAGOS_DPTO, REMUNERACIONES 
} from "../../Routes/routes";
import { FaUser, FaUsers, FaMapMarkedAlt, FaMoneyCheckAlt, FaMoneyBillWave, FaCashRegister, FaCar, FaBoxes, FaBuilding, FaHardHat, FaTasks, FaSignInAlt } from 'react-icons/fa';

const Aside = () => {
  const location = useLocation(); // Obtiene la ruta actual

  const isActive = (path) => location.pathname === path; // Compara la ruta actual con la del menú

  return (
    <Sidebar style={{ width: '300px' }}>
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            color: active ? '#787878' : '#000',
            fontWeight: 'bold',
            backgroundColor: active ? '#111827' : '#aeaeae',
          }),
        }}
      >
        <MenuItem
          icon={<FaUser />}
          active={isActive("/clientes")}
          component={<Link to="/clientes" />}
        >
          CLIENTES
        </MenuItem>
        <MenuItem
          icon={<FaUsers />}
          active={isActive("/empleados")}
          component={<Link to="/empleados" />}
        >
          EMPLEADOS
        </MenuItem>
        <SubMenu label="TERRENOS" icon={<FaBuilding />}>
          <MenuItem
            icon={<FaMapMarkedAlt />}
            active={isActive(TERRENOS)}
            component={<Link to={TERRENOS} />}
          >
            TERRENOS
          </MenuItem>
          <MenuItem
            icon={<FaMoneyCheckAlt />}
            active={isActive(VTA_TERRENOS)}
            component={<Link to={VTA_TERRENOS} />}
          >
            VENTAS TERRENOS
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<FaCashRegister />}
          active={isActive(FLUJO_CAJA)}
          component={<Link to={FLUJO_CAJA} />}
        >
          FLUJO CAJA
        </MenuItem>
        <MenuItem
          icon={<FaMoneyBillWave />}
          active={isActive(COMPRA_MATERIALES)}
          component={<Link to={COMPRA_MATERIALES} />}
        >
          COMPRA DE MATERIALES
        </MenuItem>
        <MenuItem
          icon={<FaBoxes />}
          active={isActive(STOCK)}
          component={<Link to={STOCK} />}
        >
          STOCK
        </MenuItem>
        <SubMenu label="DEPARTAMENTOS" icon={<FaBuilding />}>
          <MenuItem
            icon={<FaBuilding />}
            active={isActive(DEPARTAMENTOS)}
            component={<Link to={DEPARTAMENTOS} />}
          >
            DEPTOS
          </MenuItem>
          <MenuItem
            icon={<FaTasks />}
            active={isActive(ALQUILER)}
            component={<Link to={ALQUILER} />}
          >
            ALQUILERES
          </MenuItem>
          <MenuItem
            icon={<FaMoneyBillWave />}
            active={isActive(PAGOS_DPTO)}
            component={<Link to={PAGOS_DPTO} />}
          >
            PAGOS ALQUILERES
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<FaHardHat />}
          active={isActive(OBRAS)}
          component={<Link to={OBRAS} />}
        >
          OBRAS
        </MenuItem>
        <MenuItem
          icon={<FaCar />}
          active={isActive(VEHICULOS)}
          component={<Link to={VEHICULOS} />}
        >
          VEHICULOS
        </MenuItem>
        <MenuItem
          icon={<FaMoneyCheckAlt />}
          active={isActive(OPERACIONES)}
          component={<Link to={OPERACIONES} />}
        >
          OPERACIONES
        </MenuItem>
        <SubMenu label="VIAJES" icon={<FaBuilding />}>
          <MenuItem
            icon={<FaTasks />}
            active={isActive(VIAJES)}
            component={<Link to={VIAJES} />}
          >
            VIAJES
          </MenuItem>
          <MenuItem
            icon={<FaTasks />}
            active={isActive(DETALLEVIAJES)}
            component={<Link to={DETALLEVIAJES} />}
          >
            DETALLES
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<FaTasks />}
          active={isActive(PENDIENTES)}
          component={<Link to={PENDIENTES} />}
        >
          PENDIENTES
        </MenuItem>
        <MenuItem
          icon={<FaSignInAlt />}
          active={isActive(USUARIO)}
          component={<Link to={USUARIO} />}
        >
          USUARIO
        </MenuItem>
        <MenuItem
          icon={<FaMoneyCheckAlt />}
          active={isActive(REMUNERACIONES)}
          component={<Link to={REMUNERACIONES} />}
        >
          REMUNERACIONES
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Aside;