import React, { useRef } from "react";
import BannerDepartamentos from "./BannerDepartamentos";
import Contacto from "../../Pages/Home/Contacto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/imgDepartamentos/imgdepa1.jpg";
import img2 from "../../assets/imgDepartamentos/imgdepa2.jpg";
import img3 from "../../assets/imgDepartamentos/imgdepa3.jpg";
import img4 from "../../assets/imgDepartamentos/imagdepartamento10.jpg";
import TopButton from "../../Components/Layout/TopButton";

const MainDepartamento = () => {
  const firstCardRef = useRef(null);

  const handleScrollToImages = () => {
    if (firstCardRef.current) {
      firstCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  

  return (
    <>
      <BannerDepartamentos />
      <div className="container pt-12 mb-12 flex flex-col md:flex-row flex-grow">
        <div className="px-4 md:px-12 w-full md:w-[50%] text-left">
          <p className="pt-10 mb-4">
            <span className="textoDestacado">
              ¿Has soñado con un hogar donde puedas desarrollar tus proyectos y disfrutar de cada amanecer en un entorno acogedor?{" "}
            </span>
            Alquilar un departamento es mucho más que simplemente ocupar un espacio; es asegurar un estilo de vida lleno de comodidad y flexibilidad. Es la oportunidad de elegir el lugar que mejor se adapte a tus necesidades, darle forma a tu rutina diaria y crear, en cada rincón, el ambiente que siempre has deseado.
          </p>
          <p>
            <span className="textoDestacado">
              Imagina tu departamento convirtiéndose en el refugio perfecto para tu familia{" "}
            </span>
            en una inversión inteligente que te brinda seguridad y tranquilidad, o en el espacio ideal para diseñar el hogar de tus sueños. Hoy puede ser el día en que comiences esta nueva etapa.
          </p>
          <div className="pt-4 mb-20">
            <button
              onClick={handleScrollToImages}
              className="bg-slate-500 text-stone-50 font-medium py-2 px-4 text-lg"
            >
              Ver departamentos disponibles
            </button>
          </div>
        </div>
        <div className="p-10 w-full md:w-[50%] mb-24">
          <img src={img4} alt="Imagen ilustrativa" className="w-full h-auto" />
        </div>
      </div>
      <div className="" ref={firstCardRef}></div>
      <br />
      <br />
      <br />

      <div className="mx-4 md:mx-10 mb-10">
        <div className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-2/5">
            <img
              src={img1}
              alt="Imagen principal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-3/5 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl mt-11 font-semibold text-gray-800">
                $ 370.000
              </h2>
              <p className="text-gray-500 mb-16 text-lg">$50.000 Expensas</p>
              <h3 className="mt-2 text-2xl font-medium text-gray-700">
                San Miguel de Tucumán, Tucuman
              </h3>
              <p className="text-gray-600">Av. Mate de Luna al 2100</p>
              <p className="text-gray-600 mt-1 text-sm">
                Departamento · 55m² · 2 ambientes
              </p>
              <p className="text-gray-600 mt-4 text-sm">
                P.B: Living comedor con cocina integrada y desborde a balcón
                hacia la avenida. Espacio cómodo para lavarropas. P.A por
                escaleras: Un dormitorio de muy buen tamaño también con salida a
                balcón. Un baño completo. El edificio cuenta con amenities:
                terraza con SUM, asador y pileta. Portería en horario comercial
                y cámaras de seguridad
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleScrollToContact}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 md:mx-10 mb-10">
        <div className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-2/5">
            <img
              src={img2}
              alt="Imagen principal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-3/5 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl mt-11 font-semibold text-gray-800">
                $ 350.000
              </h2>
              <p className="text-gray-500 mb-16 text-lg">$50.000 Expensas</p>
              <h3 className="mt-2 text-2xl font-medium text-gray-700">
                San Miguel de Tucumán, Tucuman
              </h3>
              <p className="text-gray-600">Ayacucho 564</p>
              <p className="text-gray-600 mt-1 text-sm">
                Departamento · 35m² · 2 ambientes
              </p>
              <p className="text-gray-600 mt-4 text-sm">
                A estrenar en edificio Isaura. Hermoso departamento en B° Sur 1
                Dormitorio con placard y salida a balcón con excelente vista
                hacia el cerro (8vo piso). Cocina comedor. Baño completo. Muy
                buenos amenities.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleScrollToContact}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 md:mx-10 mb-10">
        <div className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-2/5">
            <img
              src={img3}
              alt="Imagen principal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-3/5 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl mt-11 font-semibold text-gray-800">
                $ 450.000
              </h2>
              <p className="text-gray-500 mb-16 text-lg">$80.000 Expensas</p>
              <h3 className="mt-2 text-2xl font-medium text-gray-700">
                San Miguel de Tucumán, Tucuman
              </h3>
              <p className="text-gray-600">Balcarce al 300</p>
              <p className="text-gray-600 mt-1 text-sm">
                Departamento · 80m² · 3 ambientes
              </p>
              <p className="text-gray-600 mt-4 text-sm">
                Se trata de un dpto. con gran living comedor, con cocina
                integrada y lavadero. Con balcón terraza amplio. Cuenta con
                dos dormitorios, uno con baño en suite.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleScrollToContact}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="contacto" className="flex flex-col mb-30">
        <Contacto />
      </div>

      <TopButton />
    </>
  );
};

export default MainDepartamento;
