import { useEffect, useState } from 'react';
import home1 from '../../assets/imgHome/home1.jpeg';
import home2 from '../../assets/imgHome/home2.jpg';
import home3 from '../../assets/imgHome/home3.jpg';
import home4 from '../../assets/imgHome/home4.jpg';

    const images = [
        home1,
        home2,
        home3,
        home4
    ];

    const BannerPrincipal = () => {
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
                    <p>Construí tus  <span className='textoDestacado'>sueños.</span ></p>
                    <p>Invertí en el  <span className='textoDestacado'>futuro.</span></p>
                </div>
                </div>
            ))}
            </div>
        );
    };

    export default BannerPrincipal;
