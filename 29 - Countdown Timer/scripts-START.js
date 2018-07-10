/*
Assume current time is 11:00.

Case 1
    input: 
        60 seconds
    output:
        frame 1:
            Remaining time: 1:00 (changed every second)
            Be Back At: 11:01 (fixed)
        frame 2:
            Remaining time: 0:59 (changed every second)
            Be Back At: 11:01 (fixed)
Case 2
    input: 
        300 seconds
    output:
        frame 1:
            Remaining time: 5:00 (changed every second)
            Be Back At: 11:05 (fixed)
        frame 2:
            Remaining time: 4:59 (changed every second)
            Be Back At: 11:05 (fixed)

*/
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {

        remainingSeconds = Math.round((then - Date.now()) / 1000);
        if (remainingSeconds < 0) {
            clearInterval(countdown);
            return;

        }
        displayTimeLeft(remainingSeconds);

    }, 1000);
}


function toInteger(number) {
    return parseInt(number);
}

function displayTimeLeft(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const formattedS = s < 10 ? `0${s}` : s;
    const display = `${m}:${formattedS}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(seconds) {
    const end = new Date(seconds);
    const h = end.getHours();
    const m = end.getMinutes();
    const formattedH = h > 12 ? h - 12 : h;
    const formattedM = m < 10 ? `0${m}` : m;
    const unit = h > 12 ? 'PM' : 'AM';

    const display = `Be back at ${formattedH}:${formattedM} ${unit}`;
    endTime.textContent = display;
}

buttons.forEach(el => {
    el.addEventListener('click', function () {
        timer(toInteger(this.dataset.time));
    });
})

document.forms['customForm'].addEventListener('submit', function(e) {
    e.preventDefault();
    timer(toInteger(this.minutes.value) * 60);
    this.reset();
});
