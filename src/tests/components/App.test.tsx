import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store';
import App from 'components/App';

test('renders app', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Previous Month/i)).toBeInTheDocument();
  expect(getByText(/Next Month/i)).toBeInTheDocument();
});

test('creates new reminder', () => {
  const { getByText, getByPlaceholderText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(store.getState().calendar.reminders).toHaveLength(0);

  getByText(/22/i).click();
  fireEvent.change(
    getByPlaceholderText(/Add a title/i), { target: { value: 'Test reminder' } }
  );
  fireEvent.change(
    getByPlaceholderText(/Add a city/i), { target: { value: 'City for tests' } }
  );
  fireEvent.change(
    getByPlaceholderText(/Pick the time/i), { target: { value: '09:45' } }
  );
  fireEvent.change(
    getByPlaceholderText(/Pick the date/i), { target: { value: '2021-03-22' } }
  );
  getByText(/Save/i).click();

  expect(store.getState().calendar.reminders).toHaveLength(1);
});

test('edits reminder', () => {
  const { getByText, getByPlaceholderText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(store.getState().calendar.reminders).toHaveLength(1);

  getByText(/Test Reminder/i).click();
  getByText(/Edit/i).click();
  fireEvent.change(
    getByPlaceholderText(/Add a title/i), { target: { value: 'New Title for Reminder' } }
  );
  getByText(/Save/i).click();

  expect(store.getState().calendar.reminders).toHaveLength(1);
  expect(store.getState().calendar.reminders[0].title).toEqual('New Title for Reminder');
});

test('deletes reminder', () => {
  const { getByText, getByPlaceholderText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(store.getState().calendar.reminders).toHaveLength(1);

  getByText(/New Title for Reminder/i).click();
  getByText(/Delete/i).click();

  expect(store.getState().calendar.reminders).toHaveLength(0);
});
