import React from "react";
import BannerConstrucciones from "./BannerConstrucciones";
import imgConstruccion from "../../assets/img construcciones/imgconstrucciones.jpg";
import Contacto from "../Home/Contacto";

// Imágenes para las 6 tarjetas (asegúrate de tenerlas en las rutas correctas)
import imgladrillo from "../../assets/img construcciones/cardladrillo.jpg";
import imgmoderno from "../../assets/img construcciones/cardmoderna.jpg";
import imgpileta from "../../assets/img construcciones/casapileta.jpg";
import imgrefaccion from "../../assets/img construcciones/cardrefacciones.jpg";
import imgduplex from "../../assets/img construcciones/cardduplex.jpg";
import imgdepa from "../../assets/img construcciones/imgdepartamento.jpg";

const MainConstrucciones = () => {

  // Función para scrollear hasta el formulario de contacto
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <BannerConstrucciones />

      <div className="container pt-12 mb-28 flex flex-grow">
        <div className="ml-12 w-[50%] text-left">
          <p className="pt-10 mb-4">
            <span className="textoDestacado">
              ¿Te gustaría diseñar tu propia casa, pero no sabes por dónde empezar?{" "}
            </span>
            No te preocupes, en este artículo te vamos a dar algunos consejos y herramientas 
            para que puedas crear el hogar de tus sueños.{" "}
          </p>
          <p>
            <span className="textoDestacado">
              El diseño de una casa es un proceso creativo y divertido, pero también requiere 
              de planificación, investigación y conocimientos técnicos.{" "}
            </span>{" "}
            Por eso, antes de ponerte manos a la obra, debes tener en cuenta algunos principios 
            básicos que te ayudarán a conseguir un resultado óptimo.
          </p>
          <div className="pt-4 mb-20">
            <button
              onClick={handleScrollToContact}
              className="bg-slate-500 text-stone-50 font-medium py-2 px-2 rounded text-sm"
            >
              Diseña tu casa con nosotros
            </button>
          </div>
        </div>
        <div className="pt-10 ml-9 w-[35%]">
          <img src={imgConstruccion} alt="Imagen ilustrativa" />
        </div>
      </div>

      <div className="pt-4">
        <p className="text-5xl">
          <span className="textoDestacado">
            Pasos para realizar el diseño de tu casa
          </span>
        </p>
      </div>
      
      <div className="recomendaciones text-left ml-48 mr-14 pt-10">
        <p>
          <span className="textoDestacado">
            ✅ Define tus necesidades y preferencias:
          </span>
          Lo primero que debes hacer es definir qué tipo de casa quieres, qué estilo te gusta, 
          qué funcionalidades necesitas y qué presupuesto tienes. Para ello, puedes inspirarte 
          en revistas, blogs, redes sociales o páginas web especializadas en arquitectura y diseño. 
          También puedes visitar casas de amigos, familiares o profesionales para ver cómo han 
          resuelto sus espacios y qué soluciones te pueden servir.{" "}
        </p>
      </div>

      <div className="text-left ml-48 mr-14 pt-10">
        <p>
          <span className="textoDestacado">
            ✅ Haz un plano de planta:
          </span>
          Una vez que tengas claro qué quieres, el siguiente paso es hacer un plano de planta. Un plano 
          de planta es un dibujo a escala que muestra la disposición de las habitaciones, los muebles 
          y los elementos estructurales de una casa. Te servirá para visualizar mejor el espacio, 
          optimizar la distribución y evitar errores de diseño.
          Para hacer un plano de planta puedes usar un programa de diseño 3D, que te permitirá crear tu casa 
          en dos dimensiones y luego verla en tres dimensiones con efectos realistas. Estos programas 
          suelen ser fáciles e intuitivos de usar, y cuentan con una amplia biblioteca de elementos 
          que puedes personalizar a tu gusto. Además, te permiten compartir tu diseño online, obtener 
          imágenes en alta definición y recibir la opinión de otros usuarios o profesionales.
        </p>
      </div>

      <div className="text-left ml-48 mr-14 pt-10">
        <p>
          <span className="textoDestacado">
            ✅ Elige los materiales y los colores:
          </span>
          Otro aspecto fundamental del diseño de una casa es la elección de los materiales y los colores 
          que vas a usar. Estos elementos influyen en el aspecto estético, pero también en el confort térmico, 
          acústico y lumínico de tu hogar. Por eso, debes elegirlos con criterio y coherencia, teniendo 
          en cuenta el estilo que quieres conseguir, el clima de la zona donde vives y el presupuesto que tienes.{" "}
        </p>
      </div>

      <div className="text-left ml-48 mr-14 pt-10">
        <p>
          <span className="textoDestacado">
            ✅ Aprovecha la luz natural:
          </span>
          La luz natural es uno de los recursos más valiosos que tienes a tu disposición para diseñar tu casa. 
          La luz natural no solo mejora la estética, sino también la salud, el bienestar y el ahorro energético. 
          Por eso, debes aprovecharla al máximo, teniendo en cuenta la orientación de tu casa, el tamaño 
          y la ubicación de las ventanas y el tipo de cortinas o persianas que vas a usar.{" "}
        </p>
      </div>

      <div className="text-left ml-48 mr-14 pt-10 mb-10">
        <p>
          <span className="textoDestacado">
            ✅ Decora con personalidad:
          </span>
          El último paso para diseñar tu casa es decorarla con personalidad. La decoración es la forma de expresar 
          tu gusto, tu estilo y tu forma de vida. Por eso, debes elegir los muebles, los objetos y los 
          detalles que te hagan sentir cómodo, feliz y orgulloso de tu hogar.{" "}
        </p>
      </div>

      {/* Aquí añadimos las tarjetas antes de la sección de contacto */}
      <div className="flex flex-col items-center mb-20">
        <p className="text-4xl font-bold mb-8">Algunas Opciones de Construcción</p>
        {/* Cambiar de Flex a Grid para organizar las tarjetas en 3 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* card ladrillo */}
          <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={imgladrillo} alt="Casa de Ladrillo" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Casa de Ladrillo</h3>
              <p className="text-gray-700 mb-4">
                Construir tu propia casa de ladrillos desde cero tiene muchas ventajas. 
                Puedes elegir la ubicación, el tamaño del lote, y diseñar el hogar 
                acorde a tus gustos, sin limitaciones de una casa preexistente.
              </p>
              <button 
                onClick={handleScrollToContact}
                className="bg-slate-500 text-white font-medium py-2 px-4 rounded text-sm hover:bg-slate-600"
              >
                Consultar
              </button>
            </div>
          </div>

          {/* card moderna */}
          <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={imgmoderno} alt="Dúplex Moderno" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Dúplex Moderno</h3>
              <p className="text-gray-700 mb-4">
                Construir un dúplex permite adquirir más propiedades a menor costo 
                que una casa unifamiliar del mismo tamaño. Además, brinda la posibilidad 
                de crear estilos diferentes, atrayendo a compradores que buscan algo distinto.
              </p>
              <button 
                onClick={handleScrollToContact}
                className="bg-slate-500 text-white font-medium py-2 px-4 rounded text-sm hover:bg-slate-600"
              >
                Consultar
              </button>
            </div>
          </div>

          {/* card pileta */}
          <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={imgpileta} alt="Casa con Pileta" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Casa con Pileta</h3>
              <p className="text-gray-700 mb-4">
                Las casas con pileta son cada vez más demandadas por quienes buscan 
                confort, funcionalidad y un valor agregado. Tener una pileta no sólo 
                brinda un espacio de relax, sino que también aporta beneficios a la 
                salud y al medio ambiente.
              </p>
              <button 
                onClick={handleScrollToContact}
                className="bg-slate-500 text-white font-medium py-2 px-4 rounded text-sm hover:bg-slate-600"
              >
                Consultar
              </button>
            </div>
          </div>

          {/* card refaccion */}
          <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={imgrefaccion} alt="Refacciones" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Refacciones</h3>
              <p className="text-gray-700 mb-4">
                Realizar refacciones en tu hogar puede aumentar significativamente su valor y 
                funcionalidad. Nuestros expertos te guiarán en cada paso para lograr los 
                mejores resultados.
              </p>
              <button 
                onClick={handleScrollToContact}
                className="bg-slate-500 text-white font-medium py-2 px-4 rounded text-sm hover:bg-slate-600"
              >
                Consultar
              </button>
            </div>
          </div>

          {/* card duplex */}
          <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={imgduplex} alt="Dúplex" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Dúplex</h3>
              <p className="text-gray-700 mb-4">
                Ofrecemos soluciones personalizadas para la construcción de dúplex, optimizando 
                espacios y maximizando el valor de tu inversión.
              </p>
              <button 
                onClick={handleScrollToContact}
                className="bg-slate-500 text-white font-medium py-2 px-4 rounded text-sm hover:bg-slate-600"
              >
                Consultar
              </button>
            </div>
          </div>

          {/* card departamento */}
          <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={imgdepa} alt="Departamentos" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Departamentos</h3>
              <p className="text-gray-700 mb-4">
                Desarrollamos proyectos de departamentos con diseños modernos y funcionales, 
                adaptados a las necesidades actuales del mercado inmobiliario.
              </p>
              <button 
                onClick={handleScrollToContact}
                className="bg-slate-500 text-white font-medium py-2 px-4 rounded text-sm hover:bg-slate-600"
              >
                Consultar
              </button>
            </div>
          </div>

        </div>
      </div>
          

      {/* Sección de contacto */}
      <div id="contacto" className="flex flex-col mb-30">
        <Contacto />
      </div>

      {/* Flecha hacia arriba */}
      <div className="flecha flex justify-center mb-10">
        <button
          onClick={scrollToTop}
          className="bg-gray-700 text-white rounded-full p-4 animate-bounce hover:bg-gray-900 transition-shadow duration-200 shadow-md"
          aria-label="Volver arriba"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MainConstrucciones;
