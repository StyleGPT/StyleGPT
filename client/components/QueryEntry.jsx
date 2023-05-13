import React, { useState, useEffect } from 'react';

const QueryEntryForm = ({ onSubmit }) => {
  const onSubmitClick = () => {
    const query = document.querySelector('#msg').value;
    onSubmit(query);
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
        placeholder="Can you style this html form like a block of cheese?"
      ></textarea>
      <div>
        <button type="submit" onClick={onSubmitClick}>
          Submit
        </button>
        <button type="reset">Reset</button>
      </div>
    </div>
  );
};

export default QueryEntryForm;
