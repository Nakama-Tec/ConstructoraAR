import React from 'react';

    import { useEffect, useState } from 'react';

    const images = [
        'https://canalc.com.ar/wp-content/uploads/2024/01/construir-una-casa-desde-cero.jpg',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmaxacero.com%2Fblog%2F14-pasos-para-la-construccion-de-una-casa-guia-desde-cero%2F&psig=AOvVaw0yLo5GV9dnwSKR1zd_2s8z&ust=1734012344584000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCirMDxn4oDFQAAAAAdAAAAABAK',
        'https://www.salta.gob.ar/public/images/noticias/77961-avanza-la-construccion-de-100-viviendas-en-oran.jpg',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fes%2Fsearch%2Fconstrucci%25C3%25B3n-de-la-casa&psig=AOvVaw0yLo5GV9dnwSKR1zd_2s8z&ust=1734012344584000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCirMDxn4oDFQAAAAAdAAAAABAd'
    ];

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
                </div>
                </div>
            ))}
            </div>
        );
    };

    export default BannerConstrucciones;
