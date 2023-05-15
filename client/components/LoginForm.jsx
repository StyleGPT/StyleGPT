import React, { useState } from 'react';

const LoginForm = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ dataInput, setDataInput ] = useState('');
    const submitThis = () => {
        const info = {email: email, password: password}
        setDataInput(info);
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


const handleQuery = (userInfo) => {
  return fetch(`/login`, {
    method: 'POST',
    body: userInfo,
    headers: { 'Content-type': 'text/plain' }
  })
    .then((response) => response.text())
    .then((text) => {
      if (text === 'logged in') {

      }
      if (text === 'login failed') {
        window.alert('Email or password incorrect')
      }
    })
    .catch((err) => {
      console.log(`Received error while processing login request: ${err}`);
    });
};