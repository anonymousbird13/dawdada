// Calendar state
let currentDate = new Date(2025, 11, 1); // December 2025
let selectedDate = new Date(2025, 11, 12); // December 12, 2025

// Format date for display
function formatDate(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

// Check if dates are the same day
function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

// Generate calendar days
function generateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Update month display
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('currentMonth').textContent = `${months[month]} ${year}`;

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = document.getElementById('calendarDays');
  calendarDays.innerHTML = '';

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'day empty';
    calendarDays.appendChild(emptyDay);
  }

  // Add days of month
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    const date = new Date(year, month, day);

    dayElement.className = 'day';
    dayElement.textContent = day;

    // Mark past dates as disabled
    if (date < today && !isSameDay(date, today)) {
      dayElement.classList.add('disabled');
    } else {
      dayElement.classList.add('available');

      // Mark selected date
      if (isSameDay(date, selectedDate)) {
        dayElement.classList.add('selected');
      }

      // Add click handler
      dayElement.addEventListener('click', () => {
        selectedDate = date;
        generateCalendar();
        updateSelectedDate();
        generateTimeSlots();
      });
    }

    calendarDays.appendChild(dayElement);
  }
}

// Update selected date display
function updateSelectedDate() {
  document.getElementById('selectedDate').innerHTML = `<strong>${formatDate(selectedDate)}</strong>`;
}

// Generate time slots
function generateTimeSlots() {
  const timeslots = document.getElementById('timeslots');
  timeslots.innerHTML = '';

  // Generate slots from 9 AM to 5 PM
  const times = [
    '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am',
    '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm',
    '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm'
  ];

  times.forEach(time => {
    const slot = document.createElement('button');
    slot.className = 'timeslot';
    slot.textContent = time;
    slot.addEventListener('click', () => {
      alert(`You selected ${formatDate(selectedDate)} at ${time}`);
    });
    timeslots.appendChild(slot);
  });
}

// Navigation handlers
document.getElementById('prevMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

// Initialize
generateCalendar();
updateSelectedDate();
generateTimeSlots();
