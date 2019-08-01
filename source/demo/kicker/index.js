window.onload = function () {
    var target = document.getElementById('trg'),
        size = 6,
        width= 70 * size,
        height= 116 * size,
        
        L = Leonardo(width, height),
        base = L.rect(0,0, width, height).attrs({
			fill : 'rgba(0,255,0, 0.2)'
        }),
        defense = L.group(),
        defenseLine1 = L.polyline(
            2 * width / 6, 0,
            2 * width / 6, height / 10,
            4 * width / 6, height / 10,
            4 * width / 6, 0
        ).attrs({
			"stroke-width" : 5,
            stroke : 'white',
            fill: 'rgba(0,255,0)'
        }),
        defenseLine2 = L.polyline(
            1 * width / 6, 0,
            1 * width / 6, 2 * height / 10,
            5 * width / 6, 2 * height / 10,
            5 * width / 6, 0
        ).attrs({
			"stroke-width" : 5,
            stroke : 'white',
            fill: 'rgba(0,255,0)'
        }),
        round = L.slice(width / 2 , height / 6, 50, -155, -25).attrs({
			"stroke-width" : 5,
            stroke : 'white',
            fill: 'rgba(0,255,0)'
        }),
        image = image = L.image(0, 0, width, height, 'http://localhost:3001/kicker/css/field.jpg');

    defense.add(round, defenseLine2, defenseLine1)

    var defense2 = defense.clone().mirrorO().move(0,height);
        
    L.add(image);
    L.add(base);
    L.add(defense,defense2);

    L.render(target, function () {
        console.log('rendered')
    });
}
