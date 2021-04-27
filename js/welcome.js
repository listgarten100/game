

class Welcome {

    constructor(wrapper) {
        this.wrapper = wrapper;
        this.option = new ChooseOption(this.wrapper);
    }

    _initModules() {
        this.btnStart = new Button(this.blockHtmlInner, 'welcome__btn', 'Quick start');
        this.btnStart._handleListenerBtn = () => {
            console.log(this)
            this.removeHTML();
            this.option.init();
        };
        this.btnStart.init();
    }

    renderHTML() {
        this.blockHtml = document.createElement('div');
        this.blockHtml.classList.add('welcome');
        this.blockHtmlInner = document.createElement('div');
        this.blockHtmlInner.classList.add('welcome__inner');
        this.blockHtml.appendChild(this.blockHtmlInner);
        this.blockHtmlInner.innerHTML = `<h1 class="welcome__title">Welcome to the "Match-match game"</h1>
            <img src="./assets/img/welcome.png" alt="welcome" class="welcome__img">
            <p class="welcome__text">A very simple outwardly, but requiring a certain quickness and attention, a game of the "Memory" class. Try to find and open all pairs of identical cards on the playing field in a short time.</p>`;

        this.wrapper.appendChild(this.blockHtml);
    }

    removeHTML() {
        this.blockHtml.remove();
    }

    init() {
        this.renderHTML();
        this._initModules();
    }
}



