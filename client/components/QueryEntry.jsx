import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../App';


const QueryEntryForm = ({ onSubmit }) => {

  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const slider = document.querySelector('#temp-input');
    const sliderDisplay = document.querySelector('#temp-input-display');
    slider.oninput = function () {
      sliderDisplay.innerHTML = this.value;
    };
  }, []);

  useEffect(() => { 
    if (isLoggedIn) {
      document.querySelector('#api-key-section').style.display = 'none';
      document.querySelector('.button-row').style.marginTop = '5px'
    }
  });

  const onSubmitClick = () => {
    const query = document.querySelector('#msg').value;
    const key = document.querySelector('#api-key').value;
    const temp = document.querySelector('#temp-input').value;
    const model = document.querySelector('#model-dropdown').value;
    onSubmit(query, key, temp, model);
    document.querySelector('#msg').value = '';
  };

  return (
    <div id="query-entry-form">
      <h2>What kind of style would you like?</h2>

      {/* <input type="text" id="query" value="" /><br /> */}
      {/* do we want to set a default value? */}
      <textarea
        id="msg"
        name="user_message"
        placeholder="...like a block of cheese"
      ></textarea>
      <h3 style={{ marginBottom: '5px' }}>OpenAI Query Options</h3>
      <div id="open-ai-options">
        <div id="temp-selector">
          <h5 style={{ marginTop: '10px', marginBottom: '10px' }}>
            Temperature:
          </h5>
          <input
            id="temp-input"
            type="range"
            min={0}
            max={1}
            step={0.05}
          ></input>
          <div id="temp-input-display">1</div>
        </div>
        <div id="model-selector">
          <h5 style={{ marginTop: '10px', marginBottom: '10px' }}>Model:</h5>
          <select name="model" id="model-dropdown">
            <option value="text-davinci-003">text-davinci-003</option>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          </select>
        </div>
      </div>
      <div id="api-key-section">
        <h5 style={{ marginTop: '10px', marginBottom: '10px' }}>
          <em>Please enter your OpenAI API Key (or sign in above)</em>
        </h5>
        <input
          type="text"
          id="api-key"
          name="api-key"
          placeholder="Please enter OpenAI API Key"
          style={{ marginBottom: '5px', width: '100%' }}
        ></input>
      </div>
      <div className="button-row">
        <button type="submit" onClick={onSubmitClick}>
          Submit
        </button>
        <button type="reset">Reset</button>
      </div>
    </div>
  );
};

export default QueryEntryForm;