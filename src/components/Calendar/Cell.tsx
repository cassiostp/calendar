import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import {
    selectCurrentDate,
    selectRemindersByDate,
} from 'components/Calendar/calendarSlice';
import Reminder from 'components/Reminder/Reminder';
import { showModal, setDateTime } from 'components/Reminder/reminderSlice';

interface Props {
    date: number;
}

function getClassNames(cellDate: DateTime, currentDate: DateTime) {
    let classNames = '';
    if (cellDate.month !== currentDate.month) {
        classNames += 'disabled';
    }
    if (cellDate.weekday > 5) {
        classNames += ' weekend';
    }
    if (
        cellDate.year === DateTime.now().year &&
        cellDate.month === DateTime.now().month &&
        cellDate.day === DateTime.now().day
    ) {
        classNames += ' today'
    }
    return classNames;
}

function CalendarCell({ date }: Props) {
    const dispatch = useDispatch();
    const currentDate = DateTime.fromMillis(useSelector(selectCurrentDate));
    const cellDate = DateTime.fromMillis(date);
    const reminders = useSelector(selectRemindersByDate(cellDate));

    return (
        <div
            className={getClassNames(cellDate, currentDate)}
            onClick={(event) => {
                event.stopPropagation();
                dispatch(setDateTime({ dateMillis: date }));
                dispatch(showModal({ type: 'new' }));
            }}
        >
            {cellDate.day}
            {reminders.map(reminder => (
                <Reminder
                    key={reminder.date}
                    reminder={reminder}
                />
            ))}
        </div>
    );
}

export default CalendarCell;
