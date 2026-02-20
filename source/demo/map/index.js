window.onload = function () {
	var target = document.getElementById('trg'),
		size = 800,
		width = size,
		height = size,
		gridNum = 200,
		tileSize = size / gridNum,
		L = Leonardo(width, height, {ns : '*', target : target}),
		base = L.rect(0, 0, tileSize),
		/**
		 * border to border
		 */
		border = true;

	function Cell(x, y, alive){
		this.tag = base.clone();
		this.alive = alive;
		this.x = x;
		this.y = y;
		this.tag.move(
			this.x * tileSize,
			this.y * tileSize
		).setAttributes({
			fill: this.alive ? '#000' : 'transparent'
		});
	}
	Cell.prototype.setState = function (s) {this.alive = s;};



	function Matrix (target) {
		var self = this;
		
		this.data = Array.from({ length: gridNum}, (_, i) => 
			Array.from({ length: gridNum}, (_, j) => {
				var c = new Cell(i, j,  Math.random() > 0.5)
				c.tag.on('click', function(e) {
					if (e.shiftKey) {
						getNeighbours(self.data, c.x, c.y).forEach(n => n && n.setState(true));
					} else {
						c.setState(true);
					}
				});
				c.tag.on('mouseover', function(e) {
					if(e.metaKey) {
						getNeighbours(self.data, c.x, c.y).forEach(n => n && n.setState(true));
					}
				})
				return c
			})
		);
		this.data.forEach(row => row.forEach(cell => target.append(cell.tag)));
	}

	Matrix.prototype.getAliveNeighboursCount = function (r, c) {
		var self = this,
			neighbours = getNeighbours(this.data, r, c);
		return neighbours.reduce((acc, el) => {
			return acc + (el ? (self.data[el.x][el.y].alive ? 1 : 0) : 0);
		}, 0)
	};

	Matrix.prototype.calculateNextState = function () {
		var self = this,
			newState = this.data.map(
				(row, i) => row.map(
					(_, j) => {
						var n = self.getAliveNeighboursCount(i, j),
							newState = false; //default death
						if (n === 2) {
							newState = self.data[i][j].alive;
						} else if (n === 3) {
							newState = true;
						}
						return newState;
					}
				)
			);
		
		newState.forEach((row, i) => 
			row.forEach((v, j) => {
				self.data[i][j].alive = v;
				self.data[i][j].tag.setAttributes({
					fill: v ? '#f70' : 'transparent'
				})

			})
		);
		
		requestAnimationFrame(() => self.calculateNextState())
	};

	function getNeighbours(mat, r, c) {
		var els = border ? {
			rPlus: (r + 1 + gridNum) % gridNum,
			rMinus: (r - 1 + gridNum) % gridNum,
			cPlus: (c + 1 + gridNum) % gridNum,
			cMinus: (c - 1 + gridNum) % gridNum,
		} : {
			rPlus: r+1,
			rMinus: r-1,
			cPlus: c+1,
			cMinus: c-1,
		};
		return [
			mat?.[els.rMinus]?.[els.cMinus],
			mat?.[els.rMinus]?.[c],
			mat?.[els.rMinus]?.[els.cPlus],
			mat?.[r]?.[els.cMinus],
			
			// mat?.[r]?.[c],
			
			mat?.[r]?.[els.cPlus],
			mat?.[els.rPlus]?.[els.cMinus],
			mat?.[els.rPlus]?.[c],
			mat?.[els.rPlus]?.[els.cPlus],
		]
	}



	var m = new Matrix(L);
	
	m.calculateNextState();

	L.render({target: document.getElementById('trg')});

	document.body.appendChild(L.downloadAnchor());
};