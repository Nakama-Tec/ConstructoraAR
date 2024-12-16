import React from 'react';
import ParallaxArticle from '../../Components/Layout/ParallaxArticle';
import mision from '../../assets/imgInstitucional/mision.jpg';

const Mision = () => {

  let articles = [
    { 
      id:"article-2",
      title: 'Misión',
      content: (<p className='font-bold fs-4'>Nuestra misión es brindar un servicio de calidad, con los mejores materiales y la mejor mano de obra, para satisfacer las necesidades de nuestros clientes y garantizar la durabilidad y seguridad de nuestras construcciones.</p>),
      image: mision

    }
  ];

  return (
    <ParallaxArticle articles={articles} />
  );
};

export default Mision;
