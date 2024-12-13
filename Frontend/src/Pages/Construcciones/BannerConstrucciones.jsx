import React from 'react';
// Importa las imágenes locales
import banner from '../../assets/img construcciones/banner.jpg';

    import { useEffect, useState } from 'react';

    const images = [banner];

    const BannerConstrucciones = () => {
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 5000);
            return () => clearInterval(interval);
        }, []);

        return (
            <div className="BannerPrincipal overflow-hidden">
            {images.map((image, index) => (
                <div
                key={index}
                className={`absolute inset-0  transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover imagenBannerPrincipal" />
                <div className=" textoBannerPrincipal">
                    <p>Construimos tu <span className='textoDestacado'>sueño.</span ></p>
                    <p> Construí con <span className='textoDestacado'>nosotros.</span></p>
                    <button className="bg-white text-black font-medium py-2 px-4 rounded text-lg">
  Solicitar Presupuesto
</button>
                </div>
                </div>
            ))}
            </div>
        );
    };

    export default BannerConstrucciones;
