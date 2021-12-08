window.onload = function () {
	var target = document.getElementById('trg'),
        // REF
        devSize = 1000,
        width = devSize,
        height = devSize,
        zoom = 1,
		L = Leonardo(width * zoom, height * zoom, {id : 'hero', target}),
		title = L.title('hero'),
		container = L.group().setAttributes({
            fill: '#0000FF'
        }),
		w = function (i) {return devSize * i/1E3 * zoom;},
		h = function (i) {return devSize * i/1E3 * zoom;},
        justLine = {
			"stroke-width" : h(80),
			"stroke" : 'red',
			"stroke-opacity" : 1,
			"fill-opacity" : 1,
			"stroke-linejoin" : "round",
			fill : '#f7df1e'
		};
    
    
    var bg = L.rect(0,0,w(1000),h(1000)).setAttributes({fill: '#0000FF'}),
        j = L.text(w(250), h(600), 'J').setAttributes({
            'font-size' : h(450),
            'font-family' : 'Helvetica',
            fill:'#0000ff',
            "stroke" : '#ff0000',
            "stroke-width" : h(50),
        }),
        s = L.text(w(465), h(610), 'S').setAttributes({
            'font-size' : h(450),
            'font-family' : 'Helvetica',
            fill:'#0000ff',
            "stroke" : '#ff0000',
            "stroke-width" : h(50),
        }),
    brdExt = L.path(L.pathBuild
        .M(w(200), h(230))

        .L(w(800), h(230))

        .L(w(910), h(400))

        .L(w(500), h(850))

        .L(w(90), h(400))
        .Z()
    ).setAttributes(justLine);

    container.setAttributes({
        viewBox : "0 0 " + width + " " + height
    }).append(brdExt);

    L.append(title, bg, container, j, s);

	L.render();
    document.body.appendChild(L.downloadAnchor());
};