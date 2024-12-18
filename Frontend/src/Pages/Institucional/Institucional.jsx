import React from 'react';
import BannerConstrucciones from './BannerInstitucional.jsx';
import Valores from './Valores.jsx';
import Mision from './Mision.jsx';
import Vision from './Vision.jsx'; // Importa el nuevo componente Vision
import './Institucional.css'; // Importa el archivo de estilos
import Historia from './Historia.jsx';
import Politicas from './Politicas.jsx';
import TopButton from '../../Components/Layout/TopButton.jsx';

const Institucional = () => {
  return (
    <div id='institucional'>
      <BannerConstrucciones />
      <Historia />
      <Valores />
      <Mision /> 
       <Vision />  
       <Politicas />
       <TopButton />
    </div>
  );
};

export default Institucional;
