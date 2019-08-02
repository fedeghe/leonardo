window.onload = function () {
    var target = document.getElementById('trg'),
        size = 8,
        width= 70 * size,
        height= 116 * size,
        imageSize = width / 4,

        green = 'rgba(0,100,0, 1)'
        // green = 'rgba(173, 14, 91, 1)'
        
        L = Leonardo(width, height),
        base = L.rect(0,0, width, height).attrs({
			fill : green
        }),
        v = 2,
        perimeter = L.rect(v,v, width-2*v, height-2*v).attrs({
			"stroke-width" : 5,
            stroke : 'white',
            fill: green
        }),
        defense = L.group(),
        defenseLine1 = L.rect(
            6 * width / 20, v,
            8 * width / 20, height / 10 -v
        ).attrs({
			"stroke-width" : 5,
            stroke : 'white'
        }),
        defenseLine2 = L.rect(
            4 * width / 20, v,
            12 * width / 20, 11 * height / 50 - v,
            
        ).attrs({
			"stroke-width" : 5,
            stroke : 'white'
        }),
        round = L.slice(width / 2 , 9 * height / 50, height / 12 , -155, -25).attrs({
			"stroke-width" : 5,
            stroke : 'white'
        }),
        line = L.polyline(
            0, height / 2,
            width, height / 2,
        ).attrs({
			"stroke-width" : 5,
            stroke : 'white',
        }),
        center = L.circle(width / 2, height / 2, width / 7).attrs({
			"stroke-width" : 5,
            stroke : 'white',
            fill: 'transparent'
        }),
        centermini = L.circle(width / 2, height / 2, width / 66).attrs({
            stroke : 'white',
            fill: 'white'
        }),

        logo1 = L.image(
            -imageSize/2,
            -imageSize/2,
            imageSize, imageSize,
            'http://localhost:3001/kicker/css/signavio.png'
        ),
        logo2 = logo1.clone().rotate(180, 0, 0).move(-width / 2, -height/ 2 + 100),
        image = L.image(0, 0, width, height, 'http://localhost:3001/kicker/css/field.jpg');
   
    logo1.move(width / 2, height/2 + 100);
    defense.add(
        round,
        defenseLine2,
        defenseLine1
    )
    .attrs({
        fill: green
    })

    var defense2 = defense.clone().mirrorO().move(0,height);
        
    L.add(
        base,
        perimeter,
        logo2,
        // logo1,
        
        defense,
        defense2,
        line,
        center,
        centermini,
    );

    L.render(target, function () {
        console.log('rendered')
    });
}
