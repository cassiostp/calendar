import React from 'react';
import CalendarHeader from 'components/Calendar/CalendarHeader';

function CalendarTable() {
    return (
        <table className='calendar-table'>
            <CalendarHeader />
            <tbody>
                <tr>
                    <td className='weekend'>1<div></div></td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td className='weekend'>7</td>
                </tr>
                <tr>
                    <td className='weekend'>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td className='weekend'>7</td>
                </tr>
                <tr>
                    <td className='weekend'>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td className='weekend'>7</td>
                </tr>
                <tr>
                    <td className='weekend'>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td className='weekend'>7</td>
                </tr>
                <tr>
                    <td className='weekend'>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td className='weekend'>7</td>
                </tr>
                <tr>
                    <td className='weekend'>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td className='weekend'>7</td>
                </tr>
            </tbody>
        </table>
    );
}

export default CalendarTable;
