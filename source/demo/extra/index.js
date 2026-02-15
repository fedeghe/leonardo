window.onload = function () {
	var target = document.getElementById('trg'),
		width = 800,
		height = 800,
		L = Leonardo(width, height, {ns : '*', target : target}),
		g = L.group();




	
	g.append(
		L.textBox('Some text here', 500, 80, {
			fill: 'red',
			stroke:'white',
			'font-size': '2em',
			'font-family': 'verdana',
			'font-weight': 'bold'
		}, {fill: 'green'}, 190),
		L.textPath(
			L.pathBuild
				.M(10, 300)
				.A(100, 100, 0,0,0, 200, 100),
			'T e x t P a t h - I s - T h e r e - F o r - Y o u'
		).sas({
			fill:'yellow'
		}),
		
		L.arcSection(400, 200, 0, 70, 0, 90).sas({
			stroke:'green',
			'stroke-width': 5,
			fill: 'white'
		}),

		L.arcSection(400, 200, 30, 60, 30, 105).sas({
			stroke:'red',
			'stroke-width': 5,
			fill: 'gray'
		}),
		
		L.arcSection(400, 200, 50,120, 95, 280).sas({
			stroke:'blue',
			'stroke-width': 3,
			fill: '#ff770055'
		}),
		L.arcSection(400, 200, 0, 90, 160, 270).sas({
			stroke:'red',
			'stroke-width': 1,
			"stroke-linejoin": 'round',
			fill: '#ffffff66'
		}),
		L.arcSection(400, 200, 50, 80, 270, 320).sas({
			stroke:'red',
			'stroke-width': 1,
			"stroke-linejoin": 'round',
			fill: '#ff000055'
		}),
		L.arcSection(400, 200, 20, 50, 270, 320).sas({
			stroke:'orange',
			'stroke-width': 1,
			"stroke-linejoin": 'round',
			fill: 'transparent'
		}),
		L.arcSection(400, 600, 20, 50, 0, 320,0,1).sas({
			stroke:'orange',
			'stroke-width': 1,
			"stroke-linejoin": 'round',
			fill: 'green'
		})

	);

	L.append(g);
	L.render();
};