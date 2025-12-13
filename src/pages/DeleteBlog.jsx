
import Navbar from '../components/Navbar.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const cancelDelete = () => {
        navigate('/myBlogs');
    }

    const confirmDelete = () => {
        try{
            axios.delete(`https://localhost:7149/api/Posts/${id}`)
            .then((response) => {
                if(response.status === 204){
                    navigate('/myBlogs');
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    } 
    return(
        <div>
            <Navbar/>
            <div className="">
                <h1>Are you sure you want to delete blog?</h1>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
            </div>
        </div>
    )
}

export default DeleteBlog;