const shuffleArr = (array) => {
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
};



class Cards {

    constructor(wrapper, arrOfCards, bgOfCards, timer, rating, name, level) {
        this.wrapper = wrapper;
        this.bgOfCards = bgOfCards;
        this.arrOfCards = arrOfCards;
        this.timer = timer;
        this.rating = rating;
        this.name = name;
        this.level = level;
    }


    _initState() {
        this.counterClick = 0;
        this.countOfCards = this.arrOfCards.length;
        this.initArrOfCards = [];
        this.shuffleArrList = null;  
        this.countOfLeftCards = 0;
        this.indexForPrevEl = 0;
        this.prevImgData = null;
        this.checkArrForPrevEl = [];
        this.checkArrItemsClass = [];
    }


    _initArr() {
        for(let i = 0; i < 2; i++) {
            for(let j = 0; j < this.countOfCards; j++) {
                this.initArrOfCards.push(j);
            }
        }
    }


    _shuffleList() {
        this.shuffleArrList = shuffleArr(this.initArrOfCards);
    }

    _initListOfCard() {
        for(let i = 0; i < this.countOfCards * 2; i++) {
            this._renderCard(this.shuffleArrList[i], this.bgOfCards, 'cards__img-bg', false, i);
        }
    }

    renderListOfCards() {
        this.listOfCards = document.createElement('ul');
        this.listOfCards.classList.add('cards__list');
        for(let i = 0; i < this.countOfCards * 2; i++) {
            const card = this._renderCard(this.shuffleArrList[i], this.arrOfCards[this.shuffleArrList[i]], 'cards__img', true, i+9);
            this.listOfCards.appendChild(card);
        }
        this.wrapper.appendChild(this.listOfCards);
    }

    _renderCard(i, src, classNameImg, isAppendToList, iterator) {
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
            return card;
        }
        else{
            const items = this.listOfCards.querySelectorAll('.cards__item');
            items[iterator].firstChild.appendChild(img);
        }
    }

    _initModuleListenerOpen() {
        this.listenerOpen = new Listener(this.listOfCards.querySelectorAll('.cards__item'), 'click', true);
        this.listenerOpen._handleListener = (item, items) => {
            this.counterClick++;
           
            if(item.firstChild.lastChild.classList.contains('cards__img-bg')) {
                item.classList.add('flipp');
                this.checkArrForPrevEl.push(item.dataset);
                this.checkArrItemsClass.push(item);
            }
            setTimeout(() => item.classList.remove('flipp'), 1200);
      
            if(this.checkArrForPrevEl.length - 1 === this.indexForPrevEl) {
                if(this.checkArrItemsClass[this.indexForPrevEl - 1]){
                    if(this.checkArrItemsClass[this.indexForPrevEl].classList.contains('flipp') && this.checkArrItemsClass[this.indexForPrevEl - 1].classList.contains('flipp')) {
                        this._removeCard(item.firstChild.lastChild, items);
                    }
                }
                this.prevImgData = item.firstChild.firstChild.dataset.number;
                this.indexForPrevEl++;
            }   
        };
        this.listenerOpen.init();
    }
    
    _initListenerOpen() {
       this._initModuleListenerOpen();
    }

    _removeCard(currentCard, cardsList) {
            if(this.checkArrForPrevEl[this.indexForPrevEl].number === this.checkArrForPrevEl[this.indexForPrevEl - 1].number && this.prevImgData !== currentCard.previousSibling.dataset.number){
              
                cardsList.forEach((elem) => {
                    let interval = 1;
                    
                    if(elem.dataset === this.checkArrForPrevEl[this.indexForPrevEl]) {
                        this.countOfLeftCards++;
                        let intervalCurrent = setInterval(() => {
                            if(interval < 0.1) clearInterval(intervalCurrent);
                            elem.style.opacity = interval -= 0.1;
                        }, 70); 
                    }

                    if(elem.dataset === this.checkArrForPrevEl[this.indexForPrevEl-1]) {
                        this.countOfLeftCards++;
                        let intervalPrev = setInterval(() => {
                            if(interval < 0.1) clearInterval(intervalPrev);
                            elem.style.opacity = interval -= 0.1;
                        }, 70);
                    }
                });

                if(cardsList.length === this.countOfLeftCards) this.getRating();
            }
    }

    getRating() {
        this.timer.stopTimer();
        this.rating.refreshRating(this.countOfLeftCards, this.timer, this.counterClick);
        this.rating.getCongratulation(this.arrOfCards, this.bgOfCards);
    }

    removeListOfCards() {
        const list = this.wrapper.querySelector('.cards__list');
        list.remove();
    }

    init() {
        this._initState();
        this._initArr();
        this._shuffleList();
        this.renderListOfCards();
        this._initListOfCard();
        this._initListenerOpen();
    }
}