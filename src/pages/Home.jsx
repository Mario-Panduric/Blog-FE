import Navbar from '../components/Navbar.jsx'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogList from '../components/BlogList.jsx';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function Home(){
    const {searchFiltert} = useParams();
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    useEffect(() => {
        
        axios.get(`http://localhost:5020/api/Blog/`, {
            withCredentials: true},
        ) 
        .then((response) => {
            setBlogs(response.data); 
        })
        .catch((error) => {
            console.error('Error fetching blogs:', error);
        });
        fetch('http://localhost:5020/api/Users/getLoggedUser', {
            method: 'GET',
            credentials: 'include',
          })
          .then(response => {
            if(response.ok){
               return response.json();
            }
          })
          .then(data => {
            fetch(`http://localhost:5020/api/Users/${data[0].value}`,{
                method: 'GET',
                credentials: 'include',
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
            })
            .then(data => {
                console.log(user);
                setUser(data.userName);
            })
            
            
          })
    }, [user]);
    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`); 
      };
    return (
        <div>
            <Navbar />
            {(blogs && blogs.length)? <BlogList blogs={blogs} handleBlogClick={handleBlogClick}/> : <LoadingSpinner/> }
        </div>
    )
}

export default Home;