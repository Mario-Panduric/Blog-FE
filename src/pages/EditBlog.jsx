import { useState, useEffect } from 'react';
import RichTextEditor from '../components/RichTextEditor.jsx';
import getLoggedUser from '../services/GetLoggedUser.js'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx'

const EditBlog = () => {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const getUser = async() =>{
      let user = await getLoggedUser();
      console.log(user[0].value);
      setUser(user[0].value);
    }
    getUser();
    const editPost = async () => {
        try {
             const post = await axios.get(`https://localhost:7149/api/Posts/${id}`, {
                    withCredentials: true
                });
                setPostContent(post.data.content);
                setPostTitle(post.data.title);
        }
        catch(error){
            console.log(error);
        }
       
    }
    editPost(); 
  } ,[])
   
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
      const postData = {
        title: postTitle.trim(),
        content: postContent,  
        userID: user,
      };

      try {
        const response = await fetch(`https://localhost:7149/api/Posts/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          credentials: "include"
          },
          body: JSON.stringify(postData),
        });
        console.log(postData);
        if (!response.status === 204) {
          throw new Error('Error while sending request.');
        }
        navigate('/myBlogs');

      } catch (error) {
        console.log(error);
        setError('Error while sending request.');

      } finally {
        setLoading(false);
      
      }
  };

  return (
    <div>
    <Navbar/>
    <div className="">
      <div className="">
        <form onSubmit={handleSubmit}onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
          <input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Title"
          />
          {(postContent && postTitle )  ? (
              <RichTextEditor onChange={setPostContent} content={postContent} />
            ) : (
              <p>Loading...</p>
            )}
          {error && <p className="">{error}</p>}
          <button className="" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditBlog;
