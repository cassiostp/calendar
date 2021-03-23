import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { RootState } from 'store';
import { Reminder } from 'types';

type modalType = 'view' | 'edit' | 'new';

interface ReminderState {
    modal: {
        show: boolean;
        type: modalType;
        formTitle: string;
        formDate: string;
        formTime: string;
        formCity: string;
        formColor: string;
        selectedReminder?: Reminder;
    };
}

const initialState: ReminderState = {
    modal: {
        show: false,
        type: 'view',
        formTitle: '',
        formDate: '',
        formTime: '',
        formCity: '',
        formColor: '#0b8043',
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
            const { reminder } = action.payload;
            if (reminder) {
                state.modal.selectedReminder = reminder;
                state.modal.formTitle = reminder.title;
                state.modal.formColor = reminder.color;
                state.modal.formCity = reminder.city;
                state.modal.formDate = DateTime.fromMillis(reminder.date).toFormat('yyyy-MM-dd');
                state.modal.formTime = DateTime.fromMillis(reminder.date).toFormat('hh:mm');
            }
            state.modal = {
                ...state.modal,
                show: true,
                type: action.payload.type,
            }
        },
        hideModal: state => {
            state.modal = { ...initialState.modal, type: state.modal.type };
        },
        setTitle: (state, action: PayloadAction<{ title: string }>) => {
            state.modal.formTitle = action.payload.title;
        },
        setDate: (state, action: PayloadAction<{ date: string }>) => {
            state.modal.formDate = action.payload.date;
        },
        setTime: (state, action: PayloadAction<{ time: string }>) => {
            state.modal.formTime = action.payload.time;
        },
        setColor: (state, action: PayloadAction<{ color: string }>) => {
            state.modal.formColor = action.payload.color;
        },
        setCity: (state, action: PayloadAction<{ city: string }>) => {
            state.modal.formCity = action.payload.city;
        },
        setDateTime: (state, action: PayloadAction<{ dateMillis: number }>) => {
            const { dateMillis } = action.payload;
            state.modal.formDate = DateTime.fromMillis(dateMillis).toFormat('yyyy-MM-dd');
            state.modal.formTime = DateTime.fromMillis(dateMillis).toFormat('hh:mm');
        }
    }
});

export const {
    showModal,
    hideModal,
    setCity,
    setColor,
    setDate,
    setTime,
    setDateTime,
    setTitle,
} = reminderSlice.actions;

export const selectModalState = (state: RootState) => state.reminder.modal;
export const selectReminderFromForm = (state: RootState): Reminder => {
    const {
        formCity,
        formColor,
        formDate,
        formTime,
        formTitle,
    } = state.reminder.modal;

    return ({
        city: formCity,
        color: formColor,
        date: DateTime.fromFormat(`${formDate} ${formTime}`, 'yyyy-MM-dd hh:mm').toMillis(),
        title: formTitle || 'Default reminder',
    })
};

export default reminderSlice.reducer;
