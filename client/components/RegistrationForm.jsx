import React, { useContext, useState } from 'react';
import { LoginContext } from '../App';

const RegistrationForm = () => {

    const [ username, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ apikey, setApiKey ] = useState('');
    const { setIsLoggedIn } = useContext(LoginContext);

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
                setIsLoggedIn(true);
            }
        })
        .catch((err) => {
            console.log(`Received error while processing login request: ${err}`);
        });
    };

    const submitThis = (event) => {
         event.preventDefault();
        const userData = {username: username, password: password, apikey: apikey};
        handleRequest(userData);
    }

    return (
        <div>
            <form action='' onSubmit={submitThis}>
                <div>
                    <input type='text' name='username' id='username' value={username} placeholder='username' onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type='text' name='password' id='password' value={password} placeholder='password' onChange={(e=>setPassword(e.target.value))}/>
                </div>
                <div>
                    <input type='text' name='apikey' id='apikey' value={apikey} placeholder='API key' onChange={(e=>setApiKey(e.target.value))}/>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegistrationForm;


