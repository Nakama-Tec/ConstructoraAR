import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/sinfondo.svg";
import "../../Styles/Navbar.css";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Terrenos", href: "/terrenos" },
  { name: "Construcciones", href: "/construcciones" },
  { name: "Departamentos", href: "/departamentos" },
  { name: "Institucional", href: "/institucional" },
  { name: "Contacto", href: "/contacto" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => {
          return (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="flex items-center ">
                    <img
                      className="logo h-40 w-auto"
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
                  <div className="flex flex-1 items-center justify-center mx-8">
                    <div className="hidden md:flex md:space-x-4">
                      {navigationItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className={classNames(
                              isActive
                                ? "text-white underline"
                                : "text-gray-300 hover:text-white hover:underline",
                              "px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                 
                  </div>
                </div>
           

              <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <DisclosureButton
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
                      </DisclosureButton>
                    );
                  })}
                 
                </div>
              </DisclosurePanel>
            </>
          );
        }}
      </Disclosure>
    </header>
  );
};

export default Header;
