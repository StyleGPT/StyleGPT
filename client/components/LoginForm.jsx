import React, { useContext, useState } from 'react';
import { LoginContext } from '../App';

const LoginForm = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { setIsLoggedIn } = useContext(LoginContext);

    const handleRequest = (userData) => {
        return fetch(`/login`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => response.text())
        .then((text) => {
            if (text === 'logged in') {
                setIsLoggedIn(true);
            };
        })
        .catch((err) => {
            console.log(`Received error while processing login request: ${err}`);
        });
    };
    
    const submitThis = (event) => {
        event.preventDefault();
        const userData = {username: email, password: password};
        handleRequest(userData);
    }

    return (
        <div>
            <form action='' onSubmit={submitThis}>
                <div>
                    <input type='text' name='email' id='email' value={email} placeholder='email' onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type='text' name='password' id='password' value={password} placeholder='password' onChange={(e=>setPassword(e.target.value))}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;