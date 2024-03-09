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
            {perc: 0, color: "#f00"},
            {perc: 10, color: "#f60"},
            {perc: 20, color: "#fa0"},
            {perc: 30, color: "#ff0"},
            {perc: 40, color: "#5f8"},
            {perc: 50, color: "#3a3"},
            {perc: 60, color: "#58f"},
            {perc: 70, color: "#15f"},
            {perc: 80, color: "#13a"},
            {perc: 90, color: "#73a"},
            {perc: 100, color: "#f43"},
        ], '0%', '0%', '100%', '100%'),
        gradIn = L.linearGradient([
            {perc: 0, color: "#000"},
            {perc: 100, color: "#222"},
        ], '0%', '0%', '100%', '100%'),
        gradIn2 = L.linearGradient([
            {perc: 0, color: "#000"},
            {perc: 100, color: "#222"},
        ], '0%', '0%', '130%', '130%'),
        bg = L.rect(0,0,w(1000),h(1000)).setAttributes({
            // fill:'#000',
            fill: gradIn,
            rx: h(140), 
            ry: h(140)
        }),
        image = L.image(0,0,width, height, './53.jpeg').setAttributes({opacity:  0.2});
        attrs = {
			"stroke-width" : h(0),
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
            .A(w(10), h(10), 0,0,0, w(300), h(460))
            .L(w(80), h(460))
            
            .L(w(80), h(160))
            .Z()
        ).setAttributes(attrs)
        .setAttributes({fill:grad}),
        p2 = L.path(L.pathBuild
            .M(w(215), h(270))
            .L(w(l), h(270))
            .A(w(5), h(5), 0,0,1, w(l), h(375))
            .L(w(425), h(375))
            .A(w(250), h(250), 0,0,1, w(550), h(550))
            .L(w(l), h(550))
            .A(w(10), h(10), 0,0,1, w(l), h(700))
            .L(w(490), h(700))
            .A(w(250), h(250), 0,0,0, w(215), h(370))
            .Z()
        )
        .setAttributes(attrs)
        .setAttributes({fill:gradIn2}),
        gp = L.group(),
        tattrs = {stroke:'white', 'font-size':'30px', fill:'white'}
        // f = L.text(w(900), h(900), "ƒɛɗɜɢ").setAttributes(tattrs),
        
        textGrp = L.group(),

        container.setAttributes({
            viewBox : "0 0 " + width + " " + height
        }).append(bg);
    // textGrp.append(f);
    // textGrp.move(-60, 30)
    // gp.append(p1,p2, textGrp);
    gp.append(p1, p2);

    // container.append(image);
    gp.move(10,0);
    L.append(title, container
        // ,rays
        , gp);

	L.render();
    document.body.appendChild(L.downloadAnchor());
};