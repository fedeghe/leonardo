function Panel(p){
    this.game = p.game;

    var l = this.game.rootSvg,
        self = this,
        g = this.game;
    // this.render();
    this.leo = l;
    this.bomb = l.text('1%', 20, '100').setAttributes({
        'text-anchor': 'start',
        'font-weight': 'bold',
    });
    this.time = l.text('10%', 20, '0s').setAttributes({
        'text-anchor': 'start',
        'font-style': 'italic',
    });
    this.start = l.text('50%', 20, 'start').setAttributes({
        'text-anchor': 'middle',
        cursor: 'pointer',
    });
    this.setting = l.text('99%', 20, '⚙').setAttributes({
        'text-anchor': 'end',
        cursor: 'pointer'
    });
    this.line = l.line(0,25, this.game.width, 25).setAttributes({
        'stroke': 'gray',
        'stroke-width': 0.5,
    });

    this.start.on('click', function () {
        console.log('click')
        self.startGame();
        // console.log(self.time)
    })
    this.setting.on('click', function (){
        if(!g.playing)g.Starter.show();
    })
    this.render();

}
Panel.prototype.startGame = function(){
    this.game.start();
}
Panel.prototype.updateTime = function(t){
    console.log(this.time)
    this.time.tag.innerHTML = t+'s'
};
Panel.prototype.render = function(){
    var self = this;
    // console.log(this.game.Starter)
    this.leo.append([
        this.bomb,
        this.start,
        this.time,
        this.setting,
        this.line,
        // this.game.Starter.tag
    ])
};