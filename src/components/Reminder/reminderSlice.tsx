import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { Reminder } from 'types';

type modalType = 'view' | 'edit' | 'new';

interface ReminderState {
    modal: {
        show: boolean;
        type: modalType;
        selectedReminder?: Reminder;
    };
}

const initialState: ReminderState = {
    modal: {
        show: false,
        type: 'view',
    }
}

export const reminderSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {
        showModal: (
            state,
            action: PayloadAction<{ type: modalType, reminder: Reminder }>
        ) => {
            state.modal = {
                show: true,
                type: action.payload.type,
                selectedReminder: action.payload.reminder,
            }
        },
        hideModal: state => {
            state.modal = { show: false, type: 'view' };
        },
    }
});

export const { showModal, hideModal } = reminderSlice.actions;

export const selectModalState = (state: RootState) => state.reminder.modal;

export default reminderSlice.reducer;
