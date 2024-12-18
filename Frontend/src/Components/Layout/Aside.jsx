import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaUser,
  FaUsers,
  FaMapMarkedAlt,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
  FaCashRegister,
  FaCar,
  FaBoxes,
  FaBuilding,
  FaHardHat,
  FaTasks,
  FaSignInAlt,
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaFileSignature,
  FaMapMarkerAlt,
  FaHandHoldingUsd,
} from 'react-icons/fa';
import { ALQUILER, CERTIFICADOS, CLIENTES, COMPRA_MATERIALES, DEPARTAMENTOS_ADMIN, EMPLEADOS, FLUJO_CAJA, LIBRO_DIARIO, OBRAS, OPERACIONES, PAGOS_DPTO, PENDIENTES, REMUNERACIONES, STOCK, TERRENOS_ADMIN, USUARIO, VEHICULOS, VIAJES, VTA_TERRENOS } from '../../Routes/routes';
import useAuthStore from '../../Context/useAuthStore';


const Aside = ({ rolesRequired }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla la visibilidad del menú en móviles
  const [openSubmenus, setOpenSubmenus] = useState({}); // Controla la apertura de submenús
  const location = useLocation();
  const userRol = useAuthStore((state) => state.userRole);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className='lg, sm:relative bottom-8'>
        {/* Botón de hamburguesa visible solo en móviles */}
        <button className="md:hidden fixed top-4 left-4 z-50 text-2xl text-neutral-500 focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu" >
          <FaBars />
        </button>
  
        {/* Overlay cuando el menú está abierto en móviles */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={toggleMenu}></div>
        )}
  
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none w-64`}>
  
          {/* Menú */}
          <nav className="">
            <ul>
              {/* CLIENTES */}
              <li>
                <Link to={CLIENTES}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(CLIENTES) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}>
                  <FaUser className="mr-3" />
                  CLIENTES
                </Link>
              </li>
  
              {/* EMPLEADOS */}
              {userRol !== 'empleado' && (
              <li>
                <Link
                  to={EMPLEADOS}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(EMPLEADOS) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUsers className="mr-3" />
                  EMPLEADOS
                </Link>
              </li>
                    )}
              {/* FLUJO CAJA */}
              <li>
                <Link
                  to={FLUJO_CAJA}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(FLUJO_CAJA) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaCashRegister className="mr-3" />
                  FLUJO CAJA
                </Link>
              </li>
  
              {/* LIBRO DIARIO */}
              <li>
                <Link
                  to={LIBRO_DIARIO}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(LIBRO_DIARIO) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaBook className="mr-3" />
                  LIBRO DIARIO
                </Link>
              </li>
  
              {/* TERRENOS */}
              <li>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
                  onClick={() => toggleSubmenu('terrenos')}
                >
                  <FaBuilding className="mr-3" />
                  TERRENOS
                  {openSubmenus['terrenos'] ? (
                    <FaChevronUp className="ml-auto" />
                  ) : (
                    <FaChevronDown className="ml-auto" />
                  )}
                </button>
                {openSubmenus['terrenos'] && (
                  <ul className="ml-8">
                    <li>
                      <Link
                        to={TERRENOS_ADMIN}
                        className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                          isActive(TERRENOS_ADMIN) ? 'bg-gray-100 font-medium' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaMapMarkedAlt className="mr-2" />
                        TERRENOS
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={VTA_TERRENOS}
                        className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                          isActive(VTA_TERRENOS) ? 'bg-gray-100 font-medium' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaMoneyCheckAlt className="mr-2" />
                        VENTAS TERRENOS
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
  
              {/* COMPRA DE MATERIALES Y STOCK */}
              <li>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
                  onClick={() => toggleSubmenu('materiales')}
                >
                  <FaBoxes className="mr-3" />
                  MATERIALES
                  {openSubmenus['materiales'] ? (
                    <FaChevronUp className="ml-auto" />
                  ) : (
                    <FaChevronDown className="ml-auto" />
                  )}
                </button>
                {openSubmenus['materiales'] && (
                  <ul className="ml-8">
                    <li>
                      <Link
                        to={STOCK}
                        className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                          isActive(STOCK) ? 'bg-gray-100 font-medium' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaBuilding className="mr-2" />
                        STOCK
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={COMPRA_MATERIALES}
                        className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                          isActive(COMPRA_MATERIALES) ? 'bg-gray-100 font-medium' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaTasks className="mr-2" />
                        COMPRA DE MATERIALES
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
  
              {/* DEPARTAMENTOS */}
              <li>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
                  onClick={() => toggleSubmenu('departamentos')}
                >
                  <FaBuilding className="mr-3" />
                  DEPARTAMENTOS
                  {openSubmenus['departamentos'] ? (
                    <FaChevronUp className="ml-auto" />
                  ) : (
                    <FaChevronDown className="ml-auto" />
                  )}
                </button>
                {openSubmenus['departamentos'] && (
                  <ul className="ml-8">
                    <li>
                      <Link
                        to={DEPARTAMENTOS_ADMIN}
                        className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                          isActive(DEPARTAMENTOS_ADMIN) ? 'bg-gray-100 font-medium' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaBuilding className="mr-2" />
                        DEPTOS
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={ALQUILER}
                        className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                          isActive(ALQUILER) ? 'bg-gray-100 font-medium' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaTasks className="mr-2" />
                        ALQUILERES
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={PAGOS_DPTO}
                        className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                          isActive(PAGOS_DPTO) ? 'bg-gray-100 font-medium' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaMoneyBillWave className="mr-2" />
                        PAGOS ALQUILERES
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

                {/* OPERACIONES */}
                <li>
                <Link
                  to={OPERACIONES}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(OPERACIONES) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaHandHoldingUsd className="mr-3" />
                  OPERACIONES
                </Link>
              </li>

               {/* CERTIFICADOS */}
               <li>
                <Link
                  to={CERTIFICADOS}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(CERTIFICADOS) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaFileSignature className="mr-3" />
                  CERTIFICADOS
                </Link>
              </li>
  
  {/* REMUNERACIONES */}
  <li>
                <Link
                  to={REMUNERACIONES}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(REMUNERACIONES) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaMoneyCheckAlt className="mr-3" />
                  REMUNERACIONES
                </Link>
              </li>


              {/* OBRAS */}
              <li>
                <Link
                  to={OBRAS}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(OBRAS) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaHardHat className="mr-3" />
                  OBRAS
                </Link>
              </li>
  
              {/* VEHÍCULOS */}
              <li>
                <Link
                  to={VEHICULOS}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(VEHICULOS) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaCar className="mr-3" />
                  VEHÍCULOS
                </Link>
              </li>
  
            
  
              {/* VIAJES */}
              <li>
                <Link
                  to={VIAJES}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(VIAJES) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaMapMarkerAlt className="mr-3" />
                  VIAJES
                </Link>
              </li>
  
              {/* PENDIENTES */}
              <li>
                <Link
                  to={PENDIENTES}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(PENDIENTES) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaTasks className="mr-3" />
                  PENDIENTES
                </Link>
              </li>
  
              {/* USUARIO */}
              {userRol !== 'empleado' && (
              <li>
                <Link
                  to={USUARIO}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive(USUARIO) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaSignInAlt className="mr-3" />
                  USUARIOS
                </Link>
              </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    );
  };


export default Aside;


