import React from 'react';
import { useSelector } from 'react-redux';

import {
    selectCalendarDays,
} from 'components/Calendar/calendarSlice';
import Header from 'components/Calendar/Header';
import Cell from 'components/Calendar/Cell';

function CalendarTable() {
    const days = useSelector(selectCalendarDays);
    return (
        <div className='calendar-container'>
            <Header />
            <div className='calendar-table-container'>
                <div className='calendar-table'>
                    {days.map(day => (
                        <Cell key={day} date={day} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default CalendarTable;
