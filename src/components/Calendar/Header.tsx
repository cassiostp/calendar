import React from 'react';
import Button from 'react-bootstrap/Button';

import {
    decrement,
    increment,
    selectCurrentDate,
} from 'components/Calendar/calendarSlice';
import { useDispatch, useSelector } from 'react-redux';

function CalendarHeader() {
    const date = useSelector(selectCurrentDate);
    const dispatch = useDispatch();

    return (
        <div className='calendar-header-container'>
            <div className='month-selector'>
                <Button
                    onClick={() => dispatch(decrement())}
                >
                    Previous Month
                </Button>
                <h4>{date.toLocaleString({
                    month: 'long',
                    year: 'numeric',
                })}</h4>
                <Button
                    onClick={() => dispatch(increment())}
                >
                    Next Month
                </Button>
            </div>
            <div className='calendar-header'>
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
        </div>
    );
}

export default CalendarHeader;
