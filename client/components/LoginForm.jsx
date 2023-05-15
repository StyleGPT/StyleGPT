import React, { useState } from 'react';

const LoginForm = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const handleRequest = (userData) => {
        console.log('handleRequest test', userData);
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
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='text' name='password' id='password' value={password} onChange={(e=>setPassword(e.target.value))}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;


