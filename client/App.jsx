import React from 'react';
import './styles.scss';
import ResultsDisplayPane from './components/ResultsDisplayPane';
import './hljs-tokyo-night-dark-custom.css';
import QueryEntryForm from './components/QueryEntry';

const App = () => {
  return (
    <div id="main-app-div">
      <h1>Test Header</h1>
      <div>
        <QueryEntryForm />
        </div>
      <div>
        <ResultsDisplayPane
          contentHtml={'./components/iframe_assets/sample_component.html'}
          contentCSS={'initial_style.css'}
        />
      </div>
    </div>
  );
};

export default App;
