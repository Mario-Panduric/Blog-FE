import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import BlogList from '../components/BlogList.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getLoggedUser from '../services/GetLoggedUser';
const FilteredBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedUser = await getLoggedUser();
                console.log('Logged user:', loggedUser);
                
                const response = await axios.get(`http://localhost:5020/api/Blog/user/${loggedUser[0].value}`, {
                    withCredentials: true
                });

                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching user or blogs:', error);
            }
        };

        fetchUser();
    }, []);
    
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