window.onload = function () {
	maltaF('./dom.js')
	maltaF('./Game.js')
	maltaF('./Panel.js')
	maltaF('./Board.js')
	maltaF('./Tile.js')
	var target = document.getElementById('trg'),
		game = new Game(target);
	game.render();
};