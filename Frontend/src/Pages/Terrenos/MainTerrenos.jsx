import React from "react";
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

const MainTerrenos = () => {
  return (
    <>
      <BannerTerrenos />

      {/* Primer conjunto de imágenes */}
      <div className="mt-8 flex ml-10 mb-10">
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
          <p className="mt-2 text-lg">RUTA 341 </p>
          <button className="mt-4 text-lg text-blue-500 hover:underline">
            Ver más
          </button>
        </div>
      </div>
        <div className="flex flex-col mb-30">
          <Contacto />
        </div>
    </>
  );
};

export default MainTerrenos;
