import React from 'react';

import Header from 'components/Calendar/Header';
import Reminder from 'components/Reminder/Reminder';

function CalendarTable() {
    return (
        <div className='calendar-container'>
            <Header />
            <div className='calendar-table-container'>

                <div className='calendar-table'>
                    <div className='weekend'>1<Reminder /><Reminder /><Reminder /><Reminder /><Reminder /></div>
                    <div className='today'>2</div>
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
