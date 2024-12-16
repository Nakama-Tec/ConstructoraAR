import { useEffect, useRef, useState } from 'react';
import './servicios.css';
import { Link } from 'react-router-dom';
import ParallaxArticle from '../../Components/Layout/ParallaxArticle';
import terrenos from '../../assets/imgHome/Terrenos.jpg';
import construcciones from '../../assets/imgHome/construcciones.jpg';
import departamentos from '../../assets/imgHome/departamentos.webp';
import experiencia from '../../assets/imgHome/experiencia.webp';
import contacto from '../../assets/imgHome/contacto.jpg';


const Servicios = () => {


    const articles = [
        {
            id: "article-1",
            title: "Terrenos",
            subtitle: "ENCUENTRA TU LUGAR IDEAL",
            content: (
                <>
                    <p>Ofrecemos una amplia variedad de terrenos en ubicaciones privilegiadas, perfectos para construir la casa de tus sueños o invertir en el futuro.</p>
                    <ul className='ms-10'>
                        <li>Zonas tranquilas y residenciales</li>
                        <li>Áreas con proyección de crecimiento</li>
                        <li>Cercanía a servicios esenciales</li>
                    </ul>
                </>
            ),
            image: terrenos,
            button: "/terrenos"
        },
        {
            id: "article-2",
            title: "Más de 12 años de experiencia respaldan nuestro trabajo.",
            image: experiencia,
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
            image: construcciones,
            button: "/construcciones"
        },
        {
            id: "article-4",
            title: "Contáctanos y descubre cómo podemos hacer realidad tu próximo proyecto.",
            image: contacto,
            button: "#contacto"
        },
        {
            id: "article-5",
            title: "Departamentos",
            subtitle: "VIVE CON COMODIDAD",
            content: "Encuentra el departamento perfecto que se ajuste a tus expectativas y presupuesto.\nUbicados en zonas céntricas y seguras, nuestros departamentos cuentan con amenidades y servicios exclusivos.",
            image: departamentos,
            button: "/departamentos"
        }
    ];

    return (
       <ParallaxArticle articles={articles} />
    );
};
export default Servicios;
