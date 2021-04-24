const imgsEasy = [
    './assets/img/avatar.jpg',
    './assets/img/butterfly.jpg',
    './assets/img/gamburger.jpg',
    './assets/img/mouse.jpg'
];

const imgsMiddle = [
    './assets/img/avatar.jpg',
    './assets/img/butterfly.jpg',
    './assets/img/gamburger.jpg',
    './assets/img/mouse.jpg',
    './assets/img/nature.jpg',
    './assets/img/smile.jpg'
];


const imgsHard = [
    './assets/img/avatar.jpg',
    './assets/img/butterfly.jpg',
    './assets/img/gamburger.jpg',
    './assets/img/mouse.jpg',
    './assets/img/nature.jpg',
    './assets/img/smile.jpg',
    './assets/img/snegovik.jpg',
    './assets/img/world.jpg',
];

const wrapper = document.querySelector('.layout');


class Match {

    constructor(arrOfCards, bgOfCards, name, level) {
        this.arrOfCards = arrOfCards;
        this.countOfCards = arrOfCards.length;
        this.bgOfCards = bgOfCards;
        this.name = name;
        this.level = level;
    }

    initProps() {
        this.wrapListOfCards = document.querySelector('.cards__list');
        this.initArrOfCards = [];
        this.shuffleArrList = null;  
        this.countOfLeftCards = 0;
        this.totalTimeOfGameSec = 1;
        this.totalTimeOfGameMin = 0;
        this.totalTime = 0;
        this.checkArrForPrevEl = [];
        this.indexForPrevEl = 0;
        this.oldImgData = null;
        this.clock = document.querySelector('.timer');
        this.counterClick = 0;
        this.result = 0;
        this.checkArrItemsClass = [];
    }

    _initProps() {
        this.isRatingList = false;
    }

    initLevel() {
        if(this.level === 'Easy') {
            this.name = '.' + this.name;
        } else if(this.level === 'Middle') {
            this.name = '..' + this.name;
        } else{
            this.name = '...' + this.name;
        }
    }


    initTimer() {
      
        const getSecond = () => {
            if(this.totalTimeOfGameMin > 1) {
                this.stopTimer();
                alert('Sorry, you are thinking too long, try again!');
            }    
            if(this.totalTimeOfGameSec % 60 !== 0) {
                if(this.totalTimeOfGameSec <= 9) {
                    this.clock.innerHTML = `0${this.totalTimeOfGameMin}:0${this.totalTimeOfGameSec++}`;
                } else{
                    this.clock.innerHTML = `0${this.totalTimeOfGameMin}:${this.totalTimeOfGameSec++}`;
                }
            } else{
                this.totalTimeOfGameSec = 0;
                if(this.totalTimeOfGameSec <= 9) {
                    this.clock.innerHTML = `0${++this.totalTimeOfGameMin}:0${this.totalTimeOfGameSec++}`;
                } else{
                    this.clock.innerHTML = `0${++this.totalTimeOfGameMin}:${this.totalTimeOfGameSec++}`;
                }
            }
         };

        this.timer = setInterval(getSecond, 1000);
    }

    stopTimer(msg) {
        console.log(msg)
        if(msg === 'back') {
            clearInterval(this.timer);
  
        } else if(msg === 'congrat') {
            clearInterval(this.timer);
            this.getSumOfTime();
            this.getResult();
            this.renderRatingList(); 
        }
        else{
            clearInterval(this.timer);
            this.getSumOfTime();
            this.getResult();
            this.renderRatingList();

            const congrat = new Congratulation(this);
            congrat.init();
        } 
    }


    initArr() {
        for(let i = 0; i < 2; i++) {
            for(let j = 0; j < this.countOfCards; j++) {
                this.initArrOfCards.push(j);
            }
        }
    }

    shuffleArr(array) {
        let currentIndex = array.length; 
        let temporaryValue, randomIndex;
       
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    shuffleList() {
        this.shuffleArrList = this.shuffleArr(this.initArrOfCards);
    }

    initListOfCard() {
        for(let i = 0; i < this.countOfCards * 2; i++) {
            this.renderCard(this.shuffleArrList[i], this.bgOfCards, 'cards__img-bg', false, i);
        }
    }

    renderListOfCards() {
        for(let i = 0; i < this.countOfCards * 2; i++) {
            this.renderCard(this.shuffleArrList[i], this.arrOfCards[this.shuffleArrList[i]], 'cards__img', true, i+9);
        }
    }

    renderCard(i, src, classNameImg, isAppendToList, iterator) {
        const img = new Image();
        img.classList.add(classNameImg);
        img.src = src;
        img.dataset.number = iterator;

        const wrapperCard = document.createElement('div');
        wrapperCard.classList.add('cards__wrapper');
        wrapperCard.dataset.number = i;

        if(isAppendToList) {
            const card = document.createElement('li');
            card.classList.add('cards__item');
            card.dataset.number = i;
            card.appendChild(wrapperCard);
            wrapperCard.appendChild(img);
            this.wrapListOfCards.appendChild(card);
        }
        else{
            const items = document.querySelectorAll('.cards__item');
            items[iterator].firstChild.appendChild(img);
        }
    }
    
    initListenerOpen() {
        const items = document.querySelectorAll('.cards__item');
        items.forEach((elem) => {
            elem.addEventListener('click', (e) => this.openCard(e, items));
        });
    }

    openCard(e, items) {
        const target = e.target;

        this.counterClick++;

        if(target.classList.contains('cards__img-bg')) {
            target.parentElement.parentElement.classList.add('flipp');
            this.checkArrForPrevEl.push(target.parentElement.parentElement.dataset);
            this.checkArrItemsClass.push(target.parentElement.parentElement);
        }
        setTimeout(() => {
            target.parentElement.parentElement.classList.remove('flipp');
        }, 1200);
  
        if(this.checkArrForPrevEl.length - 1 === this.indexForPrevEl) {
            if(this.checkArrItemsClass[this.indexForPrevEl - 1]){
                if(this.checkArrItemsClass[this.indexForPrevEl].classList.contains('flipp') && this.checkArrItemsClass[this.indexForPrevEl - 1].classList.contains('flipp')) {
                    this.removeCard(target, items);
                }
            }
            this.oldImgData = target.previousSibling.dataset.number;
            this.indexForPrevEl++;
        }   
    }

    removeCard(currentCard, cardsList) {

        if(this.checkArrForPrevEl[this.indexForPrevEl - 1] && currentCard.parentElement.parentElement.classList.contains('flipp')) {
            if(this.checkArrForPrevEl[this.indexForPrevEl].number === this.checkArrForPrevEl[this.indexForPrevEl - 1].number && this.oldImgData !== currentCard.previousSibling.dataset.number){
              
                cardsList.forEach((elem) => {
                    let interval = 1;
                    
                    if(elem.dataset === this.checkArrForPrevEl[this.indexForPrevEl]) {
                        this.countOfLeftCards++;
                        let intervalCurrent = setInterval(() => {
                            if(interval < 0.1) {
                                clearInterval(intervalCurrent);
                            }
                            elem.style.opacity = interval -= 0.1;
                        }, 70);
                       
                    }

                    if(elem.dataset === this.checkArrForPrevEl[this.indexForPrevEl-1]) {
                        this.countOfLeftCards++;
                        let intervalPrev = setInterval(() => {
                            if(interval < 0.1) {
                                clearInterval(intervalPrev);
                            }
                            elem.style.opacity = interval -= 0.1;
                        }, 70);
                       
                    }
                });
                if(cardsList.length === this.countOfLeftCards) {
                    this.stopTimer();
                }
            }
        }
    }

    getSumOfTime() {
        this.totalTime = this.totalTimeOfGameSec + (this.totalTimeOfGameMin * 60) - 1;
    }

    getResult() {
        this.result = this.totalTime + this.counterClick;
        if(localStorage.getItem(`${this.name}`) > this.result || localStorage.getItem(`${this.name}`) === null) {
            localStorage.setItem(`${this.name}`, `${this.result}`);
        }
        
    }

    renderRatingList() {

        if(!this.isRatingList) {
            const rating = document.createElement('div');
            rating.classList.add('rating');
            rating.innerHTML = ` 
            <h3 class="rating__title">Rating: ${this.level}</h3>
            <div class="rating__headlines">
                <p class="rating__text rating__text--blank"></p>
                <p class="rating__text rating__text--time">Time</p>
                <p class="rating__text rating__text--clicks">Clicks</p>
                <p class="rating__text rating__text--result">Result</p>
            </div>
            <ul class="rating__list">
                ${this.renderRatingLocalStorage().innerHTML}
            </ul>`;
            wrapper.appendChild(rating);

            this.isRatingList = true;
        } else{
            const items = document.querySelectorAll('.cards__item');
            if(items.length === this.countOfLeftCards && this.countOfLeftCards !== 0) {
                const itemsRating = document.querySelectorAll('.rating__item');
                itemsRating.forEach(elem => elem.remove());
                const list = document.querySelector('.rating__list');
                list.innerHTML = this.renderRatingLocalStorage().innerHTML;
            }
        }
    }

    renderRatingLocalStorage() {

        let localArr = [];

        for(let i = 0; i < Object.keys(localStorage).length; i++) {
            if((/^\.{1}([A-Za-z0-9А-Яа-я]+)$/).test(this.name)) {
                if((/^\.{1}([A-Za-z0-9А-Яа-я]+)$/).test(Object.keys(localStorage)[i])) {
                    localArr.push({
                        name: Object.keys(localStorage)[i].replace(/^\.+/g, ''),
                        value: +Object.values(localStorage)[i]
                    });
                }
            } else if((/^\.{2}([A-Za-z0-9А-Яа-я]+)$/).test(this.name)) {
                if((/^\.{2}([A-Za-z0-9А-Яа-я]+)$/).test(Object.keys(localStorage)[i])) {
                    localArr.push({
                        name: Object.keys(localStorage)[i].replace(/^\.+/g, ''),
                        value: +Object.values(localStorage)[i]
                    });
                }
            } else if((/^\.{3}([A-Za-z0-9А-Яа-я]+)$/).test(this.name)) {
                if((/^\.{3}([A-Za-z0-9А-Яа-я]+)$/).test(Object.keys(localStorage)[i])) {
                    localArr.push({
                        name: Object.keys(localStorage)[i].replace(/^\.+/g, ''),
                        value: +Object.values(localStorage)[i]
                    });
                }
            }
           
        }

        localArr.sort(function (a, b) {
                if (a.value > b.value) {
                  return 1;
                }
                if (a.value < b.value) {
                  return -1;
                }
                return 0;
        });

        const div = document.createElement('div');

        for(let i = 0; i < localArr.length; i++) {
            const li = document.createElement('li');
            li.classList.add('rating__item');
            const reg = new RegExp(localArr[i].name);
            if((reg).test(this.name.replace(/^\.+/g, ''))) {
                li.classList.add('rating__item--new');
            }
            li.innerHTML = `<p class="rating__text rating__text--name">${localArr[i].name}</p>
            <p class="rating__text rating__text--time">-</p>
            <p class="rating__text rating__text--clicks">-</p>
            <p class="rating__text rating__text--result">${localArr[i].value}</p>`;
            div.appendChild(li);
        }

        return div;
    }


    renderBtnRestart() {
        const btn = document.createElement('button');
        btn.classList.add('btn-restart');
        btn.innerHTML = 'restart';
        wrapper.appendChild(btn);
    }

    initListenerRestart() {
        const btn = document.querySelector('.btn-restart');
        btn.addEventListener('click', () => this.handleRestart());
    }

    handleRestart() {
        const cardsItems = document.querySelectorAll('.cards__item');
        cardsItems.forEach((elem) => {
            elem.remove();
        });
        this.initRestart('back');
    }

    renderBtnBack() {
        const btn = document.createElement('button');
        btn.classList.add('btn-back');
        btn.innerHTML = 'Back to main';
        wrapper.appendChild(btn);
    }

    initListenerBack() {
        const btn = document.querySelector('.btn-back');
        btn.addEventListener('click', () => this.handleBack(btn));
    }

    handleBack(btnBack) {
        const items = document.querySelectorAll('.cards__item');
           items.forEach(elem => elem.remove());
           btnBack.remove();
           const rating = document.querySelector('.rating');
           rating.remove();
           const btnReset = document.querySelector('.btn-restart');
           btnReset.remove();
           const list = document.querySelector('.cards__list');
           list.style.display = 'none';
           const timer = document.querySelector('.timer');
           timer.innerHTML = '00:00';

           this.stopTimer('back');

           const option = new ChooseOption();
           option.init();
    }

    init() {
        this.initProps();
        this._initProps();
        this.initLevel();
        this.initTimer();
        this.initArr();
        this.shuffleList();
        this.renderListOfCards();
        this.initListOfCard();
        this.renderRatingList();
        this.renderBtnRestart();
        this.renderBtnBack();
        this.initListenerOpen();
        this.initListenerRestart();
        this.initListenerBack();
    }

    initRestart(msg) {
        this.stopTimer(msg);
        this.initProps();
        this.initTimer();
        this.initArr();
        this.shuffleList();
        this.renderListOfCards();
        this.initListOfCard();
        this.initListenerOpen();
    }
}




let bgCards;


class ChooseOption {

    initProps() {
        this.level = 'Easy';
        this.bg = './assets/img/bg.jpg';
    }

    renderListOfOptions() {
        const levels = ['Easy', 'Middle', 'Hard'];
        const imgs = ['./assets/img/bg.jpg', './assets/img/bg-gold.jpg', './assets/img/bg-jeans.jpg'];
        const labels = ['First Name', 'Last Name', 'Email'];

        const mainBlock = document.createElement('div');
        mainBlock.classList.add('layout__inner');

        const blockBottom = document.createElement('div');
        blockBottom.classList.add('block');

        const blockLevel = document.createElement('div');
        blockLevel.classList.add('level');

        const p = document.createElement('p');
        p.classList.add('level__text');
        p.innerHTML = 'Choose the level:';

        blockLevel.appendChild(p);
        
        const select = document.createElement('select');
        select.classList.add('level__select');

        const blockOfBg = document.createElement('div');
        blockOfBg.classList.add('block-cards');

        const cardText = document.createElement('p');
        cardText.classList.add('block-cards__text');
        cardText.innerHTML = 'Choose the cards:';

        blockOfBg.appendChild(cardText);

        const listOfBg = document.createElement('ul');
        listOfBg.classList.add('cards-list');

        const form = document.createElement('form');
        form.classList.add('form');

        for(let i = 0; i < 3; i++) {
            const input = document.createElement('input');
            input.classList.add('form__input');
            input.setAttribute('required', true);

            if(i === 0) input.setAttribute('name', 'first-name');
            else if(i === 1) input.setAttribute('name', 'last-name');
            else input.setAttribute('name', 'email');
            
            const label = document.createElement('label'); 
            label.classList.add('form__label');
            label.innerHTML = labels[i];

            const formItem = document.createElement('div');
            formItem.classList.add('form__item');

            formItem.appendChild(label);
            formItem.appendChild(input);

            form.appendChild(formItem);

            const option = document.createElement('option');
            option.innerHTML = levels[i];
            select.appendChild(option);

            const li = document.createElement('li');
            li.classList.add('cards-list__item');

            listOfBg.appendChild(li);

            const img = new Image();
            img.classList.add('cards-list__img');
            if(i === 0) img.classList.add('border');
            img.src = imgs[i];

            li.appendChild(img);
        }

        blockLevel.appendChild(select);

        blockOfBg.appendChild(listOfBg);
        blockBottom.appendChild(blockLevel);
        blockBottom.appendChild(blockOfBg);

        const btnStart = document.createElement('button');
        btnStart.setAttribute('type', 'button');
        btnStart.classList.add('btn');
        btnStart.innerHTML = "Let's go";

        form.appendChild(blockBottom);
        form.appendChild(btnStart);
        mainBlock.appendChild(form);
        wrapper.appendChild(mainBlock);
    }

    initListenerImgClick() {
        const imgs = document.querySelectorAll('.cards-list__img');
        imgs.forEach((elem) => {
            elem.addEventListener('click', (e) => this.handleImgClick(e, imgs))
        });
    }

    handleImgClick(e, imgs) {
        for(let i = 0; i < imgs.length; i++) {
            imgs[i].classList.remove('border');
        }
        e.target.classList.toggle('border');

        this.getBgCards();
    }

    initListenerInput() {
        const inputs = document.querySelectorAll('.form__input');
        inputs.forEach((elem) => {
            elem.addEventListener('change', (e) => this.handleInput(e))
        });
    }

    handleInput(e) {
        const target = e.target;
       
        if(target.getAttribute('name') === 'first-name') {
            this.firstName = target.value;
        }

        if(target.getAttribute('name') === 'last-name') {
            this.lastName = target.value;
        }

        if(target.getAttribute('name') === 'email') {
            this.email = target.value;
        }
    }

    initListenerSelectLevel() {
        const select = document.querySelector('.level__select');
        select.addEventListener('change', (e) => this.handleSelect(e));
    }

    handleSelect(e) {
        const target = e.target;
        if(target.value) {
            this.level = target.value;
        }
    }

    initListeners() {
        this.initListenerImgClick();
        this.initListenerInput();
        this.initListenerSelectLevel();
    }

    getBgCards() {
        const imgs = document.querySelectorAll('.cards-list__img');
        
        imgs.forEach((elem) => {
            if(elem.classList.contains('border')){
                this.bg = elem.getAttribute('src');
            }
        })
    }

    initGame() {
        let level = null;
        if(Object.keys(this).length === 5) {
            if(this.level === 'Easy') level = imgsEasy;
            else if(this.level === 'Middle') level = imgsMiddle;
            else level = imgsHard;

            const wrap = document.querySelector('.layout__inner');
            wrap.remove();

            const cardsList = document.querySelector('.cards__list');
            cardsList.style.display = 'grid';

            const game = new Match(level, this.bg, this.firstName, this.level);
            game.init();       
        }
        
    }

    startGame() {
        const btn = document.querySelector('.btn');

        btn.addEventListener('click', () => this.initGame());
    }

    init() {
        this.initProps();
        this.renderListOfOptions();
        this.initListeners();
        this.startGame();
    }

}


class Congratulation {

    constructor(prevGame) {
        this.game = prevGame;
    }

    renderHTML(res) {
        const div = document.createElement('div');
        div.classList.add('congrat');

        div.innerHTML = `<div class="congrat__inner">
        <img src="./assets/img/congrat.jpg" alt="congratulations" class="congrat__img">
        <p class="congrat__text">Your result is <span class="congrat__text--res">${res}</span></p>
        <div class="congrat__controls">
            <button class="congrat__btn congrat__btn--more">Try more</button>
            <button class="congrat__btn congrat__btn--back">Back to main</button>
        </div>
    </div>`;

        wrapper.appendChild(div);
    }

    initListenerBack() {
        const btn = document.querySelector('.congrat__btn--back');
        console.log(btn)
        btn.addEventListener('click', () => {
            const congrat = document.querySelector('.congrat');
            congrat.remove();

            const btnBack = document.querySelector('.btn-back');
            this.game.handleBack(btnBack);
        });
    }

    initListenerMore() {
        const btn = document.querySelector('.congrat__btn--more');
        btn.addEventListener('click', () => {
            const congrat = document.querySelector('.congrat');
            console.log(congrat);
            congrat.remove();

        
            const cardsItems = document.querySelectorAll('.cards__item');
            cardsItems.forEach((elem) => {
                elem.remove();
            });
        
            this.game.initRestart('congrat');
        });
    }

    initListeners() {
        this.initListenerBack();
        this.initListenerMore();
    }

    init() {
        this.renderHTML(this.game.result);
        this.initListeners();
    }
}



class Welcome {

    renderHTML() {
        const div = document.createElement('div');
        div.classList.add('welcome');
        div.innerHTML = `<div class="welcome__inner">
            <h1 class="welcome__title">Welcome to the "Match-match game"</h1>
            <img src="./assets/img/welcome.png" alt="welcome" class="welcome__img">
            <p class="welcome__text">A very simple outwardly, but requiring a certain quickness and attention, a game of the "Memory" class. Try to find and open all pairs of identical cards on the playing field in a short time.</p>
            <button class="welcome__btn">Quick start</button>
        </div>`;

        wrapper.appendChild(div);
    }


    initListenerStart() {
      const btn = document.querySelector('.welcome__btn');
      btn.addEventListener('click', () => {
          const welcome = document.querySelector('.welcome');
          welcome.remove();

            const option = new ChooseOption();
            option.init();
      });
    }

    init() {
        this.renderHTML();
        this.initListenerStart();
    }
}


const welcome = new Welcome();
welcome.init();
