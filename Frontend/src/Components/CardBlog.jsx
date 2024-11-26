import React from "react";



const CardBlog = ({blog}) => {
    return (

        

        <div className="h-full w-[300px] flex-shrink-0 cursor-pointer">
            <div className="overflow-hidden relative h-[200px]">
                <img src={`/imgs/blogpost${blog.id}.avif`} alt={blog.tittle}
                className="shadow-xl brightness-50 hover:brightness-100 transition duration-300 ease-in-out"
                />
                {/* cambiar, debe tener su categoria en el centro, al hacer hover se agranda la palabra */}
                <span className="absolute top-3 left-4 border border-blue-200 text-xs rounded-lg px-4 py-2 font-semibold capitalize bg-blue-100">
                    {blog.category}
                </span>
            </div>
            

        </div>
    )
    
};
export default CardBlog;