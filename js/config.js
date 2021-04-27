class Config {
    constructor() {
        this.imgsEasy = [
            './assets/img/avatar.jpg',
            './assets/img/butterfly.jpg',
            './assets/img/gamburger.jpg',
            './assets/img/mouse.jpg'
        ];
        
        this.imgsMiddle = [
            './assets/img/avatar.jpg',
            './assets/img/butterfly.jpg',
            './assets/img/gamburger.jpg',
            './assets/img/mouse.jpg',
            './assets/img/nature.jpg',
            './assets/img/smile.jpg'
        ];
        
        
        this.imgsHard = [
            './assets/img/avatar.jpg',
            './assets/img/butterfly.jpg',
            './assets/img/gamburger.jpg',
            './assets/img/mouse.jpg',
            './assets/img/nature.jpg',
            './assets/img/smile.jpg',
            './assets/img/snegovik.jpg',
            './assets/img/world.jpg',
        ];

        this.bgImgs = {
            card: './assets/img/bg.jpg',
            gold: './assets/img/bg-gold.jpg',
            jeans: './assets/img/bg-jeans.jpg' 
        };

        this.levels = {
            easy: 'Easy',
            middle: 'Middle',
            hard: 'Hard'
        };

        this.userData = {
            firstName: 'first-name',
            lastName: 'last-name',
            email: 'email'
        };
    }

    checkLevel(level) {
        if(level === this.levels.easy) return this.imgsEasy;
        else if(level === this.levels.middle) return this.imgsMiddle;
        else return this.imgsHard;
    }
}