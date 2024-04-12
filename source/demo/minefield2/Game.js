function Game(p){
    this.viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    this.rows = p.rows || 200;
    this.cols = p.cols || 100;
    this.tileSize = p.tileSize || 20;
    this.perc = p.perc || 0.2;

    this.width = 600;
    this.height = 300;

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
    
    // this.Panel = new Panel({
    //     game: this,
    //     target: this.root,
    // });
    // this.Board = new Board({
    //     target: this.root,
    //     game: this
    // });
}
// Game.prototype.initDom = function() {
//     this.root = dom.create('div', {'class': 'root'});
// };
// Game.prototype.start = function() {
//     var self = this;
//     this.startTime = +new Date;
//     setInterval(function () {
//         var now = + new Date,
//             elapsed = now - self.startTime;
//         // debugger;
//         self.Panel.updateTime(elapsed);
//     }, 100)
// };
Game.prototype.render = function() {
    // this.Panel.render();
    // this.Board.render();
    // console.log(this.viewport)
    this.rootSvg.render();
};