const weights = {
    COPPER: 6,
    BRONZE: 5,
    TITANIUM: 4,
    SILVER: 3,
    GOLD: 2,
    DIAMOND: 1
}

var els = Object.entries(weights).reduce((acc, [key, n]) => {
    const id = acc.length;
    return [
        ...acc,
        ...Array.from({ length: n }, (_, i) => ({
            "id": id + i,
            "name": `item${id + i}`,
            "available": true,
            "class": key
        }))
    ]
}, []).sort(() => Math.random() > 0.5 ? 1 : -1)

window.onload = function () {
    function drawIt(config) {
        var size = config.size,
            attrs = {
                "stroke" : 'red',
                "stroke-opacity" : 1,
                "fill-opacity" : 1,
                fill : 'none'
            },
            Leo = Leonardo(size, size),
            w = Leo.getScaler(size, 1e3),
            h = Leo.getScaler(size, 1e3),
            r1 = 100, r2 = 200,
            A3 = 60, A4 = 120,
            cx = 400, cy = 400,
            linex = Leo.line(400,0,400,800).setAttributes(attrs),
            liney = Leo.line(0,400,800,400).setAttributes(attrs),
            slice3 = Leo.arcSection(cx, cy, r1, r2, A3, A4).setAttributes(attrs).setAttributes({fill:'#f70'}),
            arc = Leo.arcCentered(w(500), h(500), h(500), 0, 95)
                .setAttributes(attrs)
                .setAttributes({fill:'#0a0'}),
            g = Leo.group(arc, linex, liney, slice3);
        
        
        function spin(tag, force) {
            var r = 0,
                incr = ~~(force + (Math.random() - .5) * force / 2);
            var incInt = setInterval(() => {
                incr = incr - 1 <= 0 ? 0 : incr - 1;
                if (incr <= 0) clearInterval(incInt)
            }, 50)
            var rotIncr = setInterval(() => {
                r+=incr
                r%=360
                tag.rotate(r, w(500), h(500))
                if (incr === 0) clearInterval(rotIncr)
            }, 10)
        }   

        g.on('click', function () { spin(g, 50); });

        Leo.append(g);
        Leo.render({ target: target, cb: function () { console.log('rendered') } });
    }


    var target = document.getElementById('trg'), els;

    drawIt({
        size: 800,
        els
    });
    
    
};