/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
export default class Timer {
  intervalId;

  stateOfRace;

  milesecunds = 0;

  secunds = 0;

  minutes = 0;

  hours = 0;

  timerIsPlay = false;

  constructor(
    tablePodioManger,
    timeContent,
    buttonInitRace,
    buttonPlayTimer,
    buttonStopTimer,
    buttonRestartTimer,
    printButton,
    finishButton,
    resetButton,
    searchByCategoryContainer,
    navContainer,
    formContent,
    ElectronAPIManager,
    indexRace,
  ) {
    this.tablePodioManger = tablePodioManger;
    this.timeContent = timeContent;
    this.buttonInitRace = buttonInitRace;
    this.buttonPlayTimer = buttonPlayTimer;
    this.buttonStopTimer = buttonStopTimer;
    this.buttonRestartTimer = buttonRestartTimer;
    this.printButton = printButton;
    this.finishButton = finishButton;
    this.resetButton = resetButton;
    this.searchByCategoryContainer = searchByCategoryContainer;
    this.navContainer = navContainer;
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
    this.resetTime();
    this.displayTime();
    this.stop();
  }

  resetTimeOfRace() {
    this.milesecunds = 0;
    this.secunds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  initTimer() {
    this.displayTime();
    this.listenerButtonsTimer();
    this.returnTime();
    this.returnStateOfRace();
  }

  initRace() {
    this.verifyStateOfRace();
    this.displayFormContent('true');
    this.play();
    this.setColorOfTimer = '#E24543';
  }

  returnStateOfRace() {
    this.ElectronAPIManager.returnStateOfRace(this.indexRace).then((state) => {
      this.stateOfRace = state;
      this.verifyStateOfRace();
    });
  }

  verifyStateOfRace() {
    if (this.stateOfRace === 'running') {
      this.runningVisibilitButton();
    }
    if (this.stateOfRace === 'finish') {
      this.finishRaceVisibilitButton();
    }

    if (this.stateOfRace === 'reseted') {
      this.reseteRaceVisibilitButton();
    }
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

  visibilitResete() {
    this.buttonInitRace.setAttribute('display', 'false');
    this.resetButton.setAttribute('display', 'false');
    this.buttonPlayTimer.setAttribute('display', 'false');
    this.buttonRestartTimer.setAttribute('display', 'false');
    this.buttonStopTimer.setAttribute('display', 'false');
    this.finishButton.setAttribute('display', 'false');
    this.printButton.setAttribute('display', 'false');
    this.navContainer.setAttribute('display', 'false');
    this.formContent.setAttribute('display', 'false');
    this.searchByCategoryContainer.setAttribute('display', 'false');
  }

  runningVisibilitButton() {
    this.visibilitResete();
    this.buttonPlayTimer.setAttribute('display', 'true');
    this.buttonStopTimer.setAttribute('display', 'true');
    this.buttonRestartTimer.setAttribute('display', 'true');
    this.resetButton.setAttribute('display', 'true');
    this.finishButton.setAttribute('display', 'true');
    this.searchByCategoryContainer.setAttribute('display', 'false');
    this.navContainer.setAttribute('display', 'true');
    this.formContent.setAttribute('display', 'true');
  }

  finishRaceVisibilitButton() {
    this.visibilitResete();
    this.printButton.setAttribute('display', 'true');
    this.resetButton.setAttribute('display', 'true');
    this.stop();
    this.searchByCategoryContainer.setAttribute('display', 'true');
    this.navContainer.setAttribute('display', 'true');
  }

  reseteRaceVisibilitButton() {
    this.visibilitResete();
    this.buttonInitRace.setAttribute('display', 'true');
    this.navContainer.setAttribute('display', 'false');
    this.searchByCategoryContainer.setAttribute('display', 'false');
    this.resetTimeOfRace();
    this.stop();
  }

  displayFormContent(boolean) {
    this.formContent.setAttribute('display', `${boolean}`);
    this.navContainer.setAttribute('display', `${boolean}`);
  }

  listenerButtonsTimer() {
    this.buttonInitRace.addEventListener('click', () => {
      this.initRace();
      this.runningVisibilitButton();
      this.ElectronAPIManager.setStateOfRace(this.indexRace, 'running');
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
    this.finishButton.addEventListener('click', () => {
      this.finishRaceVisibilitButton();
      this.ElectronAPIManager.setStateOfRace(this.indexRace, 'finish');
    });
    this.resetButton.addEventListener('click', () => {
      this.reseteRaceVisibilitButton();
      this.ElectronAPIManager.setStateOfRace(this.indexRace, 'reseted');
      this.tablePodioManger.initTablePodioManager(this.indexRace);
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
