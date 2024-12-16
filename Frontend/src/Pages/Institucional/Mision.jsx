import React from 'react';
import ParallaxArticle from '../../Components/Layout/ParallaxArticle';

const Mision = () => {

  let articles = [
    { 
      id:"article-2",
      title: 'Misión',
      content: (<p className='font-bold fs-4'>Nuestra misión es brindar un servicio de calidad, con los mejores materiales y la mejor mano de obra, para satisfacer las necesidades de nuestros clientes y garantizar la durabilidad y seguridad de nuestras construcciones.</p>),
      image: "https://viviendasllaveenmano.com/wp-content/uploads/2023/11/ingeniero-civil-gerente-trabajadores-construccion-tableta-digital-planos-hablando-planeando-sobre-sitio-construccion-concepto-trabajo-equipo-cooperacion.jpg"

    }
  ];

  return (
    <ParallaxArticle articles={articles} />
  );
};

export default Mision;
