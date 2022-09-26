window.onload = function () {

	var target = document.getElementById('trg'),
        ratio = 3,
		size = 900,
		width = size,
		height = size / ratio,
		center = {
			x : width / 2,
			y : height / 2
		},
		L = Leonardo(width, height, {id : 'hero', target}),
		title = L.title('hero'),
		container = L.group(),
		w = function (i) {return i * width / 100;},
		h = function (i) {return i * height / 100;},
        bgcolor = 'rgba(200, 200, 200, 1)'
        base = L.rect(0, 0, width, height).setAttributes({
			fill : bgcolor,
        }),
		G = L.text(w(12), h(58), 'g↓').setAttributes({
            "font-size": h(50),
            "font-family": 'times',
        }),
		HERO = L.text(w(32), h(80), 'HERO').setAttributes({}),
        GIZMO = L.group(),
        
        stroke = 10,
        r = h(30),
        color2 = 'blue',
        TRI = L.polyline(w(30), h(95), w(35), h(80), w(25), h(80)).setAttributes({fill : color2})
        
		justLine = {
			// "stroke-width" : h(8),
			"stroke" : 'black',
            "font-size": h(80),
			"stroke-opacity" : h(0.1),
			
			"stroke-linejoin" : "round",
            "font-family": 'impact',
			fill : 'black'
		};

	container.setAttributes({viewBox : "0 0 " + size + " " + size, ...justLine});

	container.append(base, G, HERO);

	L.append(title, container);

	L.render();
    document.body.appendChild(L.downloadAnchor('download as svg'))

};