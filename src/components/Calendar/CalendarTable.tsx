import React from 'react';

import MonthSelector from 'components/Calendar/MonthSelector';
import CalendarHeader from 'components/Calendar/CalendarHeader';
import Reminder from 'components/Reminder/Reminder';

function CalendarTable() {
    return (
        <div className='calendar-container'>
            <div className='calendar-header-container'>
                <MonthSelector />
                <CalendarHeader />
            </div>
            <div className='calendar-table-container'>

                <div className='calendar-table'>
                    <div className='weekend'>1<Reminder /><Reminder /><Reminder /><Reminder /><Reminder /></div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div className='weekend'>7</div>

                    <div className='weekend'>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div className='weekend'>7</div>


                    <div className='weekend'>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div className='weekend'>7</div>


                    <div className='weekend'>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div className='weekend'>7</div>


                    <div className='weekend'>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div className='weekend'>7</div>

                    <div className='weekend'>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div className='disabled'>6</div>
                    <div className='weekend disabled'>7</div>
                </div>
            </div>
        </div>
    );
}

export default CalendarTable;
