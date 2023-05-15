import React, { useState } from 'react';

const LoginForm = () => {
    const handleRequest = (userInfo) => {
        console.log('handleRequest test', userInfo)
    return fetch(`/login`, {
        method: 'POST',
        body: userInfo,
        headers: { 'Content-type': 'text/plain' }
    })
        .then((response) => response.text())
        .then((text) => {
        if (text === 'logged in') {
            setIsLoggedIn(true);
            console.log(isLoggedIn);
        }
        })
        .catch((err) => {
        console.log(`Received error while processing login request: ${err}`);
        });
    };

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const submitThis = (event) => {
        event.preventDefault();
        const info = {username: email, password: password};
        console.log(info);
        handleRequest(info);
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


