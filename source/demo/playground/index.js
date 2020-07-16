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
		).setAttributes({
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
		).setAttributes({
			fill : 'blue',
			'stroke-width' : 4.5,
			'stroke' : 'white'
		}),

		tria = L.polygon(
			300, 50,
			400, 150,
			200, 150
		).setAttributes({
			fill : 'pink',
			'stroke-width' : 2,
			'stroke' : 'black'
		}),
		image = L.image(170, 100, 216, 216, 'https://avatars3.githubusercontent.com/u/1332338?v=3&s=460');
		// image = L.image(0, 0, 416, 216, 'https://www.swr.de/-/id=23949308/property=full/1crxui5/da%20Vinci%20war%20ein%20vielseitig%20interessierter,%20talentierter%20K%C3%BCnstler.jpg');
	
	image.on('click', function (e) {
		console.log(e.target);
		console.log(e);
	});
	tria.on('click', function (e) {
		console.log(e.target);
		console.log(e);
    });
    polygon.once('click', function (e) {
		console.log('This callback will run just once');
		console.log(e.target);
		console.log(e);
	});

	tria.rotate(20, 300, 50).move(10, 100);

	L.append(image, polyline, polygon, tria).render({target: target});
};