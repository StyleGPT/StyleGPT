import React from 'react';
import AsyncSelect from 'react-select/async';

const StoredResponse = () => {
    // sample options. want to link to database 
    const options = [
        { value: "cheese", label: "Cheese" },
        { value: "rainbow", label: "Rainbow" },
        { value: "party", label: "Party" },
    ];

    // only load values that match what user types
    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
            const filteredOptions = options.filter(option => 
                option.label.toLowerCase().includes(searchValue.toLowerCase())
            );
            callback(filteredOptions);
        }, 0);
    };

    return (
        <main>
            <h1>Choose from past queries</h1>
            <AsyncSelect 
                loadOptions={loadOptions} 
                // will load all options if no search value is entered
                defaultOptions
            />
            
        </main>
    );
};

export default StoredResponse;