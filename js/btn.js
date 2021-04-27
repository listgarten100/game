class Button {

    constructor(wrapper, classBtn, textBtn) {
        this.wrapper = wrapper;
        this.classBtn = classBtn;
        this.textBtn = textBtn;
    }
    
    renderBtn() {
        this.btn = document.createElement('button');
        this.btn.classList.add(this.classBtn);
        this.btn.setAttribute('type', 'button');
        this.btn.innerHTML = this.textBtn;
        this.wrapper.appendChild(this.btn);
    }

    _initListenerBtn() {
        this.btn.addEventListener('click', () => this._handleListenerBtn());
    }

    _handleListenerBtn() {
        //some func
    }

    init() {
        this.renderBtn();
        this._initListenerBtn();
    }
}

