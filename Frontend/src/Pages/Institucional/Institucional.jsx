import React from 'react';
import BannerConstrucciones from './BannerInstitucional.jsx';
import Valores from './Valores.jsx';
import Mision from './Mision.jsx';
import Vision from './Vision.jsx'; // Importa el nuevo componente Vision
import './Institucional.css'; // Importa el archivo de estilos

const Institucional = () => {
  return (
    <>
      <BannerConstrucciones />
      <div className="mision-vision-container"> {/* Contenedor para Misión y Visión */}
        <Mision />
        <Vision />
      </div>
      <div className="valores">
        <Valores />
      </div>
    </>
  );
};

export default Institucional;
