import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import BlogList from '../components/BlogList.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const FilteredBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const { postTitle } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
      axios.get(`https://localhost:7149/api/Posts/postTitle?postTitle=${postTitle}`, {
        withCredentials: true},
          ) 
          .then((response) => {
              setBlogs(response.data); 
          })
          .catch((error) => {
              console.error('Error fetching blogs:', error);
          });
        }
    ,[])
    
    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`); 
      };

    return (
    <div>
        <Navbar />
        <BlogList blogs={blogs} handleBlogClick={handleBlogClick}  />
    </div>
    )
    
}

export default FilteredBlog;