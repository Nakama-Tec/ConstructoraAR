import { useEffect, useState } from 'react';

    const images = [
        'https://www.comunicaciontucuman.gob.ar/fotos/notas/2023/09/26/230926094234_56125.jpeg',
        'https://monterizos.com.ar/wp-content/uploads/2022/01/hospital-general-lamadrid-monteros.jpg',
        'https://www.tribunaldecuentas.gob.ar/wp-content/uploads/2023/03/CDI-Burruyacu-SEOP-01.jpg',
        'https://basicapartment.com/storage/blog/inner_page_desktop/Irlswh5WN6jMiMJroJlokMGqtxcJBWo5FLrbyzOU.jpg?v=1693814124'
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
