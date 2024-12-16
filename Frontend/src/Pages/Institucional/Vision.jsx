import React from "react";
import "./Vision.css"; // Importa el archivo de estilos
import vision from "../../assets/imgInstitucional/vision.jpg"; // Importa el video de fondo
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
        vision,
    },
  ];
  return (
    <ParallaxArticle articles={articles} />
  );
}

export default Vision;
