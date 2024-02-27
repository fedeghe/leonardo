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
        
            w = function (i) {return size * i/1E3;},
            h = function (i) {return size * i/1E3;},
            attrs = {
                // "stroke-width" : h(20),
                "stroke" : 'red',
                "stroke-opacity" : 1,
                "fill-opacity" : 1,
                // "stroke-linejoin" : "round",
                fill : 'none'
            },
            centerX = size/2,
            centerY = size/2,
            Leo = Leonardo(size, size),
            slice = Leo.path(Leo.pathBuild
                .M(w(500), h(500))
                .L(w(0), h(500))
                .A(
                    w(500), w(500),
                    0,0,1,
                    w(500), w(0),
                )
                .M(w(500), h(500))
                .Z()
            ).setAttributes(attrs).setAttributes({fill:'#f00'}),
            r1 = 100, r2 = 200,
            // A1 = Math.PI/3, A2 = 2*Math.PI/3,
            A1 = Math.PI/3, A2 = 2*Math.PI/3,
            A3 = 4*Math.PI/3, A4 = 5*Math.PI/3,
            cx = 400, cy = 400,
            linex = Leo.line(400,0,400,800).setAttributes(attrs),
            liney = Leo.line(0,400,800,400).setAttributes(attrs),
            slice2 = Leo.path(Leo.pathBuild
                // .M(cx, cy)
                .M(cx + r1*Math.cos(A1), cy + r1*Math.sin(A1))
                .L(cx + r2*Math.cos(A1), cy + r2*Math.sin(A1))
                
                .A(
                    r2, r2,
                    0,0,1,
                    cx +r2*Math.cos(A2), cy+r2*Math.sin(A2),
                )
                .L(cx + r1*Math.cos(A2), cy+r1*Math.sin(A2))
                .A(
                    r1,r1,
                    0,0,0,
                    cx+ r1*Math.cos(A1), cy + r1*Math.sin(A1),
                )
                .Z()
            ).setAttributes(attrs).setAttributes({fill:'#f00'}),
            //done in one line by the following
            // slice2 = Leo.arcSection(cx, cy, r1,r2,A1,A2).setAttributes(attrs).setAttributes({fill:'#f00'}),
            slice3 = Leo.arcSection(cx, cy, r1,r2,A3,A4).setAttributes(attrs).setAttributes({fill:'#f70'}),



            
            arc = Leo.arcCentered(w(500), h(500), h(500), 0, 95)
                .setAttributes(attrs)
                .setAttributes({fill:'#0a0'}),
            arc2 = Leo.arcCentered(w(500), h(500), h(500), 95, 300)
                .setAttributes(attrs)
                .setAttributes({fill:'#aa0'}),
            arc3 = Leo.arcCentered(w(500), h(500), h(500), 300, 300.5)
                .setAttributes(attrs)
                .setAttributes({fill:'#000'}),
            arc4 = Leo.arcCentered(w(500), h(500), h(500), 300.5, 360)
                .setAttributes(attrs)
                .setAttributes({fill:'#a0a'}),
            g = Leo.group(linex, liney, slice2, slice3);
                // , arc, arc2, arc3, arc4
                // );

        
        // g.append();
        

        
        function spin(tag, force) {
            var r = 0,
                incr = ~~(force + (Math.random() - .5)*force/2);
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

        // spin(g, 10)
        g.on('click', function () {
            spin(g, 50)
            // console.log('xxxxx')
        });

        Leo.append(g);
        Leo.render({ target: target, cb: function () { console.log('rendered') } });
    }


    var target = document.getElementById('trg'), els;

    drawIt({
        size: 800,
        els
    });
    
    
};