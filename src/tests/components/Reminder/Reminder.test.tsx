import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DateTime } from 'luxon';
import { store } from 'store';
import { state } from 'tests/exampleState';
import Reminder from 'components/Reminder/Reminder';

test('populates state correctly when clicked', () => {
    const reminder = state.calendar.reminders[0];
    const { getByText } = render(

        <Provider store={store}>
            <Reminder reminder={reminder} />
        </Provider>
    );

    getByText(/Test Reminder/i).click();
    expect(store.getState().reminder.modal.show).toBeTruthy();
    expect(store.getState().reminder.modal.formCity).toEqual(reminder.city);
    expect(store.getState().reminder.modal.formColor).toEqual(reminder.color);
    expect(store.getState().reminder.modal.formTitle).toEqual(reminder.title);
    expect(
        store.getState().reminder.modal.formDate
    ).toEqual(
        DateTime.fromMillis(reminder.date).toFormat('yyyy-MM-dd')
    );
});
