function Starter(p) {
    var self = this,
        game = p.game,
        leo = game.rootSvg,
        l = game.rootSvg;
        // Storage.set('hard');
console.log(Storage.get())
    this.leo = l;
    
    this.width = 300;
    this.height = 200;
    this.game = game;
    this.starter = leo.group()
        .setAttributes({visibility: 'hidden'})
        .move(
            game.midWidth - this.width/2,
            10
        );
    this.cnt = leo.rect(
        0, 0,
        this.width, this.height
    ).setAttributes({
        stroke: 'black',
        fill: '#eee',
        'opacity' :'0.9',
    });
    this.close = leo.text(5,5,'x').setAttributes({
        'text-anchor': 'end',
        stroke:'green',
        cursor: 'pointer'
    });
    this.starter.append([this.cnt, this.close])
    this.close.on('click', function (){
        self.hide()
    });
    this.render();
}
Starter.prototype.render = function () {
    this.leo.append(this.starter)
};
Starter.prototype.show = function () {
    this.starter.setAttributes({visibility:'visible'});
};
Starter.prototype.hide = function () {
    this.starter.setAttributes({visibility:'hidden'});
};
