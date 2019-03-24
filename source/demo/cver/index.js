window.onload = function () {
    var target = document.getElementById('trg'),
        Leo = Leonardo(600, 250, { ns: '*', target: target }),
        main = Leo.group(),
        c = Leo.group(),
        v = Leo.group(),
        e = Leo.group(),
        r = Leo.group(),
        stroke = 10;
    c.add(Leo.polygon(0,50, 50,0, 150,0, 100,50, 150,100, 50,100).attrs({
        fill : 'green',
        "stroke-width" : stroke,
        stroke : 'black',
        'stroke-linejoin': 'round'
    }));
    v.add(Leo.polygon(0,50, 50,0, 100,50, 125,25, 175,25, 75,125).attrs({
        fill : 'white',
        "stroke-width" : stroke,
        stroke : 'black',
        'stroke-linejoin': 'round'
    }));
    e.add(Leo.polygon(0,100, -25,75, 75,-25, 125,25, 100,50, 125,75, 100,100).attrs({
        fill : 'white',
        "stroke-width" : stroke,
        stroke : 'black',
        'stroke-linejoin': 'round'
    }));
    e.add(Leo.polyline(50,25, 75,25, 100,50).attrs({
        fill : 'transparent',
        "stroke-width" : stroke,
        stroke : 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }));
    e.add(Leo.polyline(50,75, 75,75, 100,50).attrs({
        fill : 'transparent',
        "stroke-width" : stroke,
        stroke : 'black',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }));
    r.add(Leo.polygon(0,0, 100,0, 150,50, 125,75, 150,100, 100,100, 75,75, 50,100, 0,100, 25,75, 0,50, 25,25).attrs({
        fill : 'red',
        "stroke-width" : stroke,
        stroke : 'black',
        'stroke-linejoin': 'round'
    }));
    main.add(
        c,
        v.move(100),
        e.move(250),
        r.move(350)
    )
    Leo.add(main.move(40, 90));
    Leo.render();
    document.body.appendChild(Leo.downloadAnchor())
}
