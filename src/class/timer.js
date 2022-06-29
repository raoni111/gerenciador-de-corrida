/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
export default class Timer {
  milesecunds = 0;

  secunds = 0;

  minutes = 0;

  hours = 0;

  intervalId;

  timerIsPlay = false;

  constructor(
    timeContent,
    buttonInitRace,
    buttonPlayTimer,
    buttonStopTimer,
    buttonRestartTimer,
    formContent,
    ElectronAPIManager,
    indexRace,
  ) {
    this.timeContent = timeContent;
    this.buttonInitRace = buttonInitRace;
    this.buttonPlayTimer = buttonPlayTimer;
    this.buttonStopTimer = buttonStopTimer;
    this.buttonRestartTimer = buttonRestartTimer;
    this.formContent = formContent;
    this.ElectronAPIManager = ElectronAPIManager;
    this.indexRace = indexRace;
  }

  play() {
    if (this.timerIsPlay) return;

    this.timerIsPlay = true;
    this.intervalId = setInterval(() => {
      this.milesecunds += 10;
      if (this.milesecunds + 10 === 1000) {
        this.milesecunds = 0;
        this.secunds += 1;
      }
      if (this.secunds === 60) {
        this.secunds = 0;
        this.minutes += 1;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours += 1;
      }
      this.displayTime();
      this.saveTime();
    }, 10);
    this.displayFormContent('true');
  }

  stop() {
    clearInterval(this.intervalId);
    this.displayTime();
    this.timerIsPlay = false;
    this.setColorOfTimer = '#fff';
    this.displayFormContent('false');
  }

  restart() {
    this.resetTimeOfRace();
    this.displayTime();
    this.stop();
  }

  resetTimeOfRace() {
    this.milesecunds = 0;
    this.secunds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.resetTime();
  }

  initTimer() {
    this.displayTime();
    this.listenerButtonsTimer();
    this.returnTime();
  }

  initRace() {
    this.visibilitButton();
    this.displayFormContent('true');
    this.play();
    this.setColorOfTimer = '#E24543';
  }

  saveTime() {
    const time = [
      this.milesecunds,
      this.secunds,
      this.minutes,
      this.hours,
    ];

    this.ElectronAPIManager.saveTimeOfRace(this.indexRace, time).then((time) => {
      this.setTime(time);
    });
    this.displayTime();
  }

  resetTime() {
    this.ElectronAPIManager.resetTimeOfRace(this.indexRace);
  }

  returnTime() {
    this.ElectronAPIManager.returnTimeOfRace(this.indexRace).then((time) => {
      this.setTime(time);
    });
  }

  setTime(time) {
    if (!time || time.length === 0) return;
    this.milesecunds = time[0];
    this.secunds = time[1];
    this.minutes = time[2];
    this.hours = time[3];
    this.displayTime();
  }

  set setColorOfTimer(color) {
    this.timeContent.style.color = color;
  }

  visibilitButton() {
    this.buttonInitRace.setAttribute('display', 'false');
    this.buttonPlayTimer.setAttribute('display', 'true');
    this.buttonStopTimer.setAttribute('display', 'true');
    this.buttonRestartTimer.setAttribute('display', 'true');
  }

  displayFormContent(boolean) {
    this.formContent.setAttribute('display', `${boolean}`);
  }

  listenerButtonsTimer() {
    this.buttonInitRace.addEventListener('click', () => {
      this.initRace();
    });
    this.buttonStopTimer.addEventListener('click', () => {
      this.stop();
    });
    this.buttonPlayTimer.addEventListener('click', () => {
      this.play();
      this.setColorOfTimer = '#E24543';
    });
    this.buttonRestartTimer.addEventListener('click', () => {
      this.restart();
    });
  }

  displayTime() {
    this.timeContent.textContent = this.time;
  }

  get time() {
    const milesecundsString = this.milesecunds < 10 ? `00${this.milesecunds}`
      : (this.milesecunds < 100 ? `0${this.milesecunds}` : `${this.milesecunds}`);
    const secondsString = this.secunds < 10 ? `0${this.secunds}` : `${this.secunds}`;
    const minutesString = this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
    const hoursString = this.hours < 10 ? `0${this.hours}` : `${this.secunds}`;
    return `${hoursString}:${minutesString}:${secondsString}:${milesecundsString}`;
  }
}
