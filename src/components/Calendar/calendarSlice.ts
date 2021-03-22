import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import sortBy from 'lodash/sortBy';

import { AppThunk, RootState } from 'store';
import { Reminder } from 'types';

const DAYS_IN_CALENDAR = 42;

interface Reminders {
    [key: string]: Reminder[] | undefined;
}

interface CalendarState {
    date: number;
    reminders: Reminders;
}

const initialState: CalendarState = {
    date: DateTime.now().toMillis(),
    reminders: {
        '2021-3-22': [
            {
                title: 'Test Reminder',
                text: 'This is a initial reminder set for tests',
                date: DateTime.now().toMillis(),
                city: 'fortaleza',
                color: 'green',
            },
            {
                title: 'Test Reminder 2',
                text: 'This is a initial reminder set for tests 2',
                date: DateTime.now().minus({ hours: 1 }).toMillis(),
                city: 'aracaju',
                color: 'yellow',
            }
        ]
    },
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        increment: state => {
            state.date = DateTime.fromMillis(state.date).plus({ months: 1 }).toMillis();
        },
        decrement: state => {
            state.date = DateTime.fromMillis(state.date).minus({ months: 1 }).toMillis();
        }
    }
});

export const { increment, decrement } = calendarSlice.actions;

export const selectCurrentDate = (state: RootState) => state.calendar.date;
export const selectCalendarDays = (state: RootState) => {
    const currentDate = DateTime.fromMillis(selectCurrentDate(state));
    const calendarArray: Array<number> = [];
    const firstDay = currentDate.set({ day: 1 });
    const firstWeekday = firstDay.weekday % 7;
    const previousFirstDay = firstDay.minus({ days: firstWeekday });

    for (let index = 0; index < DAYS_IN_CALENDAR; index++) {
        calendarArray.push(previousFirstDay.plus({ days: index }).toMillis())
    }

    return calendarArray;
};
export const selectRemindersByDate = (date: DateTime) => (state: RootState) => {
    const reminders = state.calendar.reminders[`${date.year}-${date.month}-${date.day}`];
    const sortedReminders = sortBy(reminders, ['date']);
    return sortedReminders ?? [];
}

export default calendarSlice.reducer;
