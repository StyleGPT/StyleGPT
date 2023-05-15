import React, { useState, createContext, useEffect } from 'react';
import './styles.scss';
import ResultsDisplayPane from './components/ResultsDisplayPane';
import './hljs-tokyo-night-dark-custom.css';
import QueryEntryForm from './components/QueryEntry';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dropdown from './components/Dropdown';


const App = () => {
  const [reqStatus, setReqStatus] = useState('ready');
  const [contentCss, setContentCss] = useState(null);
  // const logInContext = createContext();

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
    <div id="main-app-div">
      <div id="title-text">StyleGPT</div>
      {/* <logInContext.Provider> */}
      <div>
        <RegistrationForm />
      </div>
      <div>
        <LoginForm />
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

      {/* </logInContext.Provider> */}

      <div>
        <Dropdown />
      </div>

    </div>
  );
};

export default App;
