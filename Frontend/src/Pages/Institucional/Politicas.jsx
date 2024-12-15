import React from "react";
import "./politicas.css";
const Politicas = () => {
  return (
    <div className="politicas">
      <div id="politicas" className="itemValores">
        <h2 className="tituloValores">NUESTRAS POLÍTICAS</h2>
        <p className="mb-12">
          CONSTRUCTORA AR S.R.L asume el compromiso de aplicar y mejorar
          permanentemente un Sistema de Gestión de la Calidad para asegurar la
          entrega de productos y servicios confiables que cumplan con los
          requisitos y expectativas de sus clientes. Como referencia para
          promover la calidad y la mejora continua en todos los niveles de la
          organización se deberán considerar los siguientes objetivos de
          calidad:
        </p>
        <ul>
          <li>
            Mejorar continuamente nuestra gestión considerando la innovación, el
            desarrollo e implementación de las mejores prácticas y el
            cumplimiento de los requisitos legales y normativos aplicables en
            cada caso.
          </li>
          <li>
            Mantener una política de comunicación clara transparente con
            nuestros clientes, proveedores y aliados de negocios.
          </li>
          <li>
            Promover la capacitación y competencia del personal, poniendo a
            disposición los recursos necesarios para la implementación de
            programas de capacitación, orientados a reforzar el compromiso y
            desarrollar las competencias de los integrantes de la organización.
          </li>
          <li>
            Asegurar el crecimiento de la organización a partir de la
            planificación de los negocios, las inversiones y el mejoramiento de
            la eficacia en el desarrollo y utilización de los recursos e
            infraestructura. La Dirección asegura la difusión y actualización de
            esta política y hace extensivo el compromiso con la calidad a todos
            los integrantes de la organización.
          </li>
        </ul>
      </div>
      <div className="politicas-img"></div>
    </div>
  );
};

export default Politicas;
