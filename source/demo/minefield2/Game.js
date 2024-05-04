var levels = {
    'easy': { prop: 0.5, mines: 0.15 },
    'medium': { prop: 0.7, mines: 0.18 },
    'hard':{ prop: 0.85, mines: 0.22 },
    'impossible': { prop: 1, mines: 0.25 }
}
function Game(p){
    var perc = 80,
        prop = perc/100;
    this.level = Storage.get();
    this.labels = {
        mine: '💣',
        flag: '🚩',
        expl: '💥',
        settings: '⚙',
    };
    
    this.levelData = levels[this.level];

    this.viewport = {
        width: window.innerWidth * this.levelData.prop,
        height: window.innerHeight * this.levelData.prop
    };
    
    this.rows = 200;
    this.cols = 100;
    this.tileSize =  20;


    this.width = this.viewport.width;
    this.height = this.viewport.height;
    this.midWidth = this.width/2;
    this.midHeight = this.height/2;
    this.startTime = null;
    this.playing = false;

    this.cells = this.rows * this.cols;

    this.started = false;
    this.rootSvg = Leonardo(
        this.viewport.width,
        this.viewport.height,
        {
            ns : '*',
            target: p.target
        }
    );
    this.mines = Math.floor(this.cells * this.levelData.mines);
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

    this.rootSvg.render();
};