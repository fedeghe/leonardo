window.onload = function () {

	var target = document.getElementById('trg'),
		
		width = 500,
		height = 500,
		w20 = width/20,
		h20 = height/20,
		
		L = Leonardo(width, height, {ns : '*'});

	var polyline = L.polyline(
			10,10,
			30,40,
			80, 50,
			80,10
		).attrs({
			fill : 'red',
			"stroke-width" : 1.5,
			"stroke" : 'white'
		}),

		polygon = L.polygon(
			110, 110,
			130, 140,
			180, 150,
			180, 110
		).attrs({
			fill : 'green',
			"stroke-width" : 1.5,
			"stroke" : 'white'
		});



	L.add(polyline, polygon);
	
	L.render(target);
};