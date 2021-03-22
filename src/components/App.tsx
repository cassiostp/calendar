import React from 'react';
import CalendarTable from 'components/Calendar/CalendarTable';
import ReminderModal from 'components/Reminder/ReminderModal';

function App() {
  return (
    <div className="App">
      <ReminderModal />
      <CalendarTable />
    </div>
  );
}

export default App;
