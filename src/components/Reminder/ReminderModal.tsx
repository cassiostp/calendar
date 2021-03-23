import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import {
    hideModal,
    getWeatherInfo,
    showModal,
    setCity,
    setColor,
    setDate,
    setTime,
    setTitle,
    selectModalState,
    selectReminderFromForm,
} from 'components/Reminder/reminderSlice';
import {
    deleteReminder,
    saveReminder,
} from 'components/Calendar/calendarSlice';

function ReminderModal() {
    const {
        formCity,
        formColor,
        formDate,
        formTime,
        formTitle,
        selectedReminder,
        show,
        type
    } = useSelector(selectModalState);
    const modifiedReminder = useSelector(selectReminderFromForm);
    const dispatch = useDispatch();
    let modalFooter: React.ReactNode;

    if (type === 'view') {
        modalFooter = (
            <React.Fragment>
                <Button
                    onClick={() => dispatch(showModal({
                        type: 'edit',
                        reminder: selectedReminder
                    }))}
                >
                    Edit
                </Button>
                <Button
                    variant='danger'
                    onClick={() => {
                        if (selectedReminder) {
                            dispatch(deleteReminder({
                                reminder: selectedReminder,
                            }));
                            dispatch(hideModal());
                        }
                    }}
                >
                    Delete
                </Button>
            </React.Fragment>
        );
    } else {
        modalFooter = (
            <Button
                onClick={() => {
                    dispatch(saveReminder({
                        newReminder: modifiedReminder,
                        oldReminder: selectedReminder,
                    }));
                    dispatch(hideModal());
                }}
            >
                Save
            </Button>
        );
    }

    return (
        <Modal
            show={show}
            onShow={() => type === 'view' && dispatch(getWeatherInfo(formCity))}
            onHide={() => dispatch(hideModal())}
        >
            <Modal.Header closeButton>
                <h4>{type === 'view' ? 'Reminder' : 'New/Edit'}</h4>
            </Modal.Header>
            <Modal.Body>
                <div className='form-container'>
                    <input
                        type="text"
                        id='title'
                        maxLength={30}
                        placeholder='Add a title (max 30 chars)'
                        onChange={(event) => dispatch(setTitle({ title: event.target.value }))}
                        value={formTitle}
                        readOnly={type === 'view'}
                    />
                    <div>
                        <span>City: </span>
                        <input
                            type="text"
                            id='city'
                            placeholder='Add a city'
                            onChange={(event) => dispatch(setCity({ city: event.target.value }))}
                            value={formCity}
                            readOnly={type === 'view'}
                        />
                    </div>
                    <div>
                        <span>Pick a time: </span>
                        <input
                            type='time'
                            id='time'
                            placeholder='Pick the time'
                            onChange={(event) => dispatch(setTime({ time: event.target.value }))}
                            value={formTime}
                            readOnly={type === 'view'}
                        />
                    </div>
                    <div>
                        <span>Pick a date: </span>
                        <input
                            type='date'
                            id='date'
                            placeholder='Pick the date'
                            onChange={(event) => dispatch(setDate({ date: event.target.value }))}
                            value={formDate}
                            readOnly={type === 'view'}
                        />
                    </div>
                    <div>
                        <span>Pick a color: </span>
                        <input
                            type='color'
                            onChange={(event) => dispatch(setColor({ color: event.target.value }))}
                            value={formColor}
                            disabled={type === 'view'}
                        />
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                {modalFooter}
            </Modal.Footer>
        </Modal>
    );



}

export default ReminderModal;