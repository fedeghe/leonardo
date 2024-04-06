window.onload = function () {
	maltaF('./dom.js')
	maltaF('./Game.js')
	// maltaF('./Panel.js')
	// maltaF('./Board.js')
	// maltaF('./Tile.js')
	var target = document.getElementById('root'),
		tileSize = 20,
		rows = 30,
		cols = 50,
		game = new Game({
			target, tileSize, rows, cols
		});
	game.render();
};