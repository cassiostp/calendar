import React from 'react';
import Button from 'react-bootstrap/Button';

function MonthSelector() {
    return (
        <div className='month-selector'>
            <Button>Previous</Button>
            <h4>Current month and year</h4>
            <Button>Next</Button>
        </div>
    );
}

export default MonthSelector;
