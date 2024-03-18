function Game(target){
    this.initDom();
    this.started = false;
    this.mines = 99;
    this.startTime = +new Date;
    this.target = target;
    this.Panel = new Panel({
        game: this,
        target: this.root,
    });
    this.Board = new Board(this.root);
}
Game.prototype.initDom = function() {
    this.root = dom.create('div', {'class': 'root'});
};
Game.prototype.start = function() {
    var self = this;

    console.log('start game', self);
    setInterval(function () {
        var now = + new Date,
            elapsed = now - self.startTime;
        // debugger;
        self.Panel.updateTime(elapsed);
    }, 100)
};
Game.prototype.render = function() {
    this.Panel.render();
    this.Board.render();
    this.target.appendChild(this.root);
};