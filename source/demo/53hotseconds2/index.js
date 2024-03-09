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

        // w = function (i) {return width * i/1E3 * zoom;},
		// h = function (i) {return height * i/1E3 * zoom;},
        w = L.getScaler(width, 1e3, zoom),
        h = L.getScaler(height, 1e3, zoom),
        grad = L.linearGradient([
            {perc: "0", color: "#f00"},
            {perc: "10", color: "#f60"},
            {perc: "20", color: "#fa0"},
            {perc: "30", color: "#ff0"},
            {perc: "40", color: "#5f8"},
            {perc: "50", color: "#3a3"},
            {perc: "60", color: "#58f"},
            {perc: "70", color: "#15f"},
            {perc: "80", color: "#13a"},
            {perc: "90", color: "#73a"},
            {perc: "100", color: "#f43"},
        ], '0%', '0%', '100%', '100%'),
        bg = L.rect(0,0,w(1000),h(1000)).setAttributes({
            fill:grad,
            rx: h(140), 
            ry: h(140)
        }),
        image = L.image(0,0,width, height, './53.jpeg').setAttributes({opacity:  0.2});
        attrs = {
			"stroke-width" : h(20),
			"stroke" : 'white',
			"stroke-opacity" : 1,
			"fill-opacity" : 1,
			"stroke-linejoin" : "round",
			fill : 'none'
		},
        l = 700,
        
        p1 = L.path(L.pathBuild
            .M(w(150), h(130))
            .L(w(l), h(130))
            .A(w(11), h(10), 0,0,1, w(l), h(460))
            .A(w(11), h(10), 0,0,1, w(l), h(870))
            .L(w(150), h(870))
            .L(w(80), h(840))
            .L(w(80), h(l))
            .L(w(300), h(l))
            .A(w(10), h(10), 0,0,0, w(300), h(550))
            .L(w(80), h(550))
            .L(w(80), h(550))
            .L(w(80), h(160))
            .Z()
        ).setAttributes(attrs).setAttributes({fill:'#000'}),
        p2 = L.path(L.pathBuild
            .M(w(215), h(270))
            .L(w(l), h(270))
            .A(w(5), h(5), 0,0,1, w(l), h(375))
            .L(w(425), h(375))
            .A(w(250), h(250), 0,0,1, w(550), h(550))
            .L(w(l), h(550))
            .A(w(10), h(10), 0,0,1, w(l), h(700))
            .L(w(490), h(700))
            .A(w(250), h(250), 0,0,0, w(210), h(370))
            .Z()
        )
        .setAttributes(attrs).setAttributes({fill:grad}),
        

        rad = Math.sqrt(2),
        d = 100,
        len = 2000,
        rays = [
            L.rect(w(0), h(0), w(len), h(d)).rotate(-45, w(0), h(1*d*rad)).setAttributes({fill: '#f00'}),
            L.rect(w(0), h(1*d*rad), w(len), h(d)).rotate(-45, w(0), h(2*d*rad)).setAttributes({fill: '#f60'}),
            L.rect(w(0), h(2*d*rad), w(len), h(d)).rotate(-45, w(0), h(3*d*rad)).setAttributes({fill: '#fa0'}),
            L.rect(w(0), h(3*d*rad), w(len), h(d)).rotate(-45, w(0), h(4*d*rad)).setAttributes({fill: '#ff0'}),
            L.rect(w(0), h(4*d*rad), w(len), h(d)).rotate(-45, w(0), h(5*d*rad)).setAttributes({fill: '#5f8'}),
            L.rect(w(0), h(5*d*rad), w(len), h(d)).rotate(-45, w(0), h(6*d*rad)).setAttributes({fill: '#3a3'}),
            L.rect(w(0), h(6*d*rad), w(len), h(d)).rotate(-45, w(0), h(7*d*rad)).setAttributes({fill: '#58f'}),
            L.rect(w(0), h(7*d*rad), w(len), h(d)).rotate(-45, w(0), h(8*d*rad)).setAttributes({fill: '#15f'}),
            L.rect(w(0), h(8*d*rad), w(len), h(d)).rotate(-45, w(0), h(9*d*rad)).setAttributes({fill: '#13a'}),
            L.rect(w(0), h(9*d*rad), w(len), h(d)).rotate(-45, w(0), h(10*d*rad)).setAttributes({fill: '#73a'}),
            L.rect(w(0), h(10*d*rad), w(len), h(d)).rotate(-45, w(0), h(11*d*rad)).setAttributes({fill: '#f4e'}),
            L.rect(w(0), h(11*d*rad), w(len), h(d)).rotate(-45, w(0), h(12*d*rad)).setAttributes({fill: '#f00'}),
        ]
        container.setAttributes({
            viewBox : "0 0 " + width + " " + height
        }).append(bg);

    // container.append(image);
    
    L.append(title, container
        // ,rays
        , p1, p2);

	L.render();
    document.body.appendChild(L.downloadAnchor());
};