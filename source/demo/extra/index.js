window.onload = function () {
	var target = document.getElementById('trg'),
		width = 800,
		height = 800,
		L = Leonardo(width, height, {ns : '*', target : target}),
		g = L.group();

	var tbox = L.textBox('Some text here is going over the rest', 500, 80, {
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


	var cText = L.centeredText(
		500, 100,
		'Some text here is going over the rest',
		{
			fill: 'red',
			stroke: 'white',
			'font-size': '2em',
			'font-family': 'verdana',
			'font-weight': 'bold'	
		}
	).move(0, 100);
	g.append(cText);


	L.append(g);
	L.render();
};