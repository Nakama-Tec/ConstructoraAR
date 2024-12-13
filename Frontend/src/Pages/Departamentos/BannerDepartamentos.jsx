import React from 'react';
import bannerdepa1 from '../../assets/img departamento/bannerdepa.jpg';
// import bannerdepa2 from '../../assets/img departamento/bannerdepa2.jpg';
// import bannerdepa3 from '../../assets/img departamento/bannerdepa3.jpg';
    import { useEffect, useState } from 'react';

    const images = [bannerdepa1];

    const BannerDepartamentos = () => {
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
                    <br />
                    <p> Alquileres <span className='textoDestacado'>disponibles.</span ></p>
                </div>
                </div>
            ))}
            </div>
        );
    };

    export default BannerDepartamentos;
