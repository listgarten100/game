class Listener {
    constructor(items, listen, isArray) {
        this.items = items;
        this.listen = listen;
        this.isArray = isArray;
    }


    _initListener() {
        if(this.isArray) {
            this.items.forEach(item => {
                item.addEventListener(this.listen, () => this._handleListener(item, this.items));
            });
        } else{
            this.items.addEventListener(this.listen, () => this._handleListener());
        }
    }

    _handleListener(item) {
        //some func
    }

    init() {
        this._initListener();
    }
}