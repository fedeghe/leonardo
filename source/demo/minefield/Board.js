function Board(target){
    this.target = target
    this.initDom()
}
Board.prototype.initDom = function(){
    this.root = document.createElement('div');
    this.root.setAttribute('class', 'board');
};
Board.prototype.render = function(){
    this.target.appendChild(this.root);
}