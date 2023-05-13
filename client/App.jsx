import React, { useState, useEffect } from 'react';
import './styles.scss';
import ResultsDisplayPane from './components/ResultsDisplayPane';
import './hljs-tokyo-night-dark-custom.css';
import QueryEntryForm from './components/QueryEntry';

const App = () => {
  const [reqStatus, setReqStatus] = useState('ready');
  const [contentCss, setContentCss] = useState(null);

  const handleQuery = (queryText) => {
    if (reqStatus !== 'ready') {
      return window.alert('Please wait for the current request to complete.');
    }
    setReqStatus('waiting');
    return fetch(`/chatgpt`, {
      method: 'POST',
      body: queryText,
      headers: { 'Content-type': 'text/plain' }
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
    </div>
  );
};

export default App;
