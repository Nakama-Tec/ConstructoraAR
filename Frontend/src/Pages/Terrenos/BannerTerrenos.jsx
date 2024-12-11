import React from 'react';

    import { useEffect, useState } from 'react';

    const images = [
        'https://static1.sosiva451.com/53568521/e509e5a3-f6b7-4204-8e66-9a535c32e0c8_u_small.jpg',
        'https://http2.mlstatic.com/D_NQ_NP_2X_643272-MLA76614209444_062024-N.webp',
        'https://storage.googleapis.com/portales-prod-images/2043/property-images/2023/3/bd3ac363-d116-4088-a11a-4dafba2820cc.jpeg',
        'https://www.inbarc.com.ar/wp-content/uploads/2020/08/Venta-Terreno-Country-Tucuman.jpg'
    ];

    const BannerTerrenos = () => {
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
                    <p>Invertí con  <span className='textoDestacado'>nosotros.</span ></p>
                    <p>Invertí en tu  <span className='textoDestacado'>futuro.</span></p>
                </div>
                </div>
            ))}
            </div>
        );
    };

    export default BannerTerrenos;
