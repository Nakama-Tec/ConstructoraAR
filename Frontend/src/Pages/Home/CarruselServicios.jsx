import { useMemo, useRef, useEffect } from "react";
import { blogs } from "../../data/data";
import CardBlog from "../../Components/CardBlog";
import "./carruselServicios.css";

const CarruselServicios = () => {
  const carouselBlogs = useMemo(() => [...blogs, ...blogs, ...blogs], [blogs]);
  const carouselRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
      }
    }, 20); // Ajusta la velocidad aquí

    return () => clearInterval(interval);
  }, []);

  // Funciones de arrastre
  const handleMouseDown = (e) => {
    isDown.current = true;
    carouselRef.current.classList.add("active");
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    carouselRef.current.classList.remove("active");
  };

  const handleMouseUp = () => {
    isDown.current = false;
    carouselRef.current.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Ajusta la sensibilidad
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="Carrousel">
      <div className="container mb-5">
        <div
          className="overflow-hidden w-full cursor-grab CardBlog"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex whitespace-nowrap">
            {carouselBlogs.map((blog, index) => (
              <CardBlog blog={blog} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarruselServicios;
