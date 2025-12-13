import React from 'react';

const BlogList = ({ blogs, handleBlogClick }) => {
  return (
    <div className="">
      <h1>Blogs</h1>
      <div className="flex flex-wrap">
          
        {blogs.map((blog) => (
        <div  key={blog.id} onClick={() => handleBlogClick(blog.id)} className="bg-white rounded shadow max-w-md ml-3 mr-2 mt-5 size-60 hover:cursor-pointer">
          <header class="p-4 flex align-center justify-center">
          <div>
            <h3 >{blog.title}</h3> 
          </div>

          </header>

          <section > 
              <img className="w-full object-cover size-20" src={
                "data:image/jpg;base64,"+ blog.image} alt="Blog Image" />
              <p>
                {(new DOMParser().parseFromString(blog.content, 'text/html').body.textContent || "").substring(0, 100)}...
              </p>
          </section>

        </div>
          ))}
          
      </div>
    </div>
  );
};

export default BlogList;