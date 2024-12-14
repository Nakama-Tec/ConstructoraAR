import { useState } from 'react';
import './home.css'; // Importa el archivo CSS

const PreguntasFrecuentes = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const faqData = [
        { question: "¿Qué servicios de construcción ofrecen?", answer: "Ofrecemos servicios de construcción residencial, comercial e industrial." },
        { question: "¿Cuál es el tiempo estimado para completar un proyecto?", answer: "El tiempo estimado varía según el tamaño y la complejidad del proyecto, pero generalmente oscila entre 3 y 12 meses." },
        { question: "¿Cómo puedo obtener un presupuesto?", answer: "Puedes obtener un presupuesto contactándonos a través de nuestro formulario en línea o llamando a nuestro número de atención al cliente." },
        { question: "¿Ofrecen servicios de diseño arquitectónico?", answer: "Sí, contamos con un equipo de arquitectos que pueden ayudarte a diseñar tu proyecto desde cero." },
        { question: "¿Trabajan con materiales ecológicos?", answer: "Sí, utilizamos materiales ecológicos y sostenibles siempre que sea posible." },
        { question: "¿Puedo visitar un proyecto en curso?", answer: "Sí, puedes coordinar una visita a uno de nuestros proyectos en curso contactando a nuestro equipo de atención al cliente." },
        { question: "¿Ofrecen financiamiento para proyectos de construcción?", answer: "Sí, ofrecemos opciones de financiamiento a través de nuestras entidades bancarias asociadas." },
        { question: "¿Tienen certificaciones y licencias?", answer: "Sí, contamos con todas las certificaciones y licencias necesarias para operar en el sector de la construcción." }
    ];
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Preguntas Frecuentes</h2>
                <div className="space-y-4 preguntas-frecuentes">
                    {faqData.map((item, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                className="w-full text-left py-4 focus:outline-none border-bottom border-1 border-dark"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-semibold ">{item.question}</span>
                            </button>
                            <div className={`accordion-content text-left  ${activeIndex === index ? 'open ' : ''}`}>
                                <p className='py-2'>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default PreguntasFrecuentes;

