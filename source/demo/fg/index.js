window.onload = function () {
    var target = document.getElementById('trg'),
        width = 600,
        height = 300,
        Leo = Leonardo(width, height, { ns: '*', target: target }),
        main = Leo.group(),
        desc = Leo.desc('description'),
        w = function (n) { return n * width / 100 },
        h = function (n) { return n * height / 100 },
        stroke = 1,
        outer = Leo.ellipse(w(50), h(50), w(50), h(50)).setAttributes({
            fill : 'transparent',
            "stroke-width" : stroke,
            stroke : '#ddd',
            'stroke-linejoin': 'round'
        }),
        lines = 36,
        step = 2* Math.PI / lines,
        mw = w(50),
        mh = h(50),
        w2 = mw,
        h2 = mh,
        l = {
            "stroke-width" : stroke,
            stroke : '#aaa',
            fill:'transparent'
        },
        c = Leo.circle(mw, mh, mw*0.6).setAttributes(l);
        ein = Leo.ellipse(w(65), mh, w(5), h(20)).setAttributes(l);
    
    for(var i = 0; i < lines; i ++) {
        var a = step * i;
        main.append(
            Leo.line(
                mw, mh,
                mw + w2*Math.cos(a), mh + h2*Math.sin(a)
            ).setAttributes(l)
        )
    }
    Leo.append(desc)
    main.append(ein)
    main.append(c)
    main.append(c.clone().move(w(30), 0))
    main.append(c.clone().move(w(10), 0))
    main.append(c.clone().move(w(20), 0))
    main.append(outer);
    Leo.append(main);
    
    Leo.render();
    Leo.positionInspector();
    document.body.appendChild(Leo.downloadAnchor())
}
