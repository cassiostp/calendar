import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import {
    hideModal,
    showModal,
    setCity,
    setColor,
    setDate,
    setTitle,
    selectModalState,
} from 'components/Reminder/reminderSlice';

function ReminderModal() {
    const {
        selectedReminder,
        show,
        type
    } = useSelector(selectModalState);
    const dispatch = useDispatch();
    console.log(selectedReminder);

    if (type === 'view') {
        return (
            <Modal
                show={show}
                onHide={() => dispatch(hideModal())}
            >
                <Modal.Header closeButton>
                    <h4>Reminder</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedReminder.title}</p>
                    <p>{selectedReminder.city}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            dispatch(showModal({
                                type: 'edit',
                                reminder: selectedReminder
                            }))
                        }}
                    >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                dispatch(hideModal());
            }}
        >
            <Modal.Header closeButton>
                <h4>New/Edit</h4>
            </Modal.Header>
            <Modal.Body>
                <div className='form-container'>
                    <input
                        type="text"
                        id='title'
                        maxLength={30}
                        placeholder='Add a title (max 30 chars)'
                        onChange={(event) => dispatch(setTitle({ title: event.target.value }))}
                        value={selectedReminder.title}
                    />
                    <input
                        type="text"
                        id='city'
                        placeholder='Add a city'
                        onChange={(event) => dispatch(setCity({ city: event.target.value }))}
                        value={selectedReminder.city}
                    />
                    <div>
                        <span>Pick a time: </span>
                        <input
                            type='time'
                            id='time'
                            placeholder='Pick the time'
                            onChange={(event) => dispatch(setDate({
                                date: DateTime.fromFormat(event.target.value, 'hh:mm').toMillis()
                            }))}
                            value={DateTime.fromMillis(selectedReminder.date).toFormat('hh:mm')}
                        />
                    </div>
                    <div>
                        <span>Pick a color: </span>
                        <input
                            type='color'
                            onChange={(event) => dispatch(setColor({ color: event.target.value }))}
                            value={selectedReminder.color}
                        />
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );



}

export default ReminderModal;