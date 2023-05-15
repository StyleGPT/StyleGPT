import React, { useState } from 'react';

const RegistrationForm = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ apiKey, setApiKey ] = useState('');

    const handleRequest = (userData) => {
        console.log('handleRequest test', userData);
        return fetch(`/signup`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-type': 'application/json' }
        })
            .then((response) => response.text())
            .then((text) => {
            if (text === 'user created in database') {
                console.log(text);
            }
            })
            .catch((err) => {
            console.log(`Received error while processing login request: ${err}`);
            });
    };

    const submitThis = () => {
        const userData = {email: email, password: password, apiKey: apiKey};
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
                <div>
                    <label htmlFor='apiKey'>API Key</label>
                    <input type='text' name='apiKey' id='apiKey' value={apiKey} onChange={(e=>setApiKey(e.target.value))}/>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegistrationForm;


