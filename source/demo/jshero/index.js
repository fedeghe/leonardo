window.onload = function () {
	var target = document.getElementById('trg'),
        // REF
        width = 260,
        height = 200,
        zoom = 5,
		center = {
			x : width / 2,
			y : height / 2
		},
		L = Leonardo(width * zoom, height * zoom, {id : 'hero'}),
		title = L.title('hero'),
		container = L.group(),
		w = function (i) {return i * zoom;},
		h = function (i) {return i * zoom;},
        justLine = {
			"stroke-width" : h(5),
			"stroke" : 'black',
			"stroke-opacity" : 1,
			"fill-opacity" : 1,
			"stroke-linejoin" : "round",
			fill : 'none'
		},
        ifact = 0.74,
        image = L.image(245, 20, 1100*ifact, 820*ifact, '/media/js.png').setAttributes({opacity: 0.5});
    
    container.setAttributes({viewBox : "0 0 " + width + " " + height});
    
    var brdExt = L.path(L.pathBuild
        .M(w(50), h(10))

        .L(w(210), h(10))

        .L(w(250), h(50))

        .L(w(130), h(190))

        .L(w(10), h(50))
        .Z()
    );
    brdExt.setAttributes(justLine);
	brdExt.setAttributes({fill : 'yellow'});
    container.append(brdExt);
    L.append(title, container, image);

	L.render({target: target});
};