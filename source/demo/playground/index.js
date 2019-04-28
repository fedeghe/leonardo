window.onload = function () {
	"use strict";
	var target = document.getElementById('trg'),
		
		width = 500,
		height = 500,
		
		L = Leonardo(
			width, height,
			{ns : '*'}
		).styles({
			border: '1px solid red'
		});

	var polyline = L.polyline(
			10,10,
			30,40,
			80, 50,
			80,10
		).attrs({
			fill : 'red',
			'stroke-width' : 8.5,
			'stroke' : 'white',
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round'
		}),

		polygon = L.polygon(
			110, 110,
			130, 140,
			180, 150,
			180, 110
		).attrs({
			fill : 'blue',
			'stroke-width' : 4.5,
			'stroke' : 'white'
		}),

		tria = L.polygon(
			300, 50,
			400, 150,
			200, 150
		).attrs({
			fill : 'pink',
			'stroke-width' : 2,
			'stroke' : 'black'
		}),
		image = L.image(200, 100, 216, 216, 'https://avatars3.githubusercontent.com/u/1332338?v=3&s=460');
	
	image.on('click', function (e) {
		console.log(e.target);
		console.log(e);
	});
	tria.on('click', function (e) {
		console.log(e.target);
		console.log(e);
	});

	tria.rotate(20, 300,50).move(10, 100);

	L.add(polyline, polygon, image, tria).render(target);
};