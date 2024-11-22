import React from "react";



const CardBlog = ({blog}) => {
    return (

        

        <div className="h-full w-[300px] m-2 flex-shrink-0 cursor-pointer">
            <div className="rounded-3xl overflow-hidden mb-4 relative h-[200px]">
                <img src={`/imgs/blogpost${blog.id}.avif`} alt={blog.tittle} />
                <span className="absolute top-3 left-4 border border-blue-200 text-xs rounded-xl px-4 py-2 font-semibold capitalize bg-blue-100">
                    {blog.category}
                </span>
            </div>
            <div className="px-4 flex gap-4">
                <img src='../src/assets/logoconfondo.jpg' 
                alt="Author" className="object-cover w-12 h-12 rounded-full" />
                <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-lg font-bold text-slate-700 leading-7 whitespace-normal">
                        {blog.title}
                    </h3>
                   
                </div>
            </div>

        </div>
    )
    
};
export default CardBlog;