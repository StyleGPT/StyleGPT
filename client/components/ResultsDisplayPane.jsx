import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);

const ResultsDisplayPane = ({ contentHtml, contentCSS }) => {
  const [contentSource, setContentSource] = useState();

  useEffect(() => {
    if (contentHtml) {
      setContentSource(contentHtml);
    }
  });

  const getCSSText = () => {
    const pathParts = contentHtml.split('/');
    const cssPath = pathParts
      .slice(0, pathParts.length - 1)
      .join('/')
      .concat('/' + contentCSS);

    console.log(cssPath);
    fetch(cssPath)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        const textDisplay = document.querySelector('#result-css-text');
        textDisplay.innerHtml = text;
        textDisplay.innerHTML = hljs.highlight(text, {
          language: 'css',
          ignoreIllegals: true
        }).value;
        hljs.highlightElement(textDisplay);
      });
  };

  const loadCSS = () => {
    const frame = document.querySelector('#sample-component-frame');
    let link = document.createElement('link');
    link.href = contentCSS;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    //frame.document.head.appendChild(link);
    console.log(link);
    frame.contentWindow.document.querySelector('head').appendChild(link);
    console.log(getCSSText());
    //console.log(hljs.highlightElement);
  };

  return (
    <div id="query-results-display">
      <div id="result-text" className="result-pane">
        <pre>
          <code className="code-block" id="result-css-text"></code>
        </pre>
      </div>
      <div id="rendered-results" className="result-pane">
        <iframe id="sample-component-frame" src={contentHtml} sandbox></iframe>
        <button onClick={loadCSS}>Press me to load CSS!</button>
      </div>
    </div>
  );
};

export default ResultsDisplayPane;
