import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { AppThunk, RootState } from 'store';
import { Reminder } from 'types';
import { key } from 'api.json';

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
    weatherInfo?: object;
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
            const { reminder, type } = action.payload;
            
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
                type: type,
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
        },
        setWeather: (state, action: PayloadAction<{ weatherInfo: object }>) => {
            console.log('calling setWeather action');
            // TODO: figure out why api is rejected
            state.weatherInfo = action.payload.weatherInfo;
        },
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
    setWeather,
} = reminderSlice.actions;

export const getWeatherInfo = (city: string): AppThunk => dispatch => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`).then(
        response => response.json().then(
            value => {
                console.log(value);
                dispatch(setWeather({ weatherInfo: value }));
            }
        ).catch(e => {
            console.log('something went wrong with the request');
        })
    )
};

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
