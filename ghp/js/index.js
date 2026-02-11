window.onload = function () {
    var target = document.getElementById('trg'),
        fact = 1,
        width = 987 * fact,
        height = 652 * fact,
        w = function (p) {return width * p/100;},
        h = function (p) {return height * p/100;},
        Leo = Leonardo(width, height, { ns: '*', target: target }).setStyles({backgroundColor: '#222'}),
        img = Leo.image(0,0,width, height, 'ghp/god.jpg').setAttributes({opacity: 1}),
        fillStyle = {
			"stroke-width": 2,
			"stroke": '#ef88d8',
			"stroke-opacity": 1,
			"fill-opacity": 10,
			"stroke-linejoin": "round",
			fill: 'transparent'
		},

        crunch = Leo.positionCruncher(width, height, fillStyle),
        beiz = Leo.group();


    Leo.append(img, beiz);
    
    
    
    
    Leo.render();
    
    Leo.positionInspector('[{r%x}, {r%y}],', function (curves) {
        console.log({curves})
        beiz.clear();
        curves.forEach(function(points) {
            beiz.append(
                Leo.bezierThroughPoints(points.map(
                    function(point){
                        return [point['x'], point['y']]
                    }
                ), {
                    stroke: 'black',
                    'stroke-width': 5,
                    fill: 'none'
                }, console.log)
            );
        })
    });
    
    
};
