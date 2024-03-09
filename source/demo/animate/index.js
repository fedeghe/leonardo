window.onload = function () {
    var target1 = document.getElementById('trg1'),
        target2 = document.getElementById('trg2'),
        speed = 1;

    (function () {
        var width = 500,
            height = 500,
            min = width > height ? height : width,
            w = Leonardo.getScaler(width),
            h = Leonardo.getScaler(height),
            w2 = w(50),
            h2 = h(50),
            els = [{
                func: 'cartesian',
                target: target1,
                color: '#f45',
                initial: [0,0],
                funcs: [
                    function (x, t){ return w2 * (1 + Math.sin(speed * t)); },
                    function (y, t){ return h2 * (1 + Math.sin(speed * t / 4)); }
                ]
            },{
                func: 'polar',
                target: target2,
                color: '#45f',
                initial: [width / 2, height / 2],
                funcs: [
                    function (r, t){ return  min/2 * Math.sin(speed * t / 20);},
                    function (rho, t){ return speed * t % 360; }
                ]
            }];
        els.forEach(function(o) {
            var Lx = Leonardo(width, height, { ns: '*', target: o.target }),
                circle = Lx.circle.apply(null, o.initial.concat(10)).setAttributes({fill: o.color}),
                extra = Lx.Element('text').setAttributes({fill: o.color}).move(w(2), h(5));
            extra.tag.innerHTML = o.func;
            Lx.animate[o.func].apply(null, [circle].concat(o.funcs));
            Lx.append(circle, extra).render();
        });
    })();




    // document.body.appendChild(L.downloadAnchor());
};