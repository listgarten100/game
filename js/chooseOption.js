class ChooseOption extends Config{

    constructor(wrapper) {
        super();
        this.wrapper = wrapper;
    }

    _initState() {
        this.level = this.levels.easy;
        this.bg = this.bgImgs.card;
    }

    renderListOfOptions() {
        this.mainBlock = document.createElement('div');
        this.mainBlock.classList.add('layout__inner');

        const blockBottom = document.createElement('div');
        blockBottom.classList.add('block');

        const blockLevel = document.createElement('div');
        blockLevel.classList.add('level');

        const p = document.createElement('p');
        p.classList.add('level__text');
        p.innerHTML = 'Choose the level:';

        blockLevel.appendChild(p);
        
        this.select = document.createElement('select');
        this.select.classList.add('level__select');

        const blockOfBg = document.createElement('div');
        blockOfBg.classList.add('block-cards');

        const cardText = document.createElement('p');
        cardText.classList.add('block-cards__text');
        cardText.innerHTML = 'Choose the cards:';

        blockOfBg.appendChild(cardText);

        this.listOfBg = document.createElement('ul');
        this.listOfBg.classList.add('cards-list');

        this.form = document.createElement('form');
        this.form.classList.add('form');

        for(let i = 0; i < 3; i++) {
            const input = document.createElement('input');
            input.classList.add('form__input');
            input.setAttribute('required', true);

            if(i === 0) input.setAttribute('name', 'first-name');
            else if(i === 1) input.setAttribute('name', 'last-name');
            else input.setAttribute('name', 'email');
            
            const label = document.createElement('label'); 
            label.classList.add('form__label');
            label.innerHTML = Object.values(this.userData)[i];

            const formItem = document.createElement('div');
            formItem.classList.add('form__item');

            formItem.appendChild(label);
            formItem.appendChild(input);

            this.form.appendChild(formItem);

            const option = document.createElement('option');
            option.innerHTML = Object.values(this.levels)[i];
            this.select.appendChild(option);

            const li = document.createElement('li');
            li.classList.add('cards-list__item');

            this.listOfBg.appendChild(li);

            const img = new Image();
            img.classList.add('cards-list__img');
            if(i === 0) img.classList.add('border');
            img.src = Object.values(this.bgImgs)[i];

            li.appendChild(img);
        }

        blockLevel.appendChild(this.select);

        blockOfBg.appendChild(this.listOfBg);
        blockBottom.appendChild(blockLevel);
        blockBottom.appendChild(blockOfBg);

        this.form.appendChild(blockBottom);
        this.mainBlock.appendChild(this.form);
        this.wrapper.appendChild(this.mainBlock);
    }

    removeListOfOptions() {
        this.mainBlock.remove();
    }

    _initModules() {
        this._initModuleBtn();
        this._initModuleListenerInputs();
        this._initModuleListenerSelect();
        this._initModuleListenerImg();
    }

    _initModuleBtn() {
        this.btnStart = new Button(this.form, 'btn', "Let's go");
        this.btnStart._handleListenerBtn = () => {
            if(this.firstName && this.lastName && this.email) {
                const cards = this.checkLevel(this.level);
                this.removeListOfOptions();           
                this.game = new Match(this.wrapper, cards, this.bg, this.firstName, this.level);
                this.game.startGame();      
            } else alert('Please write all info!');
        };
        this.btnStart.init();
    }

    _initModuleListenerInputs() {
        this.inputListener = new Listener(this.form.querySelectorAll('.form__input'), 'change', true);
        this.inputListener._handleListener = (input) => {
            if(input.getAttribute('name') === this.userData.firstName) this.firstName = input.value;
            else if(input.getAttribute('name') === this.userData.lastName) this.lastName = input.value;
            else this.email = input.value;
        };
        this.inputListener.init();
    }

    _initModuleListenerSelect() {
        this.selectListener = new Listener(this.select, 'change', false);
        this.selectListener._handleListener = () => {
            if(this.select.value) this.level = this.select.value;
        };
        this.selectListener.init();
    }

    _initModuleListenerImg() {
        this.imgListener = new Listener(this.listOfBg.querySelectorAll('.cards-list__img'), 'click', true);
        this.imgListener._handleListener = (img, arrOfImgs) => {
            arrOfImgs.forEach(img => img.classList.remove('border'));
            img.classList.add('border');
            this.bg = img.getAttribute('src');
        };
        this.imgListener.init();
    }

    init() {
        this._initState();
        this.renderListOfOptions();
        this._initModules(); 
    }

}