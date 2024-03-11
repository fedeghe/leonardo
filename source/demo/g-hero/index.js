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
        w = L.getScaler(width),
        h = L.getScaler(height),
        bgcolor = 'rgba(200, 200, 200, 1)'
        base = L.rect(0, 0, width, height).setAttributes({
			fill : bgcolor
        }),
		G = L.text(w(5), h(80), 'G'),
		HERO = L.text(w(40), h(80), 'HERO').setAttributes({
			"text-align" : 'right'
        }),
        GIZMO = L.group(),
        center = { x: w(30), y: h(53)},
        stroke = 15,
        r = h(30),
        ARRup = L.line(center.x, center.y, center.x, center.y - r).setAttributes({
            "stroke" : 'blue',
            "stroke-width" : h(stroke),
            "stroke-opacity" : 1,
            "stroke-lincap": "miter" 
        }),
        ARRleft = L.line(
            center.x,
            center.y,
            center.x - r * Math.sin(Math.PI / 3),
            center.y + r * Math.cos(Math.PI / 3)
        ).setAttributes({
            "stroke" : 'blue',
            "stroke-width" : h(stroke),
            "stroke-opacity" : 1,
        }),
        ARRright = L.line(
            center.x,
            center.y,
            center.x + r * Math.sin(Math.PI / 3),
            center.y + r * Math.cos(Math.PI / 3)
        ).setAttributes({
            "stroke" : 'blue',
            "stroke-width" : h(stroke),
            "stroke-opacity" : 1,
        }),
		justLine = {
			// "stroke-width" : h(8),
			"stroke" : 'black',
            "font-size": h(80),
			"stroke-opacity" : h(0.1),
			
			"stroke-linejoin" : "round",
            "font-family": 'impact',
			fill : 'black'
		};
    GIZMO.append(ARRup, ARRleft, ARRright);


	container.setAttributes({viewBox : "0 0 " + size + " " + size, ...justLine});

	container.append(base, G, HERO, GIZMO);

	L.append(title, container);

	L.render();
    document.body.appendChild(L.downloadAnchor('download as svg'))

};