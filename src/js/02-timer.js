import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
let timerDays = document.querySelector('[data-days]');
let timerHours = document.querySelector('[data-hours]');
let timerMinutes = document.querySelector('[data-minutes]');
let timerSeconds = document.querySelector('[data-seconds]');
const datePick = document.querySelector('#datetime-picker');
let countDown = '';

startBtn.disabled = true

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] > new Date()){
            startBtn.disabled = false;
        } else {Notify.warning("Please choose a date in the future");}
        
    },
};
const pickedDate = flatpickr(datePick, options);

startBtn.addEventListener('click', onStartBtn)

datePick.addEventListener('input', onPickDate)

function onStartBtn (){
    startBtn.disabled = true;
    const finalTime  = (pickedDate.selectedDates[0]).getTime();

    countDown  = setInterval(() => {
        const currentTime = Date.now()
        const ms = finalTime - currentTime;
        updateCountDown(ms);
        
    }, 1000)
    
}

function onPickDate (){
    const getDate = localStorage.getItem("timeComponents") || "";
    if (getDate){
        clearInterval(countDown);
    }
}

    function updateCountDown (ms) {
        const timeComponents = convertMs(ms);
        timerDays.innerHTML = addLeadingZero(timeComponents.days);
        timerHours.innerHTML = addLeadingZero(timeComponents.hours);
        timerMinutes.innerHTML = addLeadingZero(timeComponents.minutes);
        timerSeconds.innerHTML = addLeadingZero(timeComponents.seconds);
        localStorage.setItem("timeComponents", JSON.stringify(timeComponents))
    }
    function addLeadingZero(value) {
        return String(value).padStart(2, 0)
    }
    function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return { days, hours, minutes, seconds };
      }

