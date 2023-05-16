import React, { useState, useEffect, createContext } from 'react';
import './styles.scss';
import ResultsDisplayPane from './components/ResultsDisplayPane';
import './hljs-tokyo-night-dark-custom.css';
import QueryEntryForm from './components/QueryEntry';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dropdown from './components/Dropdown';

export const LoginContext = createContext();

const App = () => {
  const [reqStatus, setReqStatus] = useState('ready');
  const [contentCss, setContentCss] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    document.querySelector('#login-modal').style.display = loginVisible
      ? 'flex'
      : 'none';
  });
  const toggleLogin = () => {
    if (loginVisible) {
      setLoginVisible(false);
    } else {
      setLoginVisible(true);
    }
  };

  const handleQuery = (queryText, key, temp, model) => {
    console.log(reqStatus);
    if (reqStatus !== 'ready') {
      return window.alert('Please wait for the current request to complete.');
    }
    setReqStatus('waiting');
    return fetch(`/chatgpt`, {
      method: 'POST',
      body: JSON.stringify({
        prompt: queryText,
        key,
        temp,
        model
      }),
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => response.text())
      .then((text) => {
        setContentCss(text);
        setReqStatus('ready');
      })
      .catch((err) => {
        console.log(`Received error while processing query: ${err}`);
        setReqStatus('ready');
      });
  };

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
    <div id="main-app-div">
      <div id="title-text">
        StyleGPT{' '}
        <div id="login-toggle" onClick={toggleLogin}>
          <div>Sign up</div>

          <div
            style={{ height: '0px', border: '1pt solid black', width: '90%' }}
          ></div>

          <div>Log in</div>
        </div>
        <div id="login-modal">
          <div>
            <RegistrationForm />
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
      
      <div>
        <QueryEntryForm onSubmit={handleQuery} />
      </div>
      
      <div>
        <ResultsDisplayPane
          contentHtml={'./components/iframe_assets/sample_component.html'}
          contentCSS={contentCss}
          status={reqStatus}
        />
      </div>
      <div>
        <Dropdown />
      </div>
    </div>
    </LoginContext.Provider>
  );
};

export default App;
