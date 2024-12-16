import React from "react";
import "./Valores.css";

function Valores() {
  return (
    <div className="valores">
      <div id="valores1" className="itemValores">
        <h2 className="tituloValores">VALORES</h2>
        <p>                    
        <span className="quoteBefore"/><span/> 
          En nuestra empresa prevalece el compromiso y el profesionalismo para
          afrontar los retos y promocionar nuestro servicio. Quien pertenezca a
          esta corporación deberá ajustarse a los siguientes valores:
          
          <ul>
            <li>Espíritu de pertenencia</li>
            <li>Lealtad </li>
            <li>Compañerismo</li>
            <li>Puntualidad</li>
            <li>Ética profesional</li>
            <li>Excelencia en el logro de objetivos <span className="quoteAfter"/><span/> </li>
          </ul>
          
        </p>
      </div>
      <div className="imgValores"> <img src="https://www.hubspot.com/hubfs/media/valoresdeunaempresa.jpeg" alt="" /></div>
      <div className="imgValores"> <img src="https://desdeelmurete.com/wp-content/uploads/2015/10/1.-Estructura-de-obra..jpg" alt="" /></div>
      <div id="compromisoInstitucional" className="itemValores">
        <h3 className="mb-4">Nuestro compromiso es siempre con el cliente.</h3>
        <p className="mb-24">
          Todos nuestros equipos están orientados a satisfacer sus necesidades,
          apuntando a la excelencia en seguridad, calidad, tiempos de ejecución,
          eficiencia de los procesos y en los detalles de terminación.
        </p>
        <h3 className="mb-4">Constructora AR es calidad: es lo que nos define.</h3>
        <p>
          Nos apoyamos en 12 años de experiencia en el territorio y en una
          pasión constante por el trabajo y la innovación permanente. En
          Constructora AR tenemos una filosofía de acompañamiento a largo plazo,
          compromiso con la excelencia y pasión por la calidad y la tecnología.
        </p>
      </div>
    </div>
  );
}

export default Valores;
