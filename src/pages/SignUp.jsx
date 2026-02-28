import React, { useState } from 'react';

import axios from 'axios';
function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')   

    const handleSubmit = (e) => {
		e.preventDefault();
		if (email !== "" && username !== "" && password !== "" && confirmPassword !== "") {
			if(password === confirmPassword){
				axios.post('http://localhost:5020/api/Users/Register', {
					userName: username,
					email: email,
					userPassword: password
				}, {
					headers: { 'Content-Type': 'application/json' }
				})
				.then(response => {
					if(response.status !== 201) {
						setErrorMessage(response.error);
					}
				})
				.catch(error => {
					console.error('There has been a problem with your axios operation:', error);
				});
			}
			else{
				setErrorMessage('Password does not match!');
			}
			
		} else {
			setErrorMessage('All fields are required!');
		}
	};
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center h-lvh w-screen">
                <h1 className="font-extrabold text-4xl">Sign up:</h1>
                <input className="m-5 p-3 w-80 text-lg border-1" name="Username" placeholder='Username' type='text' value={username} onChange = {(e) => setUsername(e.target.value)} />
                <input className="m-5 p-3 w-80 text-lg border-1" name="Email" placeholder='E-mail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="m-5 p-3 w-80 text-lg border-1" name="Password" placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="m-5 p-3 w-80 text-lg border-1" name="ConfirmPassword" placeholder='Confirm password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errorMessage && <div className={"font-red-500"}>{errorMessage}</div>}
				<button type="submit" className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Sign up</button>
            </div>
        </form>
    )
}

export default SignUp