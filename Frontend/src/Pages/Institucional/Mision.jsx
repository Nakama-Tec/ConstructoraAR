// Mision.jsx
import React, { useState, useEffect } from 'react';
import './Mision.css';

// Definir fullText fuera del componente y sin saltos de línea ni espacios al inicio
const fullText ="   Nuestra empresa, se compromete a construir más que estructuras: construimos confianza, seguridad y tranquilidad en cada paso del camino. Nuestra misión es ser un aliado confiable para nuestros clientes, ofreciendo soluciones integrales que respondan a sus sueños y necesidades, mientras priorizamos la calidad, la transparencia y el respeto. Con cada proyecto, buscamos crear espacios que inspiren, promuevan bienestar y fortalezcan el sentido de hogar, trabajando con integridad y dedicación para superar las expectativas. Porque sabemos que más que construir propiedades, estamos construyendo el futuro de quienes depositan su confianza en nosotros. ";

function Mision() {
  const [displayedText, setDisplayedText] = useState(''); // Estado para el texto que se muestra

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prevText) => prevText + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval); // Detener el intervalo al final del texto
      }
    }, 30); // Velocidad del efecto en milisegundos

    return () => clearInterval(interval); // Limpieza del intervalo al desmontar el componente
  }, []); // Array de dependencias vacío para ejecutar solo una vez

  return (
    <div className="containerMision">
      <h1 className="title">Nuestra Misión</h1>
      <p className="text">{displayedText}</p> {/* Texto que se escribe progresivamente */}
    </div>
  );
}

export default Mision;
