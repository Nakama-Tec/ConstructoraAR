import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logoconfondo-removebg-preview.png";
import "../../Styles/Navbar.css";
import useAuthStore from "../../Context/useAuthStore";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import useAuthStore from "../../Context/useAuthStore";


const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Terrenos", href: "/terrenos" },
  { name: "Construcciones", href: "/construcciones" },
  { name: "Departamentos", href: "/departamentos" },
  { name: "Institucional", href: "/institucional" },
  { name: "Contacto", href: "/contacto" },
  // { name: "Acceso", href: "/area-empleados/Login" },  
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const isActive = (location, href) => {
  return location.pathname === href;
};

const Header = () => {
 const token = useAuthStore((state) => state.token);
  const location = useLocation();

  return (
    <header>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="contenedor-nav">
              <div className=" contenedor-nav relative flex h-16">
                <Link to={'/'} className="flex items-center">
                  <img className="logo h-40 w-auto " src={logo} alt="Logo" />
                </Link>
                <div className="boton-movil absolute inset-y-0 right-0 flex items-center md:hidden">
                  {/* Botón de menú móvil */}
                  <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon aria-hidden="true" className="block h-6 w-6" />
                    ) : (
                      <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center mx-8">
                  <div className="hidden md:flex md:space-x-4 ms-auto">
                    {navigationItems.map((item) => {
                      let active = isActive(location, item.href);                    

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          aria-current={active? "page" : undefined}
                          className={classNames(
                            active
                              ? "text-white underline"
                              : "text-gray-300 hover:text-white hover:underline",
                            " text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}  
                         { 
                    !token ? <Link to="/area-empleados/Login" className={classNames(
                      isActive(location, "/area-empleados/Login")
                        ? "text-white underline"
                        : "text-gray-300 hover:text-white hover:underline",
                      " text-sm font-medium"
                    )}>Acceso</Link> : null
                      }                  
                    { 
                    token ? <Link to="/Admin" className={classNames(
                      isActive(location, "/Admin")
                        ? "text-white underline"
                        : "text-gray-300 hover:text-white hover:underline",
                      " text-sm font-medium"
                    )}>Admin</Link> : null
                      }
                 
                    
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="lista-desplegable space-y-1 px-2 pb-3 pt-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;

                  if (item.href.startsWith("#")) {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "text-gray-300 hover:text-white hover:underline",
                          "block px-3 py-2 text-base font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    );
                    
                  }
                  
                  return (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "text-white underline"
                          : "text-gray-300 hover:text-white hover:underline",
                        "block px-3 py-2 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default Header;
