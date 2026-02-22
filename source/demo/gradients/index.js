window.onload = function () {
	var target1 = document.getElementById('trg'),
        target2 = document.getElementById('trg2'),

        // REF
        devSize = 2**10,
        width = devSize,
        height = devSize,
        zoom = 1,
		L1 = Leonardo(width * zoom, height * zoom, {id : 'hero1', target: target1}),
		L2 = Leonardo(width * zoom, height * zoom, {id : 'hero2', target: target2}),
        container1 = L1.group(),
        container2 = L2.group(),
		
        w = L1.getScaler(width, 1e3, zoom),
        h = L1.getScaler(height, 1e3, zoom),
        grad1 = L1.linearGradient([
            "#f00", "#f60", "#fa0",
            "#ff0", "#5f8", "#3a3",
            "#58f", "#15f", "#13a",
            "#73a", "#f43",
        ], {
            x1: '0%',
            y1: '0%',
            x2: '100%',
            y2: '100%'
        }),
        grad2 = L1.radialGradient([
            "#f00", "#f60", "#fa0",
            "#ff0", "#5f8", "#3a3",
            "#58f", "#15f", "#13a",
            "#73a", "#f43",
        ], {
            r: '60%',
            spreadMethod: 'reflect',
        }),
        bg1 = L1.rect(0,0,w(1000),h(1000)).setAttributes({
            fill:grad1
        }),
        bg2 = L1.rect(0,0,w(1000),h(1000)).setAttributes({
            fill:grad2
        });
    
    container1.setAttributes({
        viewBox : "0 0 " + width + " " + height
    }).append(bg1);
    L1.append(container1);
	L1.render();

    container2.setAttributes({
        viewBox : "0 0 " + width + " " + height
    }).append(bg2);
    L2.append(container2);
	L2.render();
    
};