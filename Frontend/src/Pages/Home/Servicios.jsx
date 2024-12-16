import React, { useEffect, useRef, useState } from 'react';
import './servicios.css';
import { Link } from 'react-router-dom';
import ParallaxArticle from '../../Components/Layout/ParallaxArticle';

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
            image: "https://urquiaga.com.ar/wp-content/uploads/2022/01/venta-lotes-en-la-negrita-barrio-privado-vm-03.jpg",
            button: "/terrenos"
        },
        {
            id: "article-2",
            title: "Más de 12 años de experiencia respaldan nuestro trabajo.",
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
            image: "https://fotos.perfil.com/2020/12/02/nova-house-construcciones-1095258.jpg",
            button: "/construcciones"
        },
        {
            id: "article-4",
            title: "Contáctanos y descubre cómo podemos hacer realidad tu próximo proyecto.",
            image:"https://upload.wikimedia.org/wikipedia/commons/d/de/Quebrada_en_El_Infiernillo-_Tucum%C3%A1n.JPG",
            button: "#contacto"
        },
        {
            id: "article-5",
            title: "Departamentos",
            subtitle: "VIVE CON COMODIDAD",
            content: "Encuentra el departamento perfecto que se ajuste a tus expectativas y presupuesto.\nUbicados en zonas céntricas y seguras, nuestros departamentos cuentan con amenidades y servicios exclusivos.",
            image: "https://www.kelman.mx/hs-fs/hubfs/Instrumental/Marketing/Comprar%20departamentos%20en%20M%C3%A9rida/Blogs/arthouse-interior-departamento.webp?width=5000&height=2813&name=arthouse-interior-departamento.webp",
            button: "/departamentos"
        }
    ];

    return (
       <ParallaxArticle articles={articles} />
    );
};
export default Servicios;
