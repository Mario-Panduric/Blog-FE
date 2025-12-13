import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext';
import decodeJWT from '../helpers/DecodeJWT'

function SignIn(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	const navigate = useNavigate();
	const { loginUser } = UserContext.useUser();

    const handleSubmit = (e) => {
		e.preventDefault();
		if (username !== "" && password !== "") {
			fetch('https://localhost:7149/api/Users/Login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					userName: username,
					userPassword: password
				})
			})
			.then(response => {
				if (response.ok) {		
					navigate('/home');	
					return response.json();
				} else {
					throw new Error('Network response was not ok');
				}
			})
			.then(userData => {
				let user = decodeJWT(userData);
				console.log(user)		
                loginUser(user);
            })
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
			
		} else {
			console.log("All fields are required!");
		}
	};
    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center h-lvh w-screen">
                <h1 className="font-extrabold text-4xl" >Sign in:</h1>
                <input className="m-5 p-3 w-80 text-lg border-1" name="Username" placeholder='Username' value={username} onChange = {(e) => setUsername(e.target.value)} />
                <input className="m-5 p-3 w-80 text-lg border-1" name="Password" placeholder='Password' type="password" value={password} onChange = {(e) => setPassword(e.target.value)} />
                <a href='/signup' className="text-blue-500 m-3">Not registered?</a>
                <button type="submit" variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Sign in
				</button>
            </div>
        </form>
    )
}

export default SignIn