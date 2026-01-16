import React, { useState, useEffect } from 'react'
import PostForm from './PostForm';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import getLoggedUser from '../services/GetLoggedUser';
import { IoHomeOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { TiDocument } from "react-icons/ti";

const Navbar = () => {
  const [user, setUser] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  
  const handleAddNewPost = () => {
    navigate('/add')
  };

  const fetchUser = async() => {
    let loggedUser = await getLoggedUser();
    setUser(loggedUser[1].value);
    console.log(loggedUser[1].value);
  }
  fetchUser();
  const handleLogout = () => {
    navigate('/logout');
  };

  const handleHome = () => {
    if(showForm){
      setShowForm(false)
    }
    navigate('/home')
  };
  
  const handleFormSubmit = (postText) => {
    console.log('New post:', postText); 
    setShowForm(false); 
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const submitSearch = (title) => {
    navigate(`/blogs/${title}`);
  }

  const showMyPosts = () => {
    navigate(`/myBlogs`)
  }
    return (
      <UserContext.UserProvider>
        <nav className="bg-sky-400 border-gray-500 py-2.5">
          <div className="flex flex-row items-center justify-between text-white">
            <h3 className="flex justify-start ml-10 font-bold text-lg">Welcome {user} </h3>
            <div className="h-18 w-120 bg-white text-center rounded">
              <input placeholder='Search' type='search' className="m-5 w-80 text-2xl bg-white placeholder:text-gray-500 text-black outline-none" value={searchValue} onChange={handleSearch}></input>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=> submitSearch(searchValue)}>Search</button>
            </div>
            <ul className="flex flex-row items-center justify-end">
              <li className="m-5"><a className="hover:cursor-pointer" onClick={handleHome}><IoHomeOutline size={25} /></a></li>
              <li className="m-5"><a className="hover:cursor-pointer" onClick={handleAddNewPost}><IoAdd size={25} /></a></li>
              <li className="m-5"><a className="hover:cursor-pointer" onClick={showMyPosts}><TiDocument size={25}/></a></li>
              <li className="m-5"><a className="hover:cursor-pointer" onClick={handleLogout}><FiLogOut size={25} /></a></li>
            </ul>
          </div>
          
          
          
        </nav>
        {showForm && <PostForm onSubmit={handleFormSubmit} />}
      </UserContext.UserProvider>
  );
};

export default Navbar;