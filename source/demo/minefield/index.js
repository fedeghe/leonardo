window.onload = function () {
	var target = document.getElementById('trg'),
		
		levelCut = 0.9,
		width = 900,
		height = 600,
		tileSize = 30,



		nr = height/tileSize,
		nc = width/tileSize,

color1 = '#333',
color2 = '#a60',

		L = Leonardo(width, height, {ns : '*', target : target}),
		
		base = L.rect(0, 0, width, height),
		outG = L.group(),
		getNeighbours = function (i,j){
			var hasTop = i > 0,
				hasBottom = i < nr-1,
				hasLeft = j > 0,
				hasRight = j < nc-1,
				neighbours = [];
			// topLeft
			hasTop && hasLeft && neighbours.push([i-1, j-1]);
			// top
			hasTop && neighbours.push([i-1, j]);
			// topRight
			hasTop && hasRight && neighbours.push([i-1, j+1]);
			// right
			hasRight && neighbours.push([i, j+1]);
			// bottomRight
			hasBottom && hasRight && neighbours.push([i+1, j+1]);
			// bottom
			hasBottom  && neighbours.push([i+1, j]);
			// bottomLeft
			hasBottom && hasLeft && neighbours.push([i+1, j-1]);
			// left
			hasLeft && neighbours.push([i, j-1]);
			// console.log({
			// 	hasTop,
			// 	hasBottom,
			// 	hasLeft,
			// 	hasRight
			// })


			return neighbours;
		};

	function Tile(i, j) {
		var self = this;
		this.i = i;
		this.j = j;
		this.solved = false;
		this.flagged = false;
		this.bomb = Math.random() > levelCut;
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
			// Math.floor(1 + Math.random()*6)//
		).setAttributes({
			stroke:'white',
			visibility: 'hidden',
			'font-family': 'verdana',
			'font-weight': 'bold',
			
			'font-size': 2*tileSize/3,
		});
		this.tag.append(this.tile, this.txt);
		this.tag.on('contextmenu', function (e){
			if (self.solved) return;
			self.onFlag(e);
		});

		this.tag.on('click', e => {
			if (self.solved) return;
			// console.log(e)
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
	}
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
	}
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
				{
					bombs:[],
					safe:[],
				}
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
		
	}
	Tile.prototype.solveNeighbours = function(){
		var neighbours = getNeighbours(this.i, this.j),
			unsolvedNeighbours = neighbours.filter(
				n => !tiles[n[0]][n[1]].solved
			);
			
				// console.log({neighbours, unsolvedNeighbours})
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
		
		var stats = tiles.reduce((acc, row) => {
			var res =  row.reduce((a,tile) => {
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
		console.log(JSON.stringify(stats, null, 2))
		
		if (stats.flaggedBombs === stats.bombs) alert('you won')
	};
	Tile.prototype.uncover = function(){
		
		this.tag.setAttributes({fill: 'black'});
		// console.log(`uncovering [${this.i}, ${this.j}] visible`);
		this.txt.setAttributes({visibility: 'visible'})
	};
	Tile.prototype.setNumber = function(){
		if (!this.bomb) {
			var neighbours = getNeighbours(this.i, this.j);
			neighbourBombs = neighbours.reduce((acc, el) => acc + (tiles[el[0]][el[1]].bomb ? 1 : 0), 0);
			this.n = neighbourBombs;
			this.txt.tag.innerHTML = neighbourBombs;
			var c = [
				'black',// 0
				'#46a', // 1
				'green', // 2
				'red', // 3
				'orange', // 4
				'yellow', // 5
				'white', // 6
				'azure', // 7
				'blue', // 8
			][neighbourBombs]
			this.txt.setAttributes({
				stroke: c,
				fill:c
			});
		}
	};
	var tiles = [];



	
	for (var i = 0; i < nr; i++) {
		tiles[i] = []
		for (var j = 0; j < nc; j++) {
			var t = new Tile(i, j);
			tiles[i].push(t);
		}
		outG.append(tiles[i].map(t =>t.tag));
	}

	// console.log(tiles)
	for (var i = 0; i < nr; i++) {
		for (var j = 0; j < nc; j++) {
			tiles[i][j].setNumber();
		}
	}

	
	L.append(base, outG);

	L.render({target: document.getElementById('trg')});

	
};