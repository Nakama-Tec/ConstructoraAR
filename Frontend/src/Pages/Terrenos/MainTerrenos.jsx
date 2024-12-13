import React, { useRef } from "react";
import BannerTerrenos from "../Terrenos/BannerTerrenos";
import Contacto from "../Home/Contacto";
import img01 from "../../assets/img terrenos/img01.jpg";
import img02 from "../../assets/img terrenos/img02.jpg";
import img03 from "../../assets/img terrenos/img03.jpg";
import img04 from "../../assets/img terrenos/img04.jpg";
import img001 from "../../assets/img terrenos/img001.jpg";
import img002 from "../../assets/img terrenos/img002.jpg";
import img003 from "../../assets/img terrenos/img003.jpg";
import img004 from "../../assets/img terrenos/img004.jpg";
import img0001 from "../../assets/img terrenos/img0001.jpg";
import img0002 from "../../assets/img terrenos/img0002.jpg";
import img0003 from "../../assets/img terrenos/img0003.jpg";
import img0004 from "../../assets/img terrenos/img0004.jpg";
import blogpost1 from "../../../public/imgs/blogpost1.avif";

const MainTerrenos = () => {
  const firstImagesRef = useRef(null);

  const handleScrollToImages = () => {
    if (firstImagesRef.current) {
      firstImagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <BannerTerrenos />

      <div className="container pt-20 mb-28 flex flex-grow">
        <div className="ml-12 w-[50%] text-left">
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
              className="bg-slate-500 text-stone-50 font-medium py-2 px-2 rounded text-lg"
            >
              Ver terrenos disponibles
            </button>
          </div>
        </div>
        <div className="pt-10 ml-48 w-[35%] mb-24">
          <img src={blogpost1} alt="Imagen ilustrativa" />
        </div>
      </div>

      {/* Primer conjunto de imágenes con ref */}
      <div ref={firstImagesRef} className="mt-8 flex ml-10 mb-10">
        <div className="flex flex-col w-[50%]">
          <img
            src={img01}
            alt="Imagen principal"
            className="w-full h-80 object-cover"
          />
          <div className="flex mt-4 space-x-1">
            <img
              src={img02}
              alt="Imagen 2"
              className="w-1/3 h-auto object-cover"
            />
            <img
              src={img03}
              alt="Imagen 3"
              className="w-1/3 h-auto object-cover"
            />
            <img
              src={img04}
              alt="Imagen 4"
              className="w-1/3 h-auto object-cover"
            />
          </div>
        </div>
        <div className="ml-60 pt-60">
          <h3 className="text-4xl font-semibold">Lules Tucuman</h3>
          <p className="mt-2 text-lg">NUEVO MUNDO - BARRIO PRIVADO</p>
          <button className="mt-4 text-lg text-blue-500 hover:underline">
            Ver más
          </button>
        </div>
      </div>

      {/* Segundo conjunto de imágenes */}
      <div className="mt-20 flex ml-10 mb-10">
        <div className="flex flex-col w-[50%]">
          <img
            src={img001}
            alt="Imagen principal"
            className="w-full h-auto object-cover"
          />
          <div className="flex mt-4 space-x-1">
            <img
              src={img002}
              alt="Imagen 2"
              className="w-1/3 h-auto object-cover"
            />
            <img
              src={img003}
              alt="Imagen 3"
              className="w-1/3 h-auto object-cover"
            />
            <img
              src={img004}
              alt="Imagen 4"
              className="w-1/3 h-auto object-cover"
            />
          </div>
        </div>
        <div className="ml-60 pt-60">
          <h3 className="text-4xl font-semibold">Lules Tucuman</h3>
          <p className="mt-2 text-lg">LA ARBOLEDA COUNTRY CLUB</p>
          <button className="mt-4 text-lg text-blue-500 hover:underline">
            Ver más
          </button>
        </div>
      </div>

      <div className="mt-8 flex ml-10 mb-10">
        <div className="flex flex-col w-[50%]">
          <img
            src={img0001}
            alt="Imagen principal"
            className="w-full h-80 object-cover"
          />
          <div className="flex mt-4 space-x-1">
            <img
              src={img0002}
              alt="Imagen 2"
              className="w-1/3 h-auto object-cover"
            />
            <img
              src={img0003}
              alt="Imagen 3"
              className="w-1/3 h-auto object-cover"
            />
            <img
              src={img0004}
              alt="Imagen 4"
              className="w-1/3 h-auto object-cover"
            />
          </div>
        </div>
        <div className="ml-60 pt-60">
          <h3 className="text-4xl font-semibold">Tafi viejo Tucuman</h3>
          <p className="mt-2 text-lg">RUTA 341</p>
          <button className="mt-4 text-lg text-blue-500 hover:underline">
            Ver más
          </button>
        </div>
      </div>

      {/* Sección de contacto con id="contacto" */}
      <div id="contacto" className="flex flex-col mb-30">
        <Contacto />
      </div>
    </>
  );
};

export default MainTerrenos;
