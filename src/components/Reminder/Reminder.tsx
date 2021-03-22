import React from 'react';
import Button from 'react-bootstrap/Button';

interface Props {
    title?: string; 
    onClick?: () => void;
}

function Reminder({ title, onClick }: Props) {
    return (
        <Button onClick={onClick} size='sm' variant='success'>
                <span>{title}</span>
        </Button>
    );
}

export default Reminder;
