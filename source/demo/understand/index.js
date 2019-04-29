window.onload = function () {

    var target = document.getElementById('trg'),
        speedTuner = document.getElementById('speed'),
		speed = 0.5,
		width = 500,
		height = 500,
		w20 = width/20,
		h20 = height/20,
		
		L = Leonardo(width, height, {ns : '*', target : target}),
		
		textsG = L.group(),
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
		
		texts = [],
		circles = [],
		
		text1 = L.text(10, 10, "WHAT I THINK").move(w20*5, h20*1.5),
		text2 = L.text(10, 10, "WHAT I WRITE").move(w20*6, h20*2.5),
		text3 = L.text(10, 10, "WHAT I SAY").move(w20*7, h20*3.5),
        text4 = L.text(10, 10, "WHAT OTHERS UNDESTAND").move(w20*8, h20*5),
        minWH2 = Math.min(width, height)/2,

		circle1 = L.circle(w20 * 10, h20 * 10, 1 * minWH2).attrs({fill : '#FF0D28'}),
		circle2 = L.circle(w20 * 10, h20 * 11, 0.9 * minWH2).attrs({fill : '#F59908'}),
		circle3 = L.circle(w20 * 10, h20 * 12, 0.8 * minWH2).attrs({fill : '#F9F90F'}),
		circle4 = L.circle(w20 * 10, h20 * 13, 0.7 * minWH2).attrs({fill : '#3BC439'}),
		circle5 = L.circle(w20 * 10, h20 * 14, 0.6 * minWH2).attrs({fill : '#495BEB'}),
		circle6 = L.circle(w20 * 10, h20 * 15, 0.5 * minWH2).attrs({fill : '#AB47DF'}),
		circle7 = L.circle(w20 * 10, h20 * 16, 0.4 * minWH2).attrs({fill : '#E475ED'}),
		circle8 = L.circle(w20 * 10, h20 * 17, 0.3 * minWH2).attrs({fill : 'pink'}),
		circle9 = L.circle(w20 * 10, h20 * 18, 0.2 * minWH2).attrs({fill : 'white'});

	texts.push(text1, text2, text3, text4);

	cg9.add(circle9);
	cg8.add(circle8, cg9);
	cg7.add(circle7, cg8);
	cg6.add(circle6, cg7);
	cg5.add(circle5, cg6);
	cg4.add(circle4, cg5);
	cg3.add(circle3, cg4);
	cg2.add(circle2, cg3);
	cg1.add(circle1, cg2);
	circles.push(cg1);

	textsG.add(texts).attrs({
		"stroke-width" : 1.5,
		"stroke" : 'white'
	});;
	circlesG.add(circles).attrs({
		"stroke-width" : 2.5,
		"stroke" : 'black',
		fill : 'transparent'
	});
	
	L.add(circlesG);
	
	[cg2, cg3, cg4, cg5, cg6, cg7, cg8, cg9].forEach(function (el, i) {
		var versus = i % 2 ? -1 : 1;
		L.animate.pCart(el, function (x, t) {
			return  w20 * Math.sin(t * speed * versus);
		},function (y, t) {
			return -w20 + w20 * Math.cos(t * speed); //here versus is not influent since cos is simmetric
		});
	});

	L.render(target);
    document.body.appendChild(L.downloadAnchor());
    
    speedTuner.value = speed;
    speedTuner.addEventListener('change', function() {
        speed = parseFloat(this.value, 10);
    })
};