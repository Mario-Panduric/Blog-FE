import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import getLoggedUser from '../services/GetLoggedUser.js';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Blog = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(''); 
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`http://localhost:5020/api/Blog/${id}`)
      .then((response) => {
        setPost(response.data);
        setComments(response.data.comments)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching the post:', error);
      });
      const getUserId = async() =>{
        let loggedUser = await getLoggedUser();
        setUserId(loggedUser[0].value);
        
        let user = {
          userName: loggedUser[1].value,
          email: loggedUser[2].value
        }
        setUser(user);
      }
      getUserId();
      
      
  }, []);
    
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (newComment.trim()) {
      let postData = {
        content: newComment,
        userId: userId,
        blogId: id,
      }
      console.log(postData);
      axios.post(`http://localhost:5020/api/Comments/Comment`, postData)
      .then((response) => {
        if(response.status === 201){
          location.reload();
        }
        else{
          setError('Error while posting the comment.')
        }
      })
      .catch((e) => {
        setError(e)
        console.error('Error posting the comment:', e);
      });
    }
  };

  if (!post) {
    return <LoadingSpinner/>;
  }
  
  const handleDelete = () => {
    navigate(`/blog/delete/${id}`);
  }

  const handleEdit = () => {
    navigate(`/blog/edit/${id}`);
  }
  return (
    <div className="">
      
      <Navbar />
      <div className="text-center">
        <h1 className="font-bold mt-5 text-4xl">{post.title}</h1>
        <div className="">
          {post.userId == userId &&
          <div className="flex flex-row align-center justify-end mr-20 mt-10">
            <FaEdit className="hover:cursor-pointer mr-5" onClick={handleEdit} size={30}/> 
            <MdDelete className="hover:cursor-pointer" onClick={handleDelete} size={30}/>
          </div>
          }
         
          <h4 className="text-left ml-10">Author: {user.userName}</h4>
          <h4 className="text-left ml-10">{post.createdAt.split('.')[0].replace('T', ' ')}</h4>
        </div>
        <img className="w-dvw h-150" src={
                "data:image/jpg;base64,"+ post.image} alt="Blog Image" />
        <div className="mt-10 text-lg" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-10">
          <h2 className="font-bold text-lg">Comments</h2>
          
          <form className="mt-15" onSubmit={handleCommentSubmit}>
            <div className="flex flex-col items-center justify-items-center">
              <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-350 h-20 border-1"
              />
              <button type="submit" className="mt-5 bg-blue-500 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
            
          </form>
          {error? <div>{error}</div>: 
          <div className="flex flex-col justify-center items-center flex-wrap">
            {comments.map((comment, index) => (
              <div key={index} className="border-1 border-gray-300 rounded-xl mt-5 w-350 flex-wrap">
                
                <p className="text-xl"><strong>{comments[index].user.userName}:</strong> </p>
                <p className="text-gray-500 text-xs">{comment.createdAt.split('.')[0].replace('T', ' ')}</p>
                <p className="ml-3 mb-1 text-lg flex break-all">{comment.content}</p>
              </div>
            ))}
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Blog;
