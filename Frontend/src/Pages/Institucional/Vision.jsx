import React from "react";
import "./Vision.css"; // Importa el archivo de estilos
import visionVideo from "../../assets/videos/videoVision.mp4"; // Importa el video de fondo
function Vision() {
  return (
    <div className="vision-container">
      {/* Video de fondo */}
      <video className="vision-video" autoPlay loop muted>
  <source src={visionVideo} type="video/mp4" />
  Tu navegador no soporta la reproducción de video.
</video>
      
      {/* Capa oscura */}
      <div className="vision-overlay"></div>
      
      {/* Contenido */}
      <div className="vision-content">
        <h1 className="vision-title">Nuestra Visión</h1>
        <p className="vision-text">
        Ser líderes en la industria de la construcción, reconocidos por nuestra excelencia e innovación, brindando seguridad y confianza a nuestros clientes en cada proyecto que emprendemos.
        </p>
      </div>
    </div>
  );
}

export default Vision;
