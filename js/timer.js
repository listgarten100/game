class Timer {

    constructor(wrapper) {
        this.wrapper = wrapper;
    }

    _initState() {
        this.totalTimeOfGameMin = 0;
        this.totalTimeOfGameSec = 1;
    }

    renderHTML() {
        this.timerElement = document.createElement('div');
        this.timerElement.classList.add('timer');
        this.wrapper.appendChild(this.timerElement);
    }

    removeHTML() {
        const timer = this.wrapper.querySelector('.timer');
        timer.remove();
    }

    initTimer() {
        const getSecond = () => {
            if(this.totalTimeOfGameMin > 1) {
                this.stopTimer();
                alert('Sorry, you are thinking too long, try again!');
            }    
            if(this.totalTimeOfGameSec % 60 !== 0) {
                if(this.totalTimeOfGameSec <= 9) {
                    this.timerElement.innerHTML = `0${this.totalTimeOfGameMin}:0${this.totalTimeOfGameSec++}`;
                } else{
                    this.timerElement.innerHTML = `0${this.totalTimeOfGameMin}:${this.totalTimeOfGameSec++}`;
                }
            } else{
                this.totalTimeOfGameSec = 0;
                if(this.totalTimeOfGameSec <= 9) {
                    this.timerElement.innerHTML = `0${++this.totalTimeOfGameMin}:0${this.totalTimeOfGameSec++}`;
                } else{
                    this.timerElement.innerHTML = `0${++this.totalTimeOfGameMin}:${this.totalTimeOfGameSec++}`;
                }
            }
         };

        this.timer = setInterval(getSecond, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    getSumOfTime() {
        return this.totalTimeOfGameSec + (this.totalTimeOfGameMin * 60) - 1;
    }

    init() {
        this._initState();
        this.renderHTML();
        this.initTimer();
    }
}
