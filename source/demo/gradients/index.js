window.onload = function () {
	var target = document.getElementById('trg'),
        // REF
        devSize = 2**10,
        width = devSize,
        height = devSize,
        zoom = 1,
		L1 = Leonardo(width * zoom, height * zoom, {id : 'hero1', target}),
        container = L1.group(),
		

        w = function (i) {return width * i/1E3 * zoom;},
		h = function (i) {return height * i/1E3 * zoom;},
        grad1 = L1.linearGradient([
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
        ],'0%', '0%', '100%','100%'),
        bg1 = L1.rect(0,0,w(1000),h(1000)).setAttributes({
            fill:grad1,
            // rx: h(140), 
            // ry: h(140)
        });
        
    
    container.setAttributes({
        viewBox : "0 0 " + width + " " + height
    }).append(bg1);

    // container.append(image);
    
    L1.append(container);

	L1.render();
    
};