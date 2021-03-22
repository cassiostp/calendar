import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Reminder as IReminder } from 'types';

interface Props {
    reminder: IReminder; 
}

function onClick() {
    console.log('clicked reminder');
}

function Reminder({ reminder }: Props) {
    return (
        <Button onClick={onClick} size='sm' variant='success'>
                <span>{reminder.title}</span>
        </Button>
    );
}

export default Reminder;
