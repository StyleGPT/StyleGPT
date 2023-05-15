import React, { useState } from 'react';

const LoginForm = () => {

    const handleRequest = (userInfo) => {
    return fetch(`/login`, {
        method: 'POST',
        body: userInfo,
        headers: { 'Content-type': 'text/plain' }
    })
        .then((response) => response.text())
        .then((text) => {
        if (text === 'logged in') {
            setIsLoggedIn(true);
        }
        })
        .catch((err) => {
        console.log(`Received error while processing login request: ${err}`);
        });
    };

    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ apiKey, setApiKey ] = useState(null);
    const [ dataInput, setDataInput ] = useState(null);
    const submitThis = () => {
        const info = {email: email, password: password, apiKey: apiKey}
        setDataInput([info]);
        handleRequest(dataInput);
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
                <div>
                    <label htmlFor='apiKey'>API Key</label>
                    <input type='text' name='apiKey' id='apiKey' value={apiKey} onChange={(e=>setApiKey(e.target.value))}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;


