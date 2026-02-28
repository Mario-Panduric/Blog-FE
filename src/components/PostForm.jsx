import { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import getLoggedUser from '../services/GetLoggedUser.js'

const NewPostForm = ({ onSubmit }) => {
  const [postText, setPostText] = useState('');  
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [fileImage, setImage] = useState(null);
  const [binaryImage, setBinaryImage] = useState(null)
  //const [imageType, setImageType] = null

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
        const response = await fetch('http://localhost:5020/api/Blog/Blog', {
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
        onSubmit(postData);
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
    <div className="flex justify-center absolute  m-auto left-0 right-0 w-1/2 h-full">
      <div className="bg-blue-200 bg-opacity-50 h-1/2">
        <form className="flex flex-col align-center justify-center" onSubmit={handleSubmit}onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
          <input
            className="border-1 rounded h-10"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input className="border-1 rounded w-1/3 bg-blue-500 mt-4" type='file' onChange={getImage}></input>
          <RichTextEditor className="rounded" onChange={setPostText} content={postText} />
          {error && <p className="">{error}</p>}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
