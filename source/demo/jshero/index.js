window.onload = function () {
	var target = document.getElementById('trg'),
        // REF
        devSize = 512,
        width = devSize,
        height = devSize,
        zoom = 1,
		L = Leonardo(width * zoom, height * zoom, {id : 'hero', target}),
		title = L.title('jshero'),
		container = L.group(),
		w = function (i) {return devSize * i/1E3 * zoom;},
		h = function (i) {return devSize * i/1E3 * zoom;},
        
        fillStyle = {
			"stroke-width": h(80),
			"stroke": '#dd0000',
			"stroke-opacity": 1,
			"fill-opacity": 1,
			"stroke-linejoin": "miter",
			fill: '#efda4f'
		},

        brdStyle = {
			"stroke-width": h(20),
			"stroke": 'black',
			"stroke-opacity": 1,
			"stroke-linejoin": "miter",
			fill: 'none'
		},

        bg = L.rect(0,0,w(1000),h(1000)).setAttributes({
            fill: L.radialGradient([
                { perc: 0, color: '#000000' },
                { perc: 30, color: '#000000' },
                { perc: 100, color: '#0000aa' },
            ]),
            rx: h(140), 
            ry: h(140)
        }),
        
        brdFill = L.path(L.pathBuild
            .M(w(200), h(230))

            .L(w(800), h(230))

            .L(w(910), h(400))

            .L(w(500), h(850))

            .L(w(90), h(400))
            .Z()
        ).setAttributes(fillStyle),

        brdIn = L.path(L.pathBuild
            .M(w(177), h(190))
            .L(w(823), h(190))
            .L(w(960), h(405))
            .L(w(500), h(910))
            .L(w(40), h(405))
            .Z()
        ).setAttributes(brdStyle),

        brdOut = L.path(L.pathBuild
            .M(w(222), h(269))
            .L(w(778), h(269))
            .L(w(860), h(396))
            .L(w(500), h(792))
            .L(w(140), h(396))
            .Z()
        ).setAttributes(brdStyle),
        family = "Arial",
        J = L.text(w(260), h(580), "J").setAttributes({
            'font-size' : h(440),
            'font-family' : family,
            color:'black'
        }),
        S = L.text(w(460), h(590), "S").setAttributes({
            'font-size' : h(440),
            'font-family' : family,
            color:'black'
        }),
        J2 = J.clone().move(w(10), h(10)).setAttributes({
            'opacity' : 0.4
        }),
        S2 = S.clone().move(w(10), h(10)).setAttributes({
            'opacity' : 0.4
        });

    container.setAttributes({
        viewBox : "0 0 " + width + " " + height
    }).append(brdFill);

    L.append(title,
        bg, 
        container,
        // bgimg,
        brdIn,
        brdOut,
        J, J2,
        S, S2
    );

	L.render();
    document.body.appendChild(L.downloadAnchor());
};