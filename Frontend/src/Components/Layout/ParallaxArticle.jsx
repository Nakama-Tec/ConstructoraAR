import { useEffect, useRef, useState } from 'react';
import '../../Pages/Home/servicios.css';
import { Link } from 'react-router-dom';

const ParallaxArticle = (props) => {
    const parallaxRefs = useRef([]);
    const [visible, setVisible] = useState([]);
    const [isParallaxEnabled, setIsParallaxEnabled] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsParallaxEnabled(window.innerWidth > 768); // Disable parallax for screens smaller than 768px
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parallaxRefs.current.indexOf(entry.target);
                    if (entry.isIntersecting) {
                        setVisible((prev) => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
                            return newVisible;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.7 }
        );

        parallaxRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isParallaxEnabled) return;

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
    }, [isParallaxEnabled]);

    const articles = props.articles;
    

    return (
        <div className="servicios">
            {articles.map((article, index) => (
                <div
                    key={article.id}
                    id={article.id}
                    className={`parallax-container h-[600px] w-full md:h-[400px] sm:h-[300px]`}
                    ref={(el) => (parallaxRefs.current[index] = el)}
                    style={{
                        backgroundImage: `url(${article.image})`,
                    }}
                >
                    <div className={`parallax-content transition-opacity duration-1000 ${
                        visible[index] ? "opacity-100" : "opacity-0"
                    }`}>
                        {article.title && (
                            <h2 className="text-2xl font-bold mb-2 md:text-xl sm:text-lg">{article.title}</h2>
                        )}
                        {article.subtitle && (
                            <h4 className="text-xl mb-2 md:text-lg sm:text-base">{article.subtitle}</h4>
                        )}
                        {article.content && <>{article.content}</>}
                        {article.button && article.button!= '#contacto' &&(                            
                            <Link to={article.button}>
                                <button className="boton-contactanos mt-4 d-block">Ver más</button>
                            </Link>
                        )}
                          {article.button =='#contacto' &&(                           
                                <button onClick={()=>window.location.href =`#contacto`}  className="boton-contactanos mt-4 d-block">Ver más</button>                                     
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ParallaxArticle;
