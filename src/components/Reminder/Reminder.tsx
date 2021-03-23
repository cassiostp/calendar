import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

import { Reminder as IReminder } from 'types';
import { showModal } from 'components/Reminder/reminderSlice';

interface Props {
    reminder: IReminder;
}

function Reminder({ reminder }: Props) {
    const dispatch = useDispatch();
    return (
        <Button
            onClick={(event) => {
                event.stopPropagation();
                dispatch(showModal({ type: 'view',  reminder }));
            }}
            size='sm'
            variant='success'
            style={{
                backgroundColor: reminder.color,
                borderColor: reminder.color,
            }}
        >
            <span>{reminder.title}</span>
        </Button>
    );
}

export default Reminder;
