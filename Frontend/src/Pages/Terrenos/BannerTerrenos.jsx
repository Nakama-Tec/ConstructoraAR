import React, { useEffect, useState } from 'react';

// Importa las imágenes locales
import img5 from '../../assets/imgTerrenos/img5.jpg';
import img6 from '../../assets/imgTerrenos/img6.jpg';
import img7 from '../../assets/imgTerrenos/img7.jpg';

const images = [img5, img6, img7];

const BannerTerrenos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="BannerPrincipal overflow-hidden relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover imagenBannerPrincipal"
          />
          <div className="textoBannerPrincipal">
            <p>Invertí con <span className='textoDestacado'>nosotros.</span></p>
            <p>Invertí en tu <span className='textoDestacado'>futuro.</span></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerTerrenos;
