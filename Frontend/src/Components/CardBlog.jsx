import { memo } from "react";

const CardBlog = memo(({ blog }) => {
  return (
    <div className="h-full min-w-[250px] max-w-[300px] flex-shrink-0 cursor-pointer">
      <div className="overflow-hidden relative h-[200px] group">
        <img
          src={`/imgs/blogpost${blog.id}.avif`}
          alt={blog.title}
          className="shadow-xl brightness-50 transition duration-300 ease-in-out transform group-hover:brightness-100 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center text-xl font-extralight capitalize text-white">
          {blog.category}
        </span>
      </div>
    </div>
  );
});

export default CardBlog;
