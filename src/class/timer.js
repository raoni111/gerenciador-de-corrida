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
  ) {
    this.timeContent = timeContent;
    this.buttonInitRace = buttonInitRace;
    this.buttonPlayTimer = buttonPlayTimer;
    this.buttonStopTimer = buttonStopTimer;
    this.buttonRestartTimer = buttonRestartTimer;
    this.formContent = formContent;
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
    this.stop();
    this.resetTime();
    this.displayTime();
  }

  resetTime() {
    this.milesecunds = 0;
    this.secunds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  initTimer() {
    this.displayTime();
    this.listenerButtonsTimer();
  }

  initRace() {
    this.visibilitButton();
    this.displayFormContent('true');
    this.play();
    this.setColorOfTimer = '#E24543';
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
    // eslint-disable-next-line no-nested-ternary
    const milesecundsString = this.milesecunds < 10 ? `00${this.milesecunds}`
      : (this.milesecunds < 100 ? `0${this.milesecunds}` : `${this.milesecunds}`);
    const secondsString = this.secunds < 10 ? `0${this.secunds}` : `${this.secunds}`;
    const minutesString = this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
    const hoursString = this.hours < 10 ? `0${this.hours}` : `${this.secunds}`;
    return `${hoursString}:${minutesString}:${secondsString}:${milesecundsString}`;
  }
}
