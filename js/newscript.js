`use strict`;

window.addEventListener(`DOMContentLoaded`, () => {

const btnStart = document.querySelector(`.watch__btn-start`),
      btnStop = document.querySelector(`.watch__btn-stop`);

      const secString = document.querySelector('.watch__text--seconds');
      const minString = document.querySelector('.watch__text--minutes');
      const hoursString = document.querySelector('.watch__text--hours');
      const millSecString = document.querySelector('.watch__text--milliseconds');

      const progressSeconds = document.querySelector('.watch__progress--seconds');
      const progressMinutes = document.querySelector('.watch__progress--minutes');
      const progressHours = document.querySelector('.watch__progress--hours');
      const progressMillSeconds = document.querySelector('.watch__progress--milliseconds');

let mSec = 0;
let sec = 0;
let min = 0;
let hours = 0;


let newDate = 0;

let startTimer;
let startProgressBar;

let active = false;

function getZero (num) {
  if (num < 10) {
      return `0${num}`;
  }
  else {
      return `${num}`;
  }
};

function getZeroMillSec (num) {
  if (num < 100) {
      return `0${num}`;
  }
  else {
      return `${num}`;
  }
};

const startTime = () => {
  if(!active) {
    active = !active;
    btnStart.textContent = `Pause`;

    const thisDate = new Date() - newDate;

    startTimer = setInterval(() => {
      newDate = new Date() - thisDate;

      mSec = Math.floor((newDate / 10) % 100);
      sec = Math.floor((newDate / 1000) % 60);
      min = Math.floor((newDate / 1000 / 60) % 60);
      hours = Math.floor((newDate / 1000 / 60 / 60) % 24);

      millSecString.textContent = getZeroMillSec(mSec);
      secString.textContent =  getZero(sec);
      minString.textContent =  getZero(min);
      hoursString.textContent = getZero(hours);
    }, 10);


    startProgressBar = setInterval(() => {

      const procentSec = (sec / 60) * 100;
      const procentMin = (min / 60) * 100;
      const procentHours = (hours / 12) * 100;
      const procentMillSec = (mSec / 100) * 100;

      let progressLineSec;
      let progressLineMin;
      let progressLineHours;
      let progressLineMillSec;


      if (window.matchMedia('(max-width: 767px)').matches) {
        progressLineSec = 4.4 * procentSec;
        progressLineMin = 3.74 * procentMin;
        progressLineHours = 3.74 * procentHours;
        progressLineMillSec = 3.74 * procentMillSec;

        progressSeconds.style.strokeDasharray = `${progressLineSec} 439.6`;
        progressMinutes.style.strokeDasharray = `${progressLineMin} 374`;
        progressHours.style.strokeDasharray = `${progressLineHours} 374`;
        progressMillSeconds.style.strokeDasharray = `${progressLineMillSec} 374`;
      }

      else if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
        progressLineSec = 5.65 * procentSec;
        progressLineMin = 4.4 * procentMin;
        progressLineHours = 4.4 * procentHours;
        progressLineMillSec = 4.4 * procentMillSec;

        progressSeconds.style.strokeDasharray = `${progressLineSec} 565.2`;
        progressMinutes.style.strokeDasharray = `${progressLineMin} 439.6`;
        progressHours.style.strokeDasharray = `${progressLineHours} 439.6`;
        progressMillSeconds.style.strokeDasharray = `${progressLineMillSec} 439.6`;

      }

      else if (window.matchMedia('(min-width: 1024px)').matches) {
        progressLineSec = 7.22 * procentSec;
        progressLineMin = 5.65 * procentMin;
        progressLineHours = 5.65 * procentHours;
        progressLineMillSec = 5.65 * procentMillSec;

        progressSeconds.style.strokeDasharray = `${progressLineSec} 722.2`;
        progressMinutes.style.strokeDasharray = `${progressLineMin} 565.2`;
        progressHours.style.strokeDasharray = `${progressLineHours} 565.2`;
        progressMillSeconds.style.strokeDasharray = `${progressLineMillSec} 565.2`;
      }

    }, 10);   // 10 == millSec ... :)
  }
  else {
    active = !active;
    btnStart.textContent = 'Start';
    clearInterval(startTimer);
    clearInterval(startProgressBar);
  }
};


const resetTime = () => {
  clearInterval(startTimer);
  clearInterval(startProgressBar);
  active = false;

  newDate = 0;

  progressSeconds.style.strokeDasharray = 'none';
  progressMinutes.style.strokeDasharray = 'none';
  progressHours.style.strokeDasharray = 'none';
  progressMillSeconds.style.strokeDasharray = 'none';

  secString.textContent = '--';
  minString.textContent = '--';
  hoursString.textContent = '--';
  millSecString.textContent = '--';

  btnStart.textContent = 'Start';
};


btnStart.addEventListener('click', startTime);
btnStop.addEventListener('click', resetTime);


});
