window.onload = function () {
    var target = document.getElementById('trg'),
        size = 8,
        width= 70 * size,
        height= 116 * size,
        imageSize = width / 4,

        // bgcolor = 'rgba(0, 100, 0, 1)'
        // bgcolor = 'rgba(0, 0, 0, 1)'
        bgcolor = 'rgba(173, 14, 91, 1)'
        
        L = Leonardo(width, height),

        base = L.rect(0,0, width, height).setAttributes({
			fill : bgcolor
        }),
        v = 2,
        perimeter = L.rect(v,v, width-2*v, height-2*v).setAttributes({
			"stroke-width" : 5,
            stroke : 'white',
            fill: bgcolor
        }),
        
        defenseLineInt = L.rect(
            6 * width / 20, v,
            8 * width / 20, height / 10 -v
        ).setAttributes({
			"stroke-width" : 5,
            stroke : 'white'
        }),
        defenseLineExt = L.rect(
            4 * width / 20, v,
            12 * width / 20, 11 * height / 50 - v,
            
        ).setAttributes({
			"stroke-width" : 5,
            stroke : 'white'
        }),
        round = L.slice(width / 2 , 9 * height / 50, height / 12 , -155, -25).setAttributes({
			"stroke-width" : 5,
            stroke : 'white'
        }),
        center = [
            L.polyline(
                0, height / 2,
                width, height / 2,
            ).setAttributes({
                "stroke-width" : 5,
                stroke : 'white',
            }),
            L.circle(width / 2, height / 2, width / 7).setAttributes({
                "stroke-width" : 5,
                stroke : 'white',
                fill: 'transparent'
            }),
            L.circle(width / 2, height / 2, width / 66).setAttributes({
                stroke : 'white',
                fill: 'white'
            })
        ],
        logoUrl = 'http://localhost:3001/kicker/css/signavio.png',
        logo1 = L.image(
            -imageSize/2,
            -imageSize/2,
            imageSize, imageSize,
            logoUrl
        ).setAttributes({
            id : 'logo'
        }),
        logo2 = L.image(
            -imageSize/2,
            -imageSize/2,
            imageSize, imageSize,
            logoUrl
        ).rotate(180, 0, 0).move(-width / 2, -height/ 2 + 150),

        pwidth = width / 2,
        pheight = height / 2,
        fsize = 200,
        image = L.image(0, 0, width, height, 'http://localhost:3001/kicker/css/field.jpg'),
   
        person = L.centeredText(pwidth, pheight, '&#xf183;', {
            // fill: 'blue',
            "stroke-width" : 10,
            stroke : 'black',
        } ).setAttributes({
            id:"person",
            "font-size": fsize,
            fill: 'transparent'
        }).styles({
            cursor: 'default'
        }),
        defenseUp = L.group().append(
            round,
            defenseLineExt,
            defenseLineInt
        ).setAttributes({
            fill: bgcolor
        }),
        defenseDown = defenseUp.clone().mirrorH().move(0, height),
        players = [
            person,
            person.use().move(width / 2, 0),
            person.use().move(0, height / 2),
            person.use().move(width / 2, height / 2),
        ];
    
    logo1.move(width / 2, height/2 + 150);

    L.append(
        base,
        perimeter,
        logo2,
        logo1,    
        defenseUp,
        defenseDown,
        center,
        players,
        //person//.setAttributes({display:'none'})
    ).render({target: target, cb: function () {
        console.log('rendered')
    }});
}
