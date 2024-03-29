window.onload = function () {

    var target = document.getElementById('trg'),
        speedTuner = document.getElementById('speed'),
        rndTuner = document.getElementById('rnd'),
        speed = 0.5,
        rnd = false,
		width = 500, height = 500,
        hm = 20,
		w20 = width / hm, h20 = height / hm,
		
		L = Leonardo(width, height, {ns : '*', target : target}),
		
		circlesG = L.group(),
		cg1 = L.group(),
		cg2 = L.group(),
		cg3 = L.group(),
		cg4 = L.group(),
		cg5 = L.group(),
		cg6 = L.group(),
		cg7 = L.group(),
		cg8 = L.group(),
		cg9 = L.group(),
		
		circles = [],
		
		text1 = L.text(0, 0, "THINK").setAttributes({'font-size': 30}).move(w20 * 8.15, h20 * 18.5),
        minWH2 = Math.min(width, height) / 2,

		circle1 = L.circle(w20 * 10, h20 * 10, 1 * minWH2).setAttributes({fill : '#FF0D28'}),
		circle2 = L.circle(w20 * 10, h20 * 11, 0.9 * minWH2).setAttributes({fill : '#F59908'}),
		circle3 = L.circle(w20 * 10, h20 * 12, 0.8 * minWH2).setAttributes({fill : '#F9F90F'}),
		circle4 = L.circle(w20 * 10, h20 * 13, 0.7 * minWH2).setAttributes({fill : '#3BC439'}),
		circle5 = L.circle(w20 * 10, h20 * 14, 0.6 * minWH2).setAttributes({fill : '#495BEB'}),
		circle6 = L.circle(w20 * 10, h20 * 15, 0.5 * minWH2).setAttributes({fill : '#AB47DF'}),
		circle7 = L.circle(w20 * 10, h20 * 16, 0.4 * minWH2).setAttributes({fill : '#E475ED'}),
		circle8 = L.circle(w20 * 10, h20 * 17, 0.3 * minWH2).setAttributes({fill : 'pink'}),
		circle9 = L.circle(w20 * 10, h20 * 18, 0.2 * minWH2).setAttributes({fill : 'white'});

	cg9.append(circle9, text1);
	cg8.append(circle8, cg9);
	cg7.append(circle7, cg8);
	cg6.append(circle6, cg7);
	cg5.append(circle5, cg6);
	cg4.append(circle4, cg5);
	cg3.append(circle3, cg4);
	cg2.append(circle2, cg3);
    cg1.append(circle1, cg2);
    
	circles.push(cg1);

	circlesG.append(circles).setAttributes({
		"stroke-width" : 2.5,
		"stroke" : 'black',
		fill : 'transparent'
	});
	
	L.append(circlesG);
	
	[cg2, cg3, cg4, cg5, cg6, cg7, cg8, cg9].forEach(function (el, i) {
		var versus = i % 2 ? -1 : 1;
		L.animate.cartesian(el, function (x, t) {
			return  w20 * (rnd ? Math.random() : 1) * Math.sin(t * speed * versus);
		},function (y, t) {
			return -w20 + w20  * (rnd ? Math.random() : 1) * Math.cos(t * speed); //here versus is not influent since cos is simmetric
		});
    });

    L.render({target: target});
    
    speedTuner.value = speed;
    speedTuner.addEventListener('change', function() {
        speed = parseFloat(this.value, 10);
    });
    rndTuner.addEventListener('change', function() {
        rnd = !!this.checked;
    });

    document.body.appendChild(L.downloadAnchor());
};