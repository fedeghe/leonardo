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
        stroke = h(15),

        textStyle={
			"stroke-width" : stroke,
			"stroke" : 'black',
            // "font-size": h(80),
			// "stroke-opacity" : h(0.1),
			"stroke-linejoin" : "round",
            // "font-family": 'impact',
            // "stroke-width" : stroke,
			fill : 'transparent'
		},
        boldLine = {
			// "stroke-width" : stroke,
            
			"stroke" : 'black',
            // "font-size": h(80),
			// "stroke-opacity" : h(1),
			
			"stroke-linejoin" : "round",
			// "stroke-linejoin" : "arcs",
            // "font-family": 'impact',
			fill : 'transparent'
		},
        arrowStyle = {
            "stroke" : 'blue',
            "stroke-width" : stroke,
            "stroke-opacity" : 1,
            "stroke-linejoin" : "round",
        },
		G = L.text(w(5), h(80), 'g'),
        G2 = L.path(L.pathBuild
            // .M(w(10), h(10))
            .M(w(20), h(20))
            .M(w(10), h(10))
            // .A(w(10), w(10), 0,0,1, w(0), w(10))
            .Z()
        ).setAttributes(textStyle),
		HERO = L.text(w(40), h(80), 'HERO').setAttributes({
			"text-align" : 'right',
            ...textStyle
        }),
        GIZMO = L.group(),
        arrPos = { x: w(30), y: h(20)},
        r = h(60),
       
        arrow = L.polygon(
            arrPos.x, arrPos.y,
            arrPos.x, arrPos.y + r,
            arrPos.x - w(5), arrPos.y + r - h(10),
            arrPos.x + w(5), arrPos.y + r - h(10),
            arrPos.x, arrPos.y + r,
        ).setAttributes(arrowStyle);
    GIZMO.append(arrow);


	container.setAttributes({viewBox : "0 0 " + size + " " + size});

	container.append(base, G2, HERO, GIZMO);

	L.append(title, container);

	L.render();
    document.body.appendChild(L.downloadAnchor('download as svg'))

};