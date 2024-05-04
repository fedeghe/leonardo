window.onload = function () {
	maltaF('./dom.js')
	maltaF('./Storage.js')
	maltaF('./Game.js')
	maltaF('./Panel.js')
	maltaF('./Starter.js')
	maltaF('./Board.js')
	maltaF('./Tile.js')
	var target = document.getElementById('root'),
		game = new Game({
			target, tileSize
		});
	game.render();
};