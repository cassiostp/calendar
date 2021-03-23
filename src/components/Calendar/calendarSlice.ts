import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import sortBy from 'lodash/sortBy';

import { AppThunk, RootState } from 'store';
import { Reminder } from 'types';

const DAYS_IN_CALENDAR = 42;

interface CalendarState {
    date: number;
    reminders: Reminder[];
}

const initialState: CalendarState = {
    date: DateTime.now().toMillis(),
    reminders: [],
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
        },
        saveReminder: (
            state,
            action: PayloadAction<{ newReminder: Reminder, oldReminder?: Reminder }>
        ) => {
            const { newReminder, oldReminder } = action.payload;
            let { reminders } = state;
            const index = reminders.findIndex(reminder => reminder.date === newReminder.date);
            if (oldReminder) {
                reminders = reminders.filter(
                    filterReminder => filterReminder.date !== oldReminder.date
                );

            }
            if (index >= 0) {
                reminders[index] = newReminder;
            } else {
                reminders.push(newReminder);
            }
            state.reminders = reminders;
        },
        deleteReminder: (state, action: PayloadAction<{ reminder: Reminder }>) => {
            const { reminder } = action.payload;
            state.reminders = state.reminders.filter(
                filterReminder => filterReminder.date !== reminder.date
            );
        }
    }
});

export const {
    increment,
    decrement,
    saveReminder,
    deleteReminder
} = calendarSlice.actions;

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
    const { reminders } = state.calendar;
    const filteredReminders = reminders.filter(reminder =>
        date.toFormat('yyyy-MM-dd') === DateTime.fromMillis(reminder.date).toFormat('yyyy-MM-dd'));
    const sortedReminders = sortBy(filteredReminders, ['date']);
    return sortedReminders;
}

export default calendarSlice.reducer;
