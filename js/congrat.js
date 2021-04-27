class Congratulation {

    constructor(wrapper, result, arrOfCards, bgOfCards, name, level) {
        this.wrapper = wrapper;
        this.result = result;
        this.arrOfCards = arrOfCards;
        this.bgOfCards = bgOfCards;
        this.name = name;
        this.level = level;
        this.game = new Match(this.wrapper, this.arrOfCards, this.bgOfCards, this.name, this.level);
    }

    renderHTML() {
        this.congrat = document.createElement('div');
        this.congrat.classList.add('congrat');

        this.congrat.innerHTML = `<div class="congrat__inner">
        <img src="./assets/img/congrat.jpg" alt="congratulations" class="congrat__img">
        <p class="congrat__text">Your result is <span class="congrat__text--res">${this.result}</span></p>
        <div class="congrat__controls"></div>
        </div>`;

        this.wrapper.appendChild(this.congrat);
    }

    _initModules() {
        this._initModuleBtnMore();
        this._initModuleBtnBack();
    }

    _initModuleBtnBack() {
        this.btnBack = new Button(this.wrapper.querySelector('.congrat__controls'), 'congrat__btn', 'Back to main');
        this.btnBack._handleListenerBtn = () => {
            this.removeHTML();
            this.game._initData();
            this.game._initModules();
            this.game.btnBack._handleListenerBtn();
        };
        this.btnBack.init();
    }

    _initModuleBtnMore() {
        this.btnMore = new Button(this.wrapper.querySelector('.congrat__controls'), 'congrat__btn', 'Try more');
        this.btnMore._handleListenerBtn = () => {
            this.removeHTML();
            this.game.restartGame();
        };
        this.btnMore.init();
    }

    removeHTML() {
        this.congrat.remove();
    }


    init() {
        this.renderHTML();
        this._initModules();
    }
}