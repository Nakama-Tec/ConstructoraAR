import React, { useRef } from "react";
import BannerTerrenos from "../Terrenos/BannerTerrenos";
import Contacto from "../Home/Contacto";
import img01 from "../../assets/imgTerrenos/img01.jpg";
import img001 from "../../assets/imgTerrenos/img001.jpg";
import img002 from "../../assets/imgTerrenos/img002.jpg";
import img003 from "../../assets/imgTerrenos/img003.jpg";
import img004 from "../../assets/imgTerrenos/img004.jpg";
import img0002 from "../../assets/imgTerrenos/img0002.jpg";
import img0003 from "../../assets/imgTerrenos/img0003.jpg";
import img0004 from "../../assets/imgTerrenos/img0004.jpg";

const MainTerrenos = () => {
  const firstImagesRef = useRef(null);

  const handleScrollToImages = () => {
    if (firstImagesRef.current) {
      firstImagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <BannerTerrenos />

      <div className="container pt-12 mb-12 flex flex-col md:flex-row flex-grow">
        <div className="px-4 md:px-12 w-full md:w-[50%] text-left">
          <p className="pt-10 mb-4">
            <span className="textoDestacado">
              ¿Has soñado con un lugar propio en el que ver crecer tus proyectos y disfrutar cada amanecer rodeado de naturaleza?{" "}
            </span>
            Tener tu propio terreno es mucho más que adquirir un espacio; es asegurar un futuro lleno de posibilidades. Es la oportunidad de trazar tus propios límites, darle forma a tus deseos y crear, con cada metro cuadrado, la vida que siempre has querido.
          </p>
          <p>
            <span className="textoDestacado">
              Imagina ese terreno transformándose en el refugio perfecto para tu familia{" "}
            </span>
            en una inversión sólida que crece con el tiempo, o en el lienzo ideal para diseñar la casa de tus sueños. Hoy puede ser el día en que comiences esa historia.
          </p>
          <div className="pt-4 mb-20">
            <button
              onClick={handleScrollToImages}
              className="bg-slate-500 text-stone-50 font-medium py-2 px-2 text-lg"
            >
              Ver terrenos disponibles
            </button>
          </div>
        </div>
        <div className="p-10 w-full md:w-[50%] mb-24">
          <img src="/imgs/blogpost1.avif" alt="Imagen ilustrativa" />
        </div>
      </div>
      <div ref={firstImagesRef} className=""></div>


      {/* Primer conjunto de imágenes */}
      <div className="mx-4 md:mx-10 mb-10">
        <div className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-2/5">
            <img
              src={img01}
              alt="Imagen principal"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-3/5 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl mt-4 md:mt-11 font-semibold text-gray-800">USD 15.500</h2>
              <p className="text-gray-500 mb-4 md:mb-16 text-lg">$35.000 Expensas</p>
              
              <h3 className="mt-2 text-xl md:text-2xl font-medium text-gray-700">Lules Tucuman</h3>
              <p className="text-gray-600">NUEVO MUNDO - BARRIO PRIVADO</p>
              
              <p className="text-gray-600 mt-1 text-sm">364 m² tot.</p>
              
              <p className="text-gray-600 mt-4 text-sm">
                En venta hermoso terreno en praderas del nogal. Mudate al paraíso, a tan solo 15 minutos del centro de Tucumán.
              </p>
            </div>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleScrollToContact} 
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 "
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Segundo conjunto de imágenes */}
      <div className="mx-4 md:mx-10 mb-10">
        <div className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-2/5 relative">
            <img
              src={img001}
              alt="Imagen principal"
              className="w-full h-full object-cover"
            />
            <div className="flex mt-2 justify-center space-x-1 p-2">
              <img src={img002} alt="Imagen 2" className="w-1/4 h-auto object-cover rounded" />
              <img src={img003} alt="Imagen 3" className="w-1/4 h-auto object-cover rounded" />
              <img src={img004} alt="Imagen 4" className="w-1/4 h-auto object-cover rounded" />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl mt-4 md:mt-11 font-semibold text-gray-800">USD 20.000</h2>
              <p className="text-gray-500 mb-4 md:mb-16 text-lg">$30.000 Expensas</p>
              
              <h3 className="mt-2 text-xl md:text-2xl font-medium text-gray-700">Lules Tucuman</h3>
              <p className="text-gray-600">LA ARBOLEDA COUNTRY CLUB</p>
              
              <p className="text-gray-600 mt-1 text-sm">500 m² tot.</p>
              
              <p className="text-gray-600 mt-4 text-sm">
                En venta hermoso terreno en la Arboleda Country Club. Un espacio privilegiado para tu familia, rodeado de naturaleza.
              </p>
            </div>

            <div className="flex justify-end mt-4">
              <button 
                onClick={handleScrollToContact}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 "
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tercer conjunto de imágenes */}
      <div className="mx-4 md:mx-10 mb-10">
        <div className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-2/5 relative">
            <img
              src={img0003}
              alt="Imagen principal"
              className="w-full h-full object-cover"
            />
            <div className="flex mt-2 justify-center space-x-1 p-2">
              <img src={img0002} alt="Imagen 2" className="w-1/4 h-auto object-cover rounded" />
              <img src={img0003} alt="Imagen 3" className="w-1/4 h-auto object-cover rounded" />
              <img src={img0004} alt="Imagen 4" className="w-1/4 h-auto object-cover rounded" />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl mt-4 md:mt-11 font-semibold text-gray-800">USD 25.000</h2>
              <p className="text-gray-500 mb-4 md:mb-16 text-lg">$28.000 Expensas</p>
              
              <h3 className="mt-2 text-xl md:text-2xl font-medium text-gray-700">Tafi Viejo Tucuman</h3>
              <p className="text-gray-600">RUTA 341</p>
              
              <p className="text-gray-600 mt-1 text-sm">400 m² tot.</p>
              
              <p className="text-gray-600 mt-4 text-sm">
                Un lugar único en Tafi Viejo, Tucumán. Sobre ruta 341, disfrutá de la naturaleza y el confort a minutos de la ciudad.
              </p>
            </div>

            <div className="flex justify-end mt-4">
              <button 
                onClick={handleScrollToContact}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 "
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de contacto con id="contacto" */}
      <div id="contacto" className="flex flex-col mb-30">
        <Contacto />
      </div>

      {/* Flecha que scrollea hacia arriba */}
      <div className="flecha flex justify-center mb-10">
        <button 
          onClick={scrollToTop} 
          className="bg-gray-700 text-white rounded-full p-4 animate-bounce hover:bg-gray-900 transition-shadow duration-200 shadow-md"
          aria-label="Volver arriba"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MainTerrenos;
