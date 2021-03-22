import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store';
import { DateTime } from 'luxon';

const DAYS_IN_CALENDAR = 42;

interface Reminders {
    [key: string]: [
        {
            title: string,
            text: string,
            date: number,
            city: string,
            color: string,
        }
    ]
}

interface CalendarState {
    date: number;
    reminders: Reminders;
}

const initialState: CalendarState = {
    date: DateTime.now().toMillis(),
    reminders: {
        'year-month-day': [
            {
                title: 'test',
                text: 'test text',
                date: 123400000,
                city: 'fortaleza',
                color: 'green',
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
    
    for(let index = 0; index < DAYS_IN_CALENDAR; index++) {
        calendarArray.push(previousFirstDay.plus({ days: index }).toMillis())
    }

    return calendarArray;
};
export const selectRemindersByDate = (date: DateTime) => (state: RootState) => {
    console.log(date.year, date.month, date.day);
    const reminders = state.calendar.reminders[`${date.year}-${date.month}-${date.day}`];
    return reminders ?? [];
}

export default calendarSlice.reducer;
