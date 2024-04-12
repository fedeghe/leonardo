window.onload = function () {
	var target = document.getElementById('root'),
		startTime = false,
		endTime = false,
		levelCut = 0.2,
		width = 1200,
		height = 1000,
		tileSize = 50,
		nr = height/tileSize,
		nc = width/tileSize,
		color1 = '#333',
		color2 = '#f60',
		L = Leonardo(width, height, {ns : '*', target : target}),
		tiles = [],
		base = L.rect(0, 0, width, height),
		outG = L.group().setAttributes({ width, height }),
		getNeighbours = function (i,j){
			var hasTop = i > 0,
				hasBottom = i < nr-1,
				hasLeft = j > 0,
				hasRight = j < nc-1,
				neighbours = [];
			hasTop && hasLeft && neighbours.push([i-1, j-1]);
			hasTop && neighbours.push([i-1, j]);
			hasTop && hasRight && neighbours.push([i-1, j+1]);
			hasRight && neighbours.push([i, j+1]);
			hasBottom && hasRight && neighbours.push([i+1, j+1]);
			hasBottom  && neighbours.push([i+1, j]);
			hasBottom && hasLeft && neighbours.push([i+1, j-1]);
			hasLeft && neighbours.push([i, j-1]);
			return neighbours;
		};

	function Tile(i, j, isBomb) {
		var self = this;
		this.i = i;
		this.j = j;
		this.solved = false;
		this.flagged = false;
		this.bomb = isBomb;//Math.random() > levelCut;
		this.tag = L.group().setAttributes({
			// fill: this.bomb ? 'gray' : color1,
			fill: color1,
			stroke: '#222',
			strokeWidth: '3',
			width: tileSize,
			height: tileSize,
			cursor: 'pointer',
			opacity: 0.9,
		}).move(j*tileSize,i*tileSize);
		this.tile = L.rect(0, 0, tileSize, tileSize),
		this.txt = L.text(
			2.8*tileSize/10,
			7.4*tileSize/10,
			this.bomb ? '💣' : ''
		).setAttributes({
			stroke:'white',
			visibility: 'hidden',
			'font-family': 'verdana',
			'font-weight': 'bold',
			'font-size': 2*tileSize/3,
		});
		if (this.bomb)this.txt.move(-5,0);
		this.tag.append(this.tile, this.txt);
		this.tag.on('contextmenu', e => {
			if (self.solved) {
				e.preventDefault();
				return false;
			}
			self.onFlag(e);
		});

		this.tag.on('click', e => {
			startTime = startTime || +new Date;
			if (self.solved) return;
			if (e.metaKey) {
				self.onFlag(e);
			}
			else if (!self.flagged) self.solve.call(self)
		});
		this.tag.on('mouseover', () => self.tag.setAttributes({opacity: 1}));
		this.tag.on('mouseout', () => self.tag.setAttributes({opacity: 0.9}));
	}

	Tile.prototype.onFlag = function(e){
		this.flag();
		e.preventDefault();
		return false;
	};

	Tile.prototype.solve = function(){
		this.uncover();	
		this.solved = true;
		if(this.bomb){this.loose()}
		else if (this.n === 0) {
			this.txt.tag.innerHTML = ' ';
			this.solveNeighbours()
		} else if (this.n > 0){
			this.txt.tag.innerHTML = this.n;
		}
	};

	Tile.prototype.loose = function(){
		this.txt.tag.innerHTML = '💣';
		var splitted = Object.values(tiles).reduce(
				(acc, row) => {
					row.forEach(cell => {
						if (cell.bomb) acc.bombs.push(cell);
						else acc.safe.push(cell);
					})
					return acc
				},
				{ bombs:[], safe:[],}
			);
		splitted.bombs.forEach(t => 
			t.txt.setAttributes({
				visibility: 'visible'
			})
		);
		splitted.safe.filter(t => {
			if (t.flagged)t.tag.setAttributes({
				fill: 'yellow'
			})
		})
		tiles.forEach(row => row.forEach(c => {
			c.tag.off('click')
		}))
		this.tag.setAttributes({
			fill: 'red'
		})
		this.txt.tag.innerHTML = '💥'
		this.txt.move(-5,0)
	};

	Tile.prototype.solveNeighbours = function(){
		var neighbours = getNeighbours(this.i, this.j),
			unsolvedNeighbours = neighbours.filter(
				n => !tiles[n[0]][n[1]].solved
			);
		unsolvedNeighbours.forEach(
			function (neighbour){
				var t = tiles[neighbour[0]][neighbour[1]]
				!t.bomb && t.solve()
			}
		)
	};

	Tile.prototype.flag = function(){
		this.flagged = !this.flagged;
		this.txt.tag.innerHTML = this.flagged ? '🚩' : (this.solved ? this.n : '' );
		this.txt.setAttributes({visibility: !this.solved ? 'visible' : 'hidden'})
		if (this.flagged) this.txt.move(0,0);
		
		var stats = tiles.reduce((acc, row) => {
			var res =  row.reduce((a, tile) => {
				return {
					flaggedBombs: a.flaggedBombs + ~~(tile.flagged && tile.bomb),
					bombs: a.bombs + ~~tile.bomb
				}
			}, {
				flaggedBombs: 0,
				bombs: 0
			})
			return {
				flaggedBombs: acc.flaggedBombs + res.flaggedBombs,
				bombs: acc.bombs + res.bombs,
			}
		}, {
			flaggedBombs: 0,
			bombs: 0
		});
		stats.tot = nr*nc
		
		if (stats.flaggedBombs === stats.bombs){
			endTime = +new Date;
			alert(`you won in ${((endTime - startTime) / 1e3).toFixed(1)} seconds`)
		}
	};

	Tile.prototype.uncover = function(){
		this.tag.setAttributes({fill: 'black'});
		this.txt.setAttributes({visibility: 'visible'});
		this.txt.tag.innerHTML = neighbourBombs;
		var c = ['black', '#46a', 'green', 'red', 'orange', 'yellow', 'white', 'azure', 'blue'][this.n]
		this.txt.setAttributes({
			stroke: c,
			fill:c
		});
	};

	Tile.prototype.setNumber = function(){
		if (!this.bomb) {
			var neighbours = getNeighbours(this.i, this.j);
			neighbourBombs = neighbours.reduce((acc, el) => acc + (tiles[el[0]][el[1]].bomb ? 1 : 0), 0);
			this.n = neighbourBombs;
		}
	};

	function scramble(a, n) {
		var out = a
		do {
			out = out.sort(() => Math.random() > .5 ? 1 : -1);
		} while (n--)
		return out;
	}
	function start(){
		startTime = false;
		outG.clear();
		// prerandomize bombs
		
		var nrBombs = parseInt(nr * nc * levelCut, 10),
			tls = scramble(
				Array.from({length: nr*nc}, (_, i) => i < nrBombs),
				3
			);
		console.log({nrBombs, tls});
		for (var i = 0, j; i < nr; i++) {
			tiles[i] = [];
			for (j = 0; j < nc; j++) {
				var t = new Tile(i, j, tls[i*nc +j]);
				tiles[i].push(t);
			}
			outG.append(tiles[i].map(t => t.tag));
		}
		for (var i = 0, j; i < nr; i++) 
			for (j = 0; j < nc; j++) 
				tiles[i][j].setNumber();
			
		
	}
	start();
	document.body.addEventListener('keyup', function (e){
		if(e.key === 'n') start()
	});

	
	L.append(base, outG);
	L.render();
};