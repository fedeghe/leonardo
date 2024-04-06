function Board(p){
    var self = this;
    this.target = p.target;
    this.game = p.game;
    this.width = self.game.tileSize * this.game.cols;
    this.height = self.game.tileSize * this.game.rows;
    this.rootSvg = Leonardo(this.width, this.height, {ns : '*'});
    this.cells = Array.from({
        length: this.game.rows
    }, (_, r) => Array.from({
        length: self.game.cols
    }, (__, c) => this.rootSvg.rect(0, 0, self.game.tileSize, self.game.tileSize).move(
        c * self.game.tileSize,
        r * self.game.tileSize
    )))
    this.initDom();
}
Board.prototype.initDom = function(){
    var self = this;
    this.root = dom.create('div',{'class': 'board'});
    this.cells.forEach(
        row => row.forEach(
            cell => self.rootSvg.append(cell)
        )
    );
    this.rootSvg.render({target : this.root});
};
Board.prototype.render = function(){
    this.target.appendChild(this.root);
}