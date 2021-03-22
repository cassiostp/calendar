import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { RootState } from 'store';
import { Reminder } from 'types';

type modalType = 'view' | 'edit' | 'new';

interface ReminderState {
    modal: {
        show: boolean;
        type: modalType;
        selectedReminder: Reminder;
    };
}

const initialState: ReminderState = {
    modal: {
        show: false,
        type: 'view',
        selectedReminder: {
            title: '',
            date: DateTime.now().toMillis(),
            city: '',
            color: '',
        }
    }
}

export const reminderSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {
        showModal: (
            state,
            action: PayloadAction<{ type: modalType, reminder?: Reminder }>
        ) => {
            state.modal = {
                show: true,
                type: action.payload.type,
                selectedReminder: action.payload.reminder ?? initialState.modal.selectedReminder,
            }
        },
        hideModal: state => {
            state.modal = initialState.modal;
        },
        setTitle: (state, action: PayloadAction<{ title: string }>) => {
            state.modal.selectedReminder.title =  action.payload.title;
        },
        setDate: (state, action: PayloadAction<{ date: number }>) => {
            state.modal.selectedReminder.date =  action.payload.date;
        },
        setColor: (state, action: PayloadAction<{ color: string }>) => {
            state.modal.selectedReminder.color =  action.payload.color;
        },
        setCity: (state, action: PayloadAction<{ city: string }>) => {
            state.modal.selectedReminder.city =  action.payload.city;
        },
    }
});

export const {
    showModal,
    hideModal,
    setCity,
    setColor,
    setDate,
    setTitle,
} = reminderSlice.actions;

export const selectModalState = (state: RootState) => state.reminder.modal;

export default reminderSlice.reducer;
