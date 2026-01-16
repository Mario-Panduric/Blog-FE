import { useState, useEffect } from 'react';
import RichTextEditor from '../components/RichTextEditor';
import getLoggedUser from '../services/GetLoggedUser.js'
import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

const AddBlog = ({ onSubmit }) => {
  const [postText, setPostText] = useState('');  
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [fileImage, setImage] = useState(null);
  const [binaryImage, setBinaryImage] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async() =>{
      let user = await getLoggedUser();
      console.log(user[0].value);
      setUser(user[0].value);
    }
    getUser();
  } ,[])
   
  const getImage = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    
    setImage(selectedFile);

    if (selectedFile != null) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const binaryString = e.target.result;
        console.log("Image: " + binaryString);
        
        const base64Data = binaryString.split(',')[1];
        //const imageType = binaryString.split(',')[0];
        //setImageType(imageType)
        setBinaryImage(base64Data);
      };

      reader.readAsDataURL(selectedFile);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postText.trim())
    if (postText.trim() && title.trim() && fileImage) {
      
      setLoading(true);
      setError(null);
      const postData = {
        title: title.trim(),
        content: postText,
        image: binaryImage,  
        userID: user,
      };

      try {
        const response = await fetch('https://localhost:7149/api/Posts/Post', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          credentials: "include"
          },
          body: JSON.stringify(postData),
        });
        console.log(postData);
        if (!response.ok) {
          throw new Error('Error while sending request.');
        }

        const result = await response.json();
        navigate('/home')
        setPostText('');
        setTitle('');
      } catch (error) {
        setError('Error while sending request.' + error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar/>
      <h1 className="text-center text-3xl font-bold mt-5 mb-5">Add new blog</h1>
      <div className="flex justify-center">
        <div className="bg-sky-100 bg-opacity-50 h-1/2 border-solid border-1 p-5 rounded">
          <form className="flex flex-col align-center justify-center" onSubmit={handleSubmit}onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
            <input
              className="border-1 rounded h-10 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <div>
              <label className="mr-2">Add wallpaper:</label>
              <input className="border-1 rounded w-15 bg-blue-500 mt-4 p-1" type='file' onChange={getImage}></input>
            </div>  
            <RichTextEditor className="" onChange={setPostText} content={postText} />
            {error && <p className="">{error}</p>}
            <div className="flex align-center justify-center">
              <button className="bg-blue-500 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded w-1/2" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
          
          
        </div>
      </div>
    </>
  );
};

export default AddBlog;
