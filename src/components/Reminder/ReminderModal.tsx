import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal, selectModalState } from 'components/Reminder/reminderSlice';

function ReminderModal() {
    const modalState = useSelector(selectModalState);
    const { selectedReminder } = modalState;
    const dispatch = useDispatch();
    return (
        <Modal
            show={modalState.show}
            onHide={() => dispatch(hideModal())}
        >
            <Modal.Header closeButton>
                {selectedReminder?.title}
            </Modal.Header>
        </Modal>
    );
}

export default ReminderModal;