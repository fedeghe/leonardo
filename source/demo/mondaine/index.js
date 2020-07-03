(function () {
    'use strict';

    var viewPortWidth = window.innerWidth || documentElement.clientWidth,
        qs = Leonardo.getqs(),
        target = document.getElementById('trg'),    
        maxSize = 800,
        size = Math.min(viewPortWidth, maxSize),
        ticksPerSecond = 20,
		nowH = (new Date).getHours(),
		theme = ('theme' in qs && qs.theme.match(/white|black/)) ? qs.theme : (nowH > 7 && nowH < 17 ) ? 'white' : 'black', 
		themes = {
			white : {
				background : 'white',
				color : 'black',
				secColor : "#CC281E",
				img : '/media/sbb-logo.png'
			},
			black : {
				background : 'black',
				color : 'white',
				secColor : "#CC281E",
				img : '/media/sbb-logo-inverted.png'
			}
		},
		width = size,
		height = size,
		L = Leonardo(width, height),

		container = L.group(),
		
		cx = width / 2, cy = height / 2,

		cir0 = L.circle(cx, cy, size / 2.2),

		circle = L.circle(cx, cy, size / 2.5),

		border = L.group(),
		secs = L.group().attrs({ id: 'seconds' }),
			secs1 = L.circle(0, height * 0.245, width / 40),
			secs2 = L.line(0, height * 0.26, 0, height * 0.62),
			secs3 = L.circle(0, height / 2, width / 85),

		mins = L.group().add(L.polygon(
			cx - width * 0.028 , cy + height * 0.09,
			cx - width * 0.018 , size * 0.125,
			cx + width * 0.018 , size * 0.125,
			cx + width * 0.028 , cy + height * 0.09
		)).attrs({ id: 'minutes' }),
		hours = L.group().add(L.polygon(
			cx - width * 0.028 , cy + height * 0.09,
			cx - width * 0.018	 , cy - height * 0.26,
			cx + width * 0.018 , cy - height * 0.26,
			cx + width * 0.028 , cy + height * 0.09
		)).attrs({ id: 'hours' }),
		text = L.text(cx * 0.78,cy * 0.7, "MONDAINE"),				
		textSM = L.textPath("smade",
			L.pathBuild
			.M(cx * 0.925, size * 0.89 * 0.995)
			.Q(cx, size * 0.89, cx * 1.075, size * 0.89 * 0.995),
			"swiss made"
		),
		image = L.image(cx - size / 10, cy * 0.7, size / 5, size / 20, themes[theme].img),

		filt = L.filters().rGrad({ // radial
			"90" : "#aa0",
			"95" : "#550",
			"100" : "#ff0"
		}),
		filt2 = L.filters().lGrad({ // linear
			"0" : "#0a0",
			"5" : "#00a",
			"95" : "#aa0",
			"100" : "#f00"
		}),
		filt3 = L.filters().rGrad({ // radial
			"0" : "#fff",
			"90" : "#888",
			"94" : "#aaa",
			"97" : "#aaa",
			"100" : "#fff"
		});

	L.add(container);
	border.add(cir0).attrs({fill: filt3});

	container
		.attrs({viewBox: [0, 0, size, size].join(' ')})
		.add(border, circle);

	(function() {
		var small = L.line(cx, size * 0.135, cx, height * 0.16),
			big = L.line(cx, size * 0.135, cx, height * 0.215),
			tmp, i;

		big.attrs({
			"stroke-width" : size / 40,
			"stroke" : themes[theme].color
		});
		small.attrs({
			"stroke-width" : size / 80,
			"stroke" : themes[theme].color
		});

		for (i = 0; i < 60 ; i++){
			if ((i * 6) % 5 == 0) {
				tmp = big.clone();
			} else {
				tmp = small.clone();
			}
			tmp.rotate(i * 6, cx, cy);
			container.add(tmp);
		}	
	})();

	circle.styles({"fill" : themes[theme].background});

	secs.add(secs1, secs2, secs3)
		.attrs({
			"fill" : themes[theme].secColor,
			"stroke" : themes[theme].secColor,
			"stroke-width" : size / 80
		})
		.move(cx, 0);

	hours.attrs({"fill" : themes[theme].color})
	mins.attrs({"fill" : themes[theme].color})
	
	text.attrs({'font-size' : size / 25, 'fill' : themes[theme].color})
	textSM.attrs({'font-size' : size / 70, 'fill' : themes[theme].color})

	container.add(image, text, textSM, hours, mins, secs);
	
	target.style.width = size + 'px';

	

	function getTime(gmtHmove, gmtMmove) {
		var time0 = new Date();
		return arguments.length ? new Date(Date.UTC(
			time0.getFullYear(),
			time0.getMonth(),
			time0.getDay(),
			time0.getHours() + gmtHmove,
			time0.getMinutes()+ (gmtMmove || 0),
			time0.getSeconds(),
			time0.getMilliseconds()
		)) : time0;
	}

	window.setInterval(function () {	
		var	time = getTime(),
			ms = time.getMilliseconds(), 
			s = time.getSeconds(),
			m = time.getMinutes(),
			h = time.getHours() % 12,
			fact = 60;

		secs.rotate((s + ms / 1E3) * 6, cx, cy);
		mins.rotate((m * fact + s + ms / 1E3) * 0.1, cx, cy);
		hours.rotate((h * fact + m + s / fact) * (360 / (12 * fact)) , cx, cy);
    }, 1000 / ticksPerSecond);

    window.setTimeout(function () {
        L.render({target: target, cb: function () {
            console.log('rendered')
        }});	
    }, 200)
})();