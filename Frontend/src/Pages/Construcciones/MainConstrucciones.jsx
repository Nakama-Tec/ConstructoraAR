import BannerConstrucciones from "./BannerConstrucciones";
import imgConstruccion from "../../assets/imgConstrucciones/imgconstrucciones.jpg";
import Contacto from "../Home/Contacto";
import './construccion.css'
import CardConstruccion from "./CardConstruccion";
// Imágenes para las 6 tarjetas (asegúrate de tenerlas en las rutas correctas)
import imgladrillo from "../../assets/imgConstrucciones/cardladrillo.jpg";
import imgmoderno from "../../assets/imgConstrucciones/cardmoderna.jpg";
import imgpileta from "../../assets/imgConstrucciones/casapileta.jpg";
import imgrefaccion from "../../assets/imgConstrucciones/cardrefacciones.jpg";
import imgduplex from "../../assets/imgConstrucciones/cardduplex.jpg";
import imgdepa from "../../assets/imgConstrucciones/imgdepartamento.jpg";
import TopButton from "../../Components/Layout/TopButton";

const opcionesConstruccion = [
  {
    id: 1,
    titulo: "Construcción de Ladrillos",
    descripcion: "Construir tu propia casa de ladrillos desde cero tiene muchas ventajas. Puedes elegir la ubicación, el tamaño del lote, y diseñar el hogar acorde a tus gustos, sin limitaciones de una casa preexistente.",
    imagen: imgladrillo,
  },
  {
    id: 2,
    titulo: "Diseño Moderno",
    descripcion: "Construir un dúplex permite adquirir más propiedades a menor costo que una casa unifamiliar del mismo tamaño. Además, brinda la posibilidad de crear estilos diferentes, atrayendo a compradores que buscan algo distinto.",
    imagen: imgmoderno,
  },
  {
    id: 3,
    titulo: "Piscinas Personalizadas",
    descripcion: "Las casas con pileta son cada vez más demandadas por quienes buscan confort, funcionalidad y un valor agregado. Tener una pileta no sólo brinda un espacio de relax, sino que también aporta beneficios a la salud y al medio ambiente.",
    imagen: imgpileta,
  },
  {
    id: 4,
    titulo: "Refacciones Rápidas",
    descripcion: "Realizar refacciones en tu hogar puede aumentar significativamente su valor y funcionalidad. Nuestros expertos te guiarán en cada paso para lograr los mejores resultados.",
    imagen: imgrefaccion,
  },
  {
    id: 5,
    titulo: "Duplex de Lujo",
    descripcion: "Ofrecemos soluciones personalizadas para la construcción de dúplex, optimizando espacios y maximizando el valor de tu inversión.",
    imagen: imgduplex,
  },
  {
    id: 6,
    titulo: "Departamentos Modernos",
    descripcion: "Desarrollamos proyectos de departamentos con diseños modernos y funcionales, adaptados a las necesidades actuales del mercado inmobiliario.",
    imagen: imgdepa,
  },
];

const MainConstrucciones = () => {

  // Función para scrollear hasta el formulario de contacto
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <>
      <BannerConstrucciones />

      <div className="container pt-12 mb-12 flex flex-col md:flex-row flex-grow">
        <div className="px-4 md:px-12 w-full md:w-[50%] text-left">
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
              className="bg-slate-500 text-stone-50 font-medium p-2 text-sm"
            >
              Diseña tu casa con nosotros
            </button>
          </div>
        </div>
        <div className="p-10 px-4 md:px-9 w-full md:w-[50%]">
          <img src={imgConstruccion} alt="Imagen ilustrativa" />
        </div>
      </div>

      <div className="container">
      <div>
        <p className="text-2xl md:text-5xl">
          <h2 className="textoDestacado">
            Pasos para realizar el diseño de tu casa
          </h2>
        </p>
      </div>
      <div className=" text-left px-4 md:px-48 pt-10">
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
      <div className="text-left px-4 md:px-48 pt-10">
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
      <div className="text-left px-4 md:px-48 pt-10">
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
      <div className="text-left px-4 md:px-48 pt-10">
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
      <div className="text-left px-4 md:px-48 pt-10 mb-10">
        <p>
          <span className="textoDestacado">
            ✅ Decora con personalidad:
          </span>
          El último paso para diseñar tu casa es decorarla con personalidad. La decoración es la forma de expresar 
          tu gusto, tu estilo y tu forma de vida. Por eso, debes elegir los muebles, los objetos y los 
          detalles que te hagan sentir cómodo, feliz y orgulloso de tu hogar.{" "}
        </p>
      </div>

      </div>





      <div className="cards-container mt-24 mb-12">
          {opcionesConstruccion.map((opcion) => (
            <CardConstruccion
              key={opcion.id}
              titulo={opcion.titulo}
              descripcion={opcion.descripcion}
              imagen={opcion.imagen}
            />
          ))}
        </div>

        <Contacto />
        <TopButton />
    </>
  );
};

export default MainConstrucciones;
