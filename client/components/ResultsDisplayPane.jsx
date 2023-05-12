import React, { useEffect, useState } from 'react';

const ResultsDisplayPane = ({ contentHtml, contentCSS }) => {
  const [contentSource, setContentSource] = useState();

  useEffect(() => {
    if (contentHtml) {
      setContentSource(contentHtml);
    }
  });

  const loadCSS = () => {
    const frame = document.querySelector('#sample-component-frame');
    let link = document.createElement('link');
    link.href = contentCSS;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    //frame.document.head.appendChild(link);
    console.log(link);
    frame.contentWindow.document.querySelector('head').appendChild(link);
  };

  return (
    <div>
      <button onClick={loadCSS}>Press me to load CSS!</button>
      <iframe id="sample-component-frame" src={contentHtml}></iframe>
    </div>
  );
};

export default ResultsDisplayPane;
