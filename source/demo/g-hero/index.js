window.onload = function () {

	var target = document.getElementById('trg'),
        ratio = 3,
		size = 1000,
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
        s = L.getScaler(Math.min(width, height)),
        bgcolor = 'rgba(200, 200, 200, 1)'
        base = L.rect(0, 0, width, height).setAttributes({
			fill : bgcolor
        }),
        stroke = h(17),

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
		
     
        G = L.path(L.pathBuild
            .M(s(25), s(70))
            .a(s(15), s(15), 0, 0, 0, s(30), 0)
            .l(s(0), s(-30))
            .a(s(15), s(15), 0, 0, 0, s(-30), 0)
            .a(s(15), s(15), 0, 0, 0, s(30), 0)
        ).setAttributes(textStyle).move(s(-5), 0),
        
        H = L.path(L.pathBuild
            .M(s(120), s(20)-stroke/2)
            .l(0, s(80))
            .m(0, s(-10))
            .a(s(10), s(10), 0,0,1, s(20), s(0))
            .l(s(0), s(14))
            // .Z()
        ).setAttributes(textStyle),

        E = L.path(L.pathBuild
            .M(s(165), s(60))
            .l(s(20), 0)
            .a(s(14), s(14), 0,1,0, s(-0), s(15))
        ).setAttributes(textStyle),

        R = L.path(L.pathBuild
            .M(s(210), s(50))
            .l(s(0), s(40))
            .m(s(0), s(-10))
            .a(s(20), s(20), 0,0,1, s(20), s(-20))
            .l(s(10), 0)
            
        ).setAttributes(textStyle),

        O = L.path(L.pathBuild
            .M(s(255), s(70))
            .a(s(15), s(15), 0,0,1, s(30), s(0))
            .a(s(15), s(15), 0,0,1, s(-30), s(0))
            
            
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
        ).setAttributes(arrowStyle).move(s(-5), 0);
    GIZMO.append(arrow);


	container.setAttributes({viewBox : "0 0 " + size + " " + size});

	container.append(base, G, H, E, R, O, GIZMO);

	L.append(title, container);

	L.render();
    document.body.appendChild(L.downloadAnchor('download as svg'))

};