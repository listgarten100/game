class Match {

    constructor(wrapper, arrOfCards, bgOfCards, name, level) {
        this.wrapper = wrapper;
        this.arrOfCards = arrOfCards;
        this.bgOfCards = bgOfCards;
        this.name = name;
        this.level = level;
        this.timer = new Timer(this.wrapper);
    }

    _initData() {
        this.countOfCards = this.arrOfCards.length;
        this.rating = new Rating(this.wrapper, this.countOfLeftCards, this.name, this.level);
        this.cards = new Cards(this.wrapper, this.arrOfCards, this.bgOfCards, this.timer, this.rating, this.name, this.level);
        this.option = new ChooseOption(this.wrapper);
        this.btnRestart = new Button(this.wrapper, 'btn-restart', 'restart');
        this.btnBack = new Button(this.wrapper, 'btn-back', 'Back to main');
    }

    _initModules() {
        this.btnRestart._handleListenerBtn = () => {
            const congrat = this.wrapper.querySelector('.congrat');
            if(congrat) congrat.remove();
            this.restartGame();
        };

        this.btnBack._handleListenerBtn = () => {
            this.wrapper.innerHTML = '';
            this.option.init();
        };
    }


    startGame() {
        this._initData();
        this._initModules();
        this.timer.init();
        this.cards.init();
        this.rating.init();
        this.btnBack.init();
        this.btnRestart.init();
    }

    restartGame() {
        this._initData();
        this._initModules();
        this.timer.stopTimer();
        this.timer.removeHTML();
        this.timer.init();
        this.cards.removeListOfCards();
        this.cards.init();
    }

    stopGame() {
        this._initData();
        this._initModules();
        this.timer.stopTimer();
    }
}