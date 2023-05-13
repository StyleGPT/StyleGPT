import React, { useState, useEffect } from 'react';

const QueryEntryForm = () => {
    return (
        <div>
          <h2>What kind of style would you like?</h2>
          <form>
            <input type="text" id="name" name="name" /><br />
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </form>
        </div>
    );
};

export default QueryEntryForm;