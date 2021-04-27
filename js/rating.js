class Rating{

    constructor(wrapper, countOfLeftCards, name, level) {
        this.wrapper = wrapper;
        this.countOfLeftCards = countOfLeftCards;
        this.name = name;
        this.level = level;     
    }

    renderRatingList() {
        this.rating = document.createElement('div');
        this.rating.classList.add('rating');
        this.rating.innerHTML = ` 
        <h3 class="rating__title">Rating: ${this.level}</h3>
        <div class="rating__headlines">
            <p class="rating__text rating__text--blank"></p>
            <p class="rating__text rating__text--time">Time</p>
            <p class="rating__text rating__text--clicks">Clicks</p>
            <p class="rating__text rating__text--result">Result</p>
        </div>
        <ul class="rating__list">
            ${this._renderRatingLocalStorage().innerHTML}
        </ul>`;
        this.wrapper.appendChild(this.rating);
    }

    _refreshRatingList(countOfLeftCards) {
        const items = this.wrapper.querySelectorAll('.cards__item');

        if(items.length === countOfLeftCards && countOfLeftCards !== 0) {
            this._removeRatingItems();

            const user = {
                name: this.name,
                level: this.level,
            };

            if(JSON.parse(localStorage.getItem(JSON.stringify(user))) === null || JSON.parse(localStorage.getItem(JSON.stringify(user))) > this.result) { 
                localStorage.setItem(`${JSON.stringify(user)}`, `${this.result}`);
            }

            const list = this.wrapper.querySelector('.rating__list');
            list.innerHTML = this._renderRatingLocalStorage().innerHTML;
        }
    }

    _renderRatingLocalStorage() {
        let localArr = [];

        for(let i = 0; i < Object.keys(localStorage).length; i++) {
            try {
                if(this.level === JSON.parse(Object.keys(localStorage)[i]).level) {
                    localArr.push({
                        name: JSON.parse(Object.keys(localStorage)[i]).name,
                        value: JSON.parse(Object.values(localStorage)[i])
                    });
                }
            } catch(err) {
                console.warn(err);
            }     
        }
    
 
        localArr.sort(function (a, b) {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            return 0;
        });

        const div = document.createElement('div');

        for(let i = 0; i < localArr.length; i++) {
            const li = document.createElement('li');
            li.classList.add('rating__item');
            if(localArr[i].name === this.name) {
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

    removeRating() {
        this.rating.remove();
    }

    _removeRatingItems() {
        const itemsRating = this.wrapper.querySelectorAll('.rating__item');
        itemsRating.forEach(item => item.remove());
    }


    getResult(timer, counterClick) {
        this.totalTime = timer.getSumOfTime();
        this.result = this.totalTime + counterClick; 
    }

    getCongratulation(arrOfCards, bgOfCards) {
        this.congrat = new Congratulation(this.wrapper, this.result, arrOfCards, bgOfCards, this.name, this.level);
        this.congrat.init();
    }

    refreshRating(countOfLeftCards, timer, counterClick) {
        this.getResult(timer, counterClick);
        this._refreshRatingList(countOfLeftCards);
    }

    init() {
        this.renderRatingList();
    } 
}
