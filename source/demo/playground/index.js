window.onload = function () {
	"use strict";
	var target = document.getElementById('trg'),
		
		width = 500,
		height = 500,
		
		L = Leonardo(
			width, height,
			{ns: '*'}
		).styles({
			border: '1px solid red'
		});

	var polyline = L.polyline(
			10,10,
			30,40,
			80, 50,
			80,10
		).setAttributes({
			fill: 'red',
			'stroke-width': 8.5,
			stroke: 'white',
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round'
		}),

		polygon = L.polygon(
			110, 110,
			130, 140,
			180, 150,
			180, 110
		).setAttributes({
			fill: 'blue',
			'stroke-width': 4.5,
			stroke: 'white'
		}),

		tria = L.polygon(
			300, 50,
			400, 150,
			200, 150
		).setAttributes({
			fill: 'pink',
			'stroke-width': 2,
			stroke: 'black'
		}),
		image = L.image(170, 100, 216, 216, 'https://avatars3.githubusercontent.com/u/1332338?v=3&s=460');
    
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
    var Arc = L.arcCentered(100, 100, 50, 0, 270).setAttributes({fill:'#ddd', stroke: 'red'});

	tria.rotate(20, 300, 50).move(10, 100);

    var centeredText = L.centeredText(502, 100, 'hello', {fill:'#ddd', stroke: 'red'});
    setInterval(function (){
        var now = new Date(),
            sec = now.getSeconds(),
            round = now.getMinutes() % 2;
        if (sec == 0) {
            centeredText.updateText(['even', 'odd'][round])
        }
    }, 1000)
    centeredText.on('click', function(){centeredText.updateText('world')})
	L.append(image, polyline, polygon, tria, centeredText, Arc).render({target: target});
    var t = 1e3
    L.fadeIn(t, Arc)
    setTimeout(() => {
        L.fadeOut(t, Arc)
    }, t)
    
};