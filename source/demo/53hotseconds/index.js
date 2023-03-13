window.onload = function () {
	var target = document.getElementById('trg'),
        // REF
        devSize = 2**10,
        width = devSize,
        height = devSize,
        zoom = 1,
		L = Leonardo(width * zoom, height * zoom, {id : 'hero', target}),
		title = L.title('53 hot seconds'),
		container = L.group(),
		logo = L.group(),

        w = function (i) {return devSize * i/1E3 * zoom;},
		h = function (i) {return devSize * i/1E3 * zoom;},

        bg = L.rect(0,0,w(1000),h(1000)).setAttributes({
            fill: L.radialGradient([
                
                { perc: 10, color: '#000000' },
                { perc: 20, color: '#330000' },
                { perc: 90, color: '#cc0000' },
                
                { perc: 100, color: '#ee0000' },
            ]),
            rx: h(140), 
            ry: h(140)
        }),
        oneOnRad2 = w(500) / Math.sqrt(2),
        mid = w(80),
        lines = [
            L.line(0,0,w(1000),h(1000)),
            L.line(w(1000),0,0,h(1000)),
            L.line(w(500),0,w(500),h(1000)),
            L.line(w(0),h(500),w(1000),h(500)),
            L.circle(w(500), h(500), h(500)),

            L.rect(w(500) -oneOnRad2, w(500) -oneOnRad2, 2*oneOnRad2, 2*oneOnRad2),
            L.rect(mid, mid, w(1000)- 2 * mid, w(1000)- 2 * mid),
            
            
        ].map(l => l.setAttributes({  
            'font-weight':'bold',
			"stroke": '#ffffff',
            opacity:'0.3',
            fill: 'transparent'
        })),

        family = "Verdana", //Arial

        J = L.text(w(30), h(532), "5").setAttributes({
            'font-size' : h(600),
            'font-family' : family,
            "stroke-width": h(20),
            'font-weight':'bold',
			"stroke": '#ffffff',
            fill:'black'
        }),
        S = L.text(w(522), h(532), "3").setAttributes({
            'font-size' : h(600),
            'font-family' : family,
            "stroke-width": h(20),
            'font-weight':'bold',
			"stroke": '#ffffff',
            fill:'black'
        }),
        J2 = J.clone().move(w(10), h(10)).setAttributes({
            'opacity' : 0.4
        }),
        S2 = S.clone().move(w(10), h(10)).setAttributes({
            'opacity' : 0.4
        }),
        hot =  L.text(w(248), h(770), "HOT").setAttributes({
            'font-size' : h(200),
            'font-family' : family,
            // "stroke-width": h(10),
			// "stroke": '#ffffff',
            'font-weight':'bold',
            fill:'white'
        }),
        seconds =  L.text(w(171), h(916), "seconds").setAttributes({
            'font-size' : h(150),
            'font-family' : family,
            // "stroke-width": h(10),
			// "stroke": '#ffffff',
            'font-weight':'bold',
            fill:'white'
        });

    container.setAttributes({
        viewBox : "0 0 " + width + " " + height
    }).append(bg);

    logo.append(J, J2, S, S2, hot, seconds, lines);

    container.append(logo);
    L.append(
        title,
        // bg, 
        container//.scale(0.8)//.move(w(35), h(165)),
        // brdIn,
        // brdOut,
        // J, J2,
        // S, S2
    );

	L.render();
    document.body.appendChild(L.downloadAnchor());
};