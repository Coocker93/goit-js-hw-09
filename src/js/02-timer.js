import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnEl = document.querySelector('button[data-start]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const datetimePicker = document.querySelector('#datetime-picker');

let timerId;

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userDate = selectedDates[0].getTime();
        const currentDate = new Date().getTime();
        if (userDate < currentDate) {
            Notiflix.Notify.info("Please choose a date in the future");
            btnEl.disabled = true;
        } else {
            btnEl.disabled = false;
        }
    },
});

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

function updateDateTime() {
    const selectedDate = new Date(datetimePicker.value).getTime();
    const currentDate = new Date().getTime();
    const difference = selectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(difference);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (difference <= 0) {
        clearInterval(timerId);
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        datetimePicker.disabled = false;
        return;
    }
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function onBtnClick() {
    btnEl.disabled = true;
    datetimePicker.disabled = true;
    timerId = setInterval(updateDateTime, 1000);
    updateDateTime();
}

btnEl.addEventListener('click', onBtnClick);
