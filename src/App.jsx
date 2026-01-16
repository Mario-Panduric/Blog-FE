import './App.css';
import './pages/SignIn.jsx'
import React, { useState, useEffect } from 'react';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx' 
import {Navigate, Route, Routes } from "react-router-dom";
import Blog from './pages/Blog.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import UserContext from './components/UserContext';
import FilteredBlogs from './pages/FilteredBlogs.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
import DeleteBlog from './pages/DeleteBlog.jsx';
import EditBlog from './pages/EditBlog.jsx';
import AddBlog from './pages/AddBlog.jsx';

function App() {

  return (
    <UserContext.UserProvider>
      <Routes>
        <Route path="/" element={ <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/blog/:id" element={<PrivateRoute ><Blog /></PrivateRoute>} />
        <Route path="/blogs/:postTitle" element={<PrivateRoute ><FilteredBlogs /></PrivateRoute>} />
        <Route path="/myBlogs" element={<PrivateRoute ><MyBlogs /></PrivateRoute>} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/blog/delete/:id" element={<PrivateRoute ><DeleteBlog /></PrivateRoute>} />
        <Route path="/blog/edit/:id" element={<PrivateRoute ><EditBlog /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute ><AddBlog /></PrivateRoute>} />
      </Routes>
    </UserContext.UserProvider>
    
  );
}

export default App;