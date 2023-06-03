import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  const selectedDate = flatpickr('#datetime-picker').selectedDates[0];

  if (selectedDate) {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000, selectedDate);
    startBtn.disabled = true;
    updateCountdown(selectedDate);
  }
});

function updateCountdown(selectedDate) {
  const currentDate = new Date();
  const msDiff = selectedDate.getTime() - currentDate.getTime();

  if (msDiff <= 0) {
    clearInterval(countdownInterval);
    displayCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    startBtn.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(msDiff);
  displayCountdown({ days, hours, minutes, seconds });
}

function displayCountdown({ days, hours, minutes, seconds }) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}