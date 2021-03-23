import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from 'components/Calendar/calendarSlice';
import reminderReducer from 'components/Reminder/reminderSlice';

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        reminder: reminderReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;