import React from 'react';
import Reminder from 'components/Reminder/Reminder';

function ReminderContainer() {
    return (
        <div className='reminder-container'>
            {/* Many reminders */}
            <Reminder />
            <Reminder />
            <Reminder />
        </div>
    );
}

export default ReminderContainer;
