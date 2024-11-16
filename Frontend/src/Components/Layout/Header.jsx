import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/sinfondo.svg";
import '../../Styles/Navbar.css';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Terrenos", href: "#terrenos" },
  { name: "Construcciones", href: "#construncciones" },
  { name: "Departamentos", href: "#departamentos" },
  { name: "Institucional", href: "#institucional" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [current, setCurrent] = useState("Inicio");

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                <img
                  className="logo absolute h-40 w-auto"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon aria-hidden="true" className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="hidden md:flex md:space-x-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={current === item.name ? "page" : undefined}
                      className={classNames(
                        current === item.name
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      onClick={() => setCurrent(item.name)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link
                  to="/contacto"
                  className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Contacto
                </Link>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigationItems.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={current === item.name ? "page" : undefined}
                  className={classNames(
                    current === item.name
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  onClick={() => setCurrent(item.name)}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <DisclosureButton
                as={Link}
                to="/contacto"
                className="bg-blue-500 text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Contacto
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
