import React, { useState, useEffect } from 'react';

const QueryEntryForm = ({ onSubmit }) => {
  const onSubmitClick = () => {
    const query = document.querySelector('#msg').value;
    const key = document.querySelector('#api-key').value;
    onSubmit(query, key);
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
      <h5>
        <emph>Please enter your OpenAI API Key (or sign in above)</emph>
      </h5>
      <textarea
        id="api-key"
        name="api-key"
        placeholder="Please enter OpenAI API Key"
      ></textarea>
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
