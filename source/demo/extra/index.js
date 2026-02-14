window.onload = function () {
	var target = document.getElementById('trg'),
		width = 800,
		height = 800,
		L = Leonardo(width, height, {ns : '*', target : target}),
		g = L.group();

	var tbox = L.textBox('Some text here', 500, 80, {
		fill: 'red',
		stroke:'white',
		'font-size': '2em',
		'font-family': 'verdana',
		'font-weight': 'bold'
	}, 'green');

	g.append(tbox);

	var tPath = L.textPath(
		L.pathBuild
            .M(10, 300)
            .A(100, 100, 0,0,0, 200, 100),
		'T e x t P a t h - I s - T h e r e - F o r - Y o u'
	).sas({
		fill:'yellow'
	})
	g.append(tPath);


	var arc = L.arcCentered(100, 100, 50, 0, 270).sas({
		fill:'transparent',
		stroke: 'red',
		'stroke-width': 3
	});
	g.append(arc);
	
	var arcSec = L.arcSection(300, 300, 100, 70, 0, 135).sas({
		stroke:'green',
		'stroke-width': 5,
		fill: 'white'
	});
	var arcSec2 = L.arcSection(200, 200, 0, 70, 0, 90).sas({
		stroke:'green',
		'stroke-width': 5,
		fill: 'white'
	});
	
	g.append(arcSec);
	g.append(arcSec2);

	L.append(g);
	L.render();
};