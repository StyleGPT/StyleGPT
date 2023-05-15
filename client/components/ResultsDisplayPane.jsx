import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);

const ResultsDisplayPane = ({ contentHtml, contentCSS, status }) => {
  const [contentSource, setContentSource] = useState();

  useEffect(() => {
    if (contentHtml) {
      setContentSource(contentHtml);
    }
  }, [contentHtml]);

  useEffect(() => {
    console.log(status);
    const overlay = document.querySelector('#css-text-loading-overlay');
    overlay.style.display = status === 'ready' ? 'none' : 'flex';
  }, [status]);

  useEffect(() => {
    if (contentCSS) {
      //Set CSS as iFrame style
      let style = document.createElement('style');
      style.innerHTML = contentCSS;

      const frame = document.querySelector('#sample-component-frame');
      frame.contentWindow.document.querySelector('head').appendChild(style);

      //Insert into code frame and add highlightint
      const textDisplay = document.querySelector('#result-css-text');
      textDisplay.innerHtml = contentCSS;
      textDisplay.innerHTML = hljs.highlight(contentCSS, {
        language: 'css',
        ignoreIllegals: true
      }).value;
      hljs.highlightElement(textDisplay);

      //Remove loading overlay if present
      const overlay = document.querySelector('#css-text-loading-overlay');
      if (!overlay.hidden) {
        overlay.hidden = true;
      }
    }
  }, [contentCSS]);

  return (
    <div id="query-results-display">
      <div id="result-text" className="result-pane">
        <div className="result-pane-header">CSS:</div>
        <div id="css-text-loading-overlay" hidden="true">
          <img src={require('../assets/loading.gif')} />
        </div>
        <pre>
          <code className="code-block" id="result-css-text"></code>
        </pre>
      </div>
      <div id="rendered-results" className="result-pane">
        <div className="result-pane-header">Preview:</div>
        <iframe id="sample-component-frame" src={contentHtml} sandbox></iframe>
      </div>
    </div>
  );
};

export default ResultsDisplayPane;
