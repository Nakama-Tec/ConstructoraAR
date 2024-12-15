import React from 'react';
import ParallaxArticle from '../../Components/Layout/ParallaxArticle';
import logo from '../../assets/logoconfondo.jpg';

const Historia = () => {
    const articles = [
        {
            id: "article-2",
            title: "Historia",
            content: (
                <>
                    <p className='font-bold '>
                    CONSTRUCTORA AR SRL es una empresa familiar, fundada en el 2012 en la ciudad de San Miguel de Tucumán, Tucumán. La principal actividad de la empresa es la Construcción y reforma de edificios residenciales y no residenciales públicos y privados – y como actividad secundaria Emprendimientos Inmobiliarios. A lo largo de estos años, lo que comenzó como un pequeño proyecto se transformó en una estable empresa familiar, con más de 20 empleados. Hoy en día, los dirigentes de esta empresa debaten la necesidad de formalizar y reorganizar la estructura de la empresa delegando  funciones a cada área. </p>
                </>

            ),
            image: logo
        }]
    return (
        <ParallaxArticle articles={articles} />
    );
    
};

export default Historia;