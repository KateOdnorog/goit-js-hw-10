const bodyGallery = (document.querySelector('body').style.backgroundColor =
  'white');

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputPicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dateDays: document.querySelector('[data-days]'),
  dateHours: document.querySelector('[data-hours]'),
  dateMinutes: document.querySelector('[data-minutes]'),
  dateSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let userSelectedDate = null;
let timeInterval;

const optionsPicker = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  position: 'below left',
  positionElement: refs.inputPicker,
  locale: {
    firstDayOfWeek: 1,
  },
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      refs.startBtn.disabled = true;
      iziToast.error({
        position: 'topRight',
        title: 'ERROR',
        message: 'The date must be in the future.',
      });
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.inputPicker, optionsPicker);

function startTimer() {
  timeInterval = setInterval(() => {
    countdownTime();
  }, 1000);
}

function stopTimer(timeInterval) {
  clearInterval(timeInterval);
  refs.dateDays.textContent = '00';
  refs.dateHours.textContent = '00';
  refs.dateMinutes.textContent = '00';
  refs.dateSeconds.textContent = '00';
  refs.startBtn.disabled = true;
  refs.inputPicker.disabled = false;
  iziToast.success({
    title: 'SUCCESS',
    message: 'Time is up!',
    position: 'topRight',
  });
  return;
}

function countdownTime() {
  const diffTime = userSelectedDate - new Date();
  refs.startBtn.disabled = true;
  refs.inputPicker.disabled = true;

  if (diffTime <= 1000) {
    stopTimer(timeInterval);
  }

  const time = convertMs(diffTime);
  refs.dateDays.textContent = addLeadingZero(time.days);
  refs.dateHours.textContent = addLeadingZero(time.hours);
  refs.dateMinutes.textContent = addLeadingZero(time.minutes);
  refs.dateSeconds.textContent = addLeadingZero(time.seconds);
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
  return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', startTimer);
