function Panel(p){
    this.target = p.target
    this.onStart = p.onStart;
    this.Game = p.game;
    this.initDom()
}
Panel.prototype.initDom = function(){
    var self = this;
    var start = dom.create('button');
    start.innerHTML = 'start';
    start.addEventListener('click', function (){
        self.Game.start()
    });
    var mines = dom.create('span', {class: 'minesText'});
    mines.innerHTML = this.Game.mines;
    var time = dom.create('span', {class: 'timeText'});
    time.innerHTML = 0;

    this.mines = dom.create('div', {class: 'mines'}, [mines]),
    this.facey = dom.create('div', {class: 'facey'}, [start]),
    this.time = dom.create('div', {class: 'time'}, [time]),
    this.root = dom.create('div', { class: 'panel'}, [
        this.mines, this.facey, this.time
    ]);
};
Panel.prototype.updateTime = function(t){
    this.time.children[0].innerHTML = (t/1e3).toFixed(1);
};
Panel.prototype.render = function(){
    this.target.appendChild(this.root);
};