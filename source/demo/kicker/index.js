window.onload = function () {
    var target = document.getElementById('trg'),
        size = 8,
        width= 70 * size,
        height= 116 * size,
        imageSize = width / 4,

        // green = 'rgba(0, 100, 0, 1)'
        // green = 'rgba(0, 0, 0, 1)'
        green = 'rgba(173, 14, 91, 1)'
        
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
        person = L.group(),
        logo1 = L.image(
            -imageSize/2,
            -imageSize/2,
            imageSize, imageSize,
            'http://localhost:3001/kicker/css/signavio.png'
        ),
        logo2 = L.image(
            -imageSize/2,
            -imageSize/2,
            imageSize, imageSize,
            'http://localhost:3001/kicker/css/signavio.png'
        ).rotate(180, 0, 0).move(-width / 2, -height/ 2 + 150),
        pwidth = width / 2,
        pheight = height / 2,
        image = L.image(0, 0, width, height, 'http://localhost:3001/kicker/css/field.jpg');
   
    person.add(
        L.circle(pwidth / 2, pheight / 8 , pheight / 8),
        L.ellipse(pwidth / 2, 3 * pheight / 8 , pwidth / 2, pheight / 8),
        L.rect(0, 3 * pheight / 8, pwidth, 2 * pheight / 8),
        L.rect(pwidth / 4, 5 * pheight / 8, pwidth/2, 3 * pheight / 8)
    ).attrs({
        "stroke-width" : 1,
        stroke : 'black',
        fill: 'white'
    })
    logo1.move(width / 2, height/2 + 150);

    defense.add(
        round,
        defenseLine2,
        defenseLine1
    ).attrs({
        fill: green
    })

    var defense2 = defense.clone().mirrorO().move(0, height);
    var rect = L.rect(0, 0, width / 2, height / 2).attrs({
        "stroke-width" : 2,
        stroke : 'white',
        fill: 'rgba(255, 255, 0, 0.3)'
    })
    // .styles({display:'none'})

    var players = [
        rect.clone().attrs({id: 'p1'}),
        rect.clone().attrs({id: 'p2'}).move(width / 2, 0),
        rect.clone().attrs({id: 'p3'}).move(0, height / 2),
        rect.clone().attrs({id: 'p4'}).move(width / 2, height / 2),
        // person
    ];

    L.add(
        base,
        perimeter,
        logo2,
        logo1,    
        defense,
        defense2,
        line,
        center,
        centermini,
        players
    )
    L.render(target, function () {
        console.log('rendered')
    });
}
