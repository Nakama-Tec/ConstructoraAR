import React, { useEffect, useRef } from 'react';

const Servicios = () => {
    const parallaxRefs = useRef([]);

    useEffect(() => {
        parallaxRefs.current.forEach((ref) => {
            if (ref) {
                const computedStyle = window.getComputedStyle(ref);
                const backgroundPositionY = computedStyle.backgroundPositionY;
                const initialPositionY = 100;
                ref.initialBackgroundPositionY = initialPositionY;
            }
        });

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            parallaxRefs.current.forEach((ref) => {
                if (ref) {
                    const initialPositionY = ref.initialBackgroundPositionY || 0;
                    const speedFactor = 0.1;
                    const offset = scrollTop * speedFactor;
                    const newPositionY = initialPositionY - offset;
                    ref.style.backgroundPosition = `center ${newPositionY}px`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const articles = [
        {
            id: "article-1",
            title: "Terrenos",
            subtitle: "ENCUENTRA TU LUGAR IDEAL",
            content: (
                <>
                    <p>Ofrecemos una amplia variedad de terrenos en ubicaciones privilegiadas, perfectos para construir la casa de tus sueños o invertir en el futuro.</p>
                    <ul className='ms-10'>
                        <li>Ubicación 1</li>
                        <li>Ubicación 2</li>
                        <li>Ubicación 3</li>
                    </ul>
                </>
            ),
            image: "https://urquiaga.com.ar/wp-content/uploads/2022/01/venta-lotes-en-la-negrita-barrio-privado-vm-03.jpg"
        },
        {
            id: "article-2",
            content: "",
            image: "https://img.lagaceta.com.ar/fotos/notas/2023/02/03/1200x813_gran-tucuman-ya-habria-superado-millon-habitantes-978906-234223.webp"
        },
        {
            id: "article-3",
            title: "Construcciones",
            subtitle: "EDIFICANDO TU FUTURO",
            content: (
                <>
                    <p>Nos especializamos en construcciones personalizadas que se adaptan a tus necesidades y estilo de vida.</p>
                    <ul className='ms-10'>
                        <li>Diseño personalizado</li>
                        <li>Materiales de alta calidad</li>
                        <li>Soporte postventa</li>
                    </ul>
                </>
            ),
            image: "https://fotos.perfil.com/2020/12/02/nova-house-construcciones-1095258.jpg"
        },
        {
            id: "article-4",
            content: "",
            image:"https://antigourmet.com.ar/wp-content/uploads/2021/04/42-vista-desde-la-mina.jpg"
        },
        {
            id: "article-5",
            title: "Departamentos",
            subtitle: "VIVE CON COMODIDAD",
            content: "Encuentra el departamento perfecto que se ajuste a tus expectativas y presupuesto.",
            image: "https://www.kelman.mx/hs-fs/hubfs/Instrumental/Marketing/Comprar%20departamentos%20en%20M%C3%A9rida/Blogs/arthouse-interior-departamento.webp?width=5000&height=2813&name=arthouse-interior-departamento.webp"
        }
    ];

    return (
        <div className="servicios">
            {articles.map((article, index) => (
                <div
                    key={article.id}
                    id={article.id}
                    className="parallax-container h-[600px] w-full"
                    ref={(el) => (parallaxRefs.current[index] = el)}
                    style={{
                        backgroundImage: `url(${article.image})`,
                    }}
                >
                    <div className="parallax-content  text-left w-1/2">
                        {article.title && (
                            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                        )}
                        {article.subtitle && (
                            <h4 className="text-xl mb-2">{article.subtitle}</h4>
                        )}
                        {article.content && <>{article.content}</>}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Servicios;
