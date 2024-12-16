import React from "react";
import "./Vision.css"; // Importa el archivo de estilos
import visionVideo from "../../assets/videos/videoVision.mp4"; // Importa el video de fondo
import ParallaxArticle from "../../Components/Layout/ParallaxArticle";
function Vision() {
  const articles = [
    {
      id: "article-4",
      title: "Visión",
      content: (
        <>
          <p className="font-bold fs-4">
          Nuestra visión es ser una empresa reconocida provincialmente en el mercado de construcción  por brindar soluciones rápidas, eficaces y con altos estándares de calidad, a su vez, pretendemos comenzar a incurrir en el mercado nacional. 
          </p>
        </>
      ),
      image:
        "https://mesasol.es/wp-content/uploads/working-2021-08-28-20-17-43-utc-scaled.jpg",
    },
  ];
  return (
    <ParallaxArticle articles={articles} />
  );
}

export default Vision;
