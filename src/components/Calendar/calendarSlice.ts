import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store';
import { DateTime } from 'luxon';

interface CalendarState {
    date: DateTime;
}

const initialState: CalendarState = {
    date: DateTime.now(),
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        increment: state => {
            state.date = state.date.plus({ month: 1 });
        },
        decrement: state => {
            state.date = state.date.minus({ month: 1 });
        }
    }
});

export const { increment, decrement } = calendarSlice.actions;

export const selectCurrentDate = (state: RootState) => state.calendar.date;

export default calendarSlice.reducer;
