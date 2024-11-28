import React from "react";

const CardBlog = ({ blog }) => {
  return (
    <div className="h-full w-[300px] flex-shrink-0 cursor-pointer">
      <div className="overflow-hidden relative h-[200px] group">
        <img
          src={`/imgs/blogpost${blog.id}.avif`}
          alt={blog.tittle}
          className="shadow-xl brightness-50 transition duration-300 ease-in-out transform group-hover:brightness-100 group-hover:scale-105"
        />
        {/* Posicionar el texto en el centro y cambiar el color a blanco */}
        <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold capitalize text-white">
          {blog.category}
        </span>
      </div>
    </div>
  );
};

export default CardBlog;
