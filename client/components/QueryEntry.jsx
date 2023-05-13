import React, { useState, useEffect } from 'react';

const QueryEntryForm = () => {
    return (
        <div>
          <h2>What kind of style would you like?</h2>
          <form action="/chatgpt" method="get">
            {/* <input type="text" id="query" value="" /><br /> */}
            {/* do we want to set a default value? */}
            <textarea 
                id="msg" 
                name="user_message" 
                placeholder="Can you style this html form like a block of cheese?">
            </textarea>
            <div>
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </div>
          </form>
        </div>
    );
};

export default QueryEntryForm;