function Game(p){
    var perc = 80,
        prop = perc/100;
    this.labels = {
        mine: '💣', //'💣',
        flag: '🚩',
        expl: '💥',
        settings: '⚙',
    };
    this.viewport = {
        width: window.innerWidth * prop,
        height: window.innerHeight * prop
    };
    this.rows = p.rows || 200;
    this.cols = p.cols || 100;
    this.tileSize = p.tileSize || 20;
    this.perc = p.perc || 0.2;

    this.width = this.viewport.width;
    this.height = this.viewport.height;
    this.midWidth = this.width/2;
    this.midHeight = this.height/2;
    this.startTime = null;
    this.playing = false;

    this.cells = this.rows * this.cols;
    // this.initDom();
    this.started = false;
    this.rootSvg = Leonardo(
        this.viewport.width,
        this.viewport.height,
        {
            ns : '*',
            target: p.target
        }
    );
    this.mines = Math.floor(this.cells * this.perc);
    this.startTime = null;
    this.init();
    
}
Game.prototype.init = function() {
    
    this.Panel = new Panel({
        game: this
    });
    this.Starter = new Starter({
        game: this
    });
    
};
Game.prototype.start = function() {
    var self = this;
    if(this.playing) return;
    this.playing = true;
    this.startTime = +new Date;
    setInterval(function () {
        var now = + new Date,
            elapsed = now - self.startTime;
        // debugger;
        self.Panel.updateTime(
            (elapsed/1000).toFixed(2)
        );
    }, 10)
};
Game.prototype.render = function() {
    // this.Panel.render();
    // this.Board.render();
    // console.log(this.viewport)
    this.rootSvg.render();
};