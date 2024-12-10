import React from "react";
import { blogs } from "../../data/data";
import CardBlog from "../../Components/CardBlog";

const CarruselServicios = () => {
  const carouselBlogs = [...blogs, ...blogs, ...blogs];

  return (
    <div className="Carrousel">
      <div className="container mb-5">
        <div className="overflow-hidden w-full">
          <div className="flex whitespace-nowrap animate-scroll">
            {carouselBlogs.map((blog, index) => (
              <CardBlog blog={blog} key={index}/>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default CarruselServicios;
