import React from 'react';
import './styles.css';
import ResultsDisplayPane from './components/ResultsDisplayPane';
//import 'highlight.js/styles/github.css';

const App = () => {
  return (
    <div id="main-app-div">
      <h1>Test Header</h1>
      <div>User entry and search goes here</div>
      <div>
        Results and rendering pane can go here
        <ResultsDisplayPane
          contentHtml={'./components/iframe_assets/sample_component.html'}
          contentCSS={'initial_style.css'}
        />
      </div>
    </div>
  );
};

export default App;
