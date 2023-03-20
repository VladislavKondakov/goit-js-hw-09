import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate = null;
let timerId = null;


const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};
refs.startBtn.disabled = true;

const optionsNotiflix = {
  timeout: 2000,
  clickToClose: true,
  position: 'center-top',
};

const optionsflatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate < Date.now()) {
      Notify.failure('Виберіть дату більшу від сьогоднішньої', optionsNotiflix);
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.inputEl, optionsflatpickr); 


refs.startBtn.addEventListener('click', handleStartTimer);

function handleStartTimer() {
  timerId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;
    const time = convertMs(deltaTime);
    refs.daysEl.textContent = time.days;
    refs.hoursEl.textContent = time.hours;
    refs.minutesEl.textContent = time.minutes;
    refs.secondsEl.textContent = time.seconds;
    if (selectedDate <= currentDate) {
      return;
    }
  }, 1000);
}


function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = addLeadingZero(Math.floor(ms / day));
  
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}