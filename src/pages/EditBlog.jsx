import { useState, useEffect } from 'react';
import RichTextEditor from '../components/RichTextEditor.jsx';
import getLoggedUser from '../services/GetLoggedUser.js'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const EditBlog = () => {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
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
             const post = await axios.get(`http://localhost:5020/api/Blog/${id}`, {
                    withCredentials: true
                });
                setPostContent(post.data.content);
                setPostTitle(post.data.title);
                setImage(post.data.image);
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
        image: image,
        userID: user,
      };

      try {
        const response = await fetch(`http://localhost:5020/api/Blog/${id}`, {
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
    {postTitle?
      <div className="flex justify-center">
        <div className="bg-sky-100 bg-opacity-50 h-1/2 border-solid border-1 p-5 rounded">
        <form className="flex flex-col align-center justify-center" onSubmit={handleSubmit}onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
        <input
        className="border-1 rounded h-10"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        placeholder="Title"
        />
        <RichTextEditor onChange={setPostContent} content={postContent} />
        {error && <p className="">{error}</p>}
        <div className="flex align-center justify-center">
        <button className="bg-blue-500 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded w-1/2" type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Submit'}
        </button>
        </div>
        </form>
        </div>
        </div>
        :
        <LoadingSpinner/>
    }
    </div>
  );
};

export default EditBlog;
