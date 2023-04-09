window.onload = function () {
    var target1 = document.getElementById('trg1'),
        target2 = document.getElementById('trg2');

    (function () {
        var width = 500,
            height = 500,
            min = width > height ? height : width,
            wperc = width / 100,
            hperc = height / 100,
            mperc = min / 100,
            
            w = function(n) {return n * wperc; },
            h = function(n) {return n * hperc; },
            m = function(n) {return n * mperc; },

            L1 = Leonardo(width, height, { ns: '*', target: target1 }),
            circle1 = L1.circle(0,0,10).setAttributes({fill: '#f45'}),
            L2 = Leonardo(width, height, { ns: '*', target: target2 }),
            circle2 = L2.circle(width / 2, height / 2, 10).setAttributes({fill: '#45f'}),
            w2 = w(50),
            h2 = h(50),
            extra1 = L1.Element('text').setAttributes({fill: '#f45'}).move(w(2), h(5)),
            extra2 = L2.Element('text').setAttributes({fill: '#45f'}).move(w(2), h(5));

        L1.animate.cartesian(
            circle1,
            function (x, t){ return w2 * (1 + Math.sin(t)); },
            function (y, t){ return h2 * (1 + Math.sin(t / 4)); }
        )
        L2.animate.polar(
            circle2,
            function (r, t){ return  min/2 * Math.sin(t / 20);},
            function (rho, t){ return t % 360; }
        )
        
        extra1.tag.innerHTML = 'Cartesian';
        L1.append(circle1, extra1).render();

        
        extra2.tag.innerHTML = 'Polar';
        L2.append(circle2, extra2).render();
    })();




    // document.body.appendChild(L.downloadAnchor());
};