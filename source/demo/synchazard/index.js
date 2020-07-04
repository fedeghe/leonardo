window.onload = function () {
    var target1 = document.getElementById('trg1'),
        target2 = document.getElementById('trg2'),
        target3 = document.getElementById('trg3');

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

            L = Leonardo(width, height, { ns: '*', target: target1 }),
            attrs = {
                cloud: {fill: '#3C3C3B'},
                thunder: {
                    fill: '#eeee00',
                    stroke: '#ff660077',
                    'stroke-width': 15
                },
            },

            elements = {
                cloud: [
                    L.circle(w(20), h(50), m(15)),
                    L.circle(w(80), h(50), m(15)),
                    L.circle(w(58), h(33), m(22)),
                    L.circle(w(30), h(33), m(10)),
                    L.rect(w(20), h(35), w(60), h(30)),
                ],
                thunder : [
                    L.polygon(
                        w(50), h(0),
                        w(60), h(15),
                        w(53), h(15),
                        w(42), h(52),
                        w(67), h(38),
                        w(53), h(85),
                        w(60), h(85),
                        w(50), h(100),
                        w(40), h(85),
                        w(47), h(85),
                        w(58), h(48),
                        w(33), h(62),
                        w(47), h(15),
                        w(40), h(15),
                    ),
                ]
            },
            cloud = L.group()
                .append(elements.cloud)
                .setAttributes(attrs.cloud),
            thunder = L.group()
                .append(elements.thunder)
                .setAttributes(attrs.thunder)
                .scale(1, 0.5)
                .move(0, 200);
        thunder.append(L.animate.attr('stroke', '#ff660077;#ffaa00aa;#ff660077', '0.3s', 'indefinite'))
        thunder.append(L.animate.attr('fill', '#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#fff', '5s', 'indefinite'))

        L.append(cloud, thunder);
        L.render();
    })();

    (function () {
        var width = 500,
            height = 500,
            min = width > height ? height : width,
            wperc = width / 100,
            hperc = height / 100,
            mperc = min / 100,

            w = function (n) { return n * wperc; },
            h = function (n) { return n * hperc; },
            m = function (n) { return n * mperc; },

            L = Leonardo(width, height, { ns: '*', target: target2 }),
            attrs = {
                cloud: { fill: '#3C3C3B' },
                thunder: {
                    fill: '#eeee00',
                    stroke: '#ff660077',
                    'stroke-width': 15
                },
                contour: {
                    stroke: '#359',
                    fill: 'transparent',
                    'stroke-width': 35
                }
            },

            elements = {
                cloud: [
                    L.circle(w(20), h(50), m(15)),
                    L.circle(w(80), h(50), m(15)),
                    L.circle(w(58), h(33), m(22)),
                    L.circle(w(30), h(33), m(10)),
                    L.rect(w(20), h(35), w(60), h(30)),
                ],
                thunder: [
                    L.polygon(
                        w(50), h(0),
                        w(60), h(15),
                        w(53), h(15),
                        w(42), h(52),
                        w(67), h(38),
                        w(53), h(85),
                        w(60), h(85),
                        w(50), h(100),
                        w(40), h(85),
                        w(47), h(85),
                        w(58), h(48),
                        w(33), h(62),
                        w(47), h(15),
                        w(40), h(15),
                    ),
                ]
            },
            cloud = L.group()
                .append(elements.cloud)
                .setAttributes(attrs.cloud),
            thunder = L.group()
                .append(elements.thunder)
                .setAttributes(attrs.thunder)
                .scale(1, 0.5)
                .move(0, 200),
            contour = L.circle(w(50), h(50), m(45)).setAttributes(attrs.contour),
            logo = L.group();
        thunder.append(L.animate.attr('stroke', '#ff660077;#ffaa00aa;#ff660077', '0.3s', 'indefinite'))
        thunder.append(L.animate.attr('fill', '#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#fff', '5s', 'indefinite'))
        logo.append(cloud, thunder).scale(0.8, 0.8).move(50,50);
        L.append(contour,logo);
        L.render();
    })();

    (function () {
        var width = 500,
            height = 500,
            min = width > height ? height : width,
            wperc = width / 100,
            hperc = height / 100,
            mperc = min / 100,

            w = function (n) { return n * wperc; },
            h = function (n) { return n * hperc; },
            m = function (n) { return n * mperc; },

            L = Leonardo(width, height, { ns: '*', target: target3 }),
            attrs = {
                cloud: { fill: '#3C3C3B' },
                thunder: {
                    fill: '#eeee00',
                    stroke: '#ff660077',
                    'stroke-width': 15
                },
            },

            elements = {
                cloud: [
                    L.circle(w(20), h(50), m(15)),
                    L.circle(w(80), h(50), m(15)),
                    L.circle(w(58), h(33), m(22)),
                    L.circle(w(30), h(33), m(10)),
                    L.rect(w(20), h(35), w(60), h(30)),
                ],
                thunder: [
                    L.polygon(
                        w(50), h(0),
                        w(43), h(47),
                        w(67), h(38),
                        
                        w(50), h(100),
                        w(57), h(53),
                        w(33), h(62)
                    ),
                ]
            },
            cloud = L.group()
                .append(elements.cloud)
                .setAttributes(attrs.cloud),
            thunder = L.group()
                .append(elements.thunder)
                .setAttributes(attrs.thunder)
                .scale(1, 0.5)
                .move(0, 200);
        thunder.append(L.animate.attr('stroke', '#ff660077;#ffaa00aa;#ff660077', '0.3s', 'indefinite'))
        thunder.append(L.animate.attr('fill', '#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#fff', '5s', 'indefinite'))

        L.append(cloud, thunder);
        L.render();
        document.body.appendChild(L.downloadAnchor());
    })();

    // document.body.appendChild(L.downloadAnchor());
};