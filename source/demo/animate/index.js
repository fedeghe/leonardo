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

            L = Leonardo(width, height, { ns: '*', target: target1 }),
            circle = L.circle(0,0,10).setAttributes({
                fill: '#f45'
            }),
            w2 = width / 2,
            h2 = height / 2;
        L.animate.cartesian(
            circle,
            function (x, t){
                return w2 + w2 * Math.sin(t/2);
            },
            function (y, t){
                return h2 + h2 * Math.sin(t/4);
            }
        )
        L.append(circle).render();
    })();

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

            L = Leonardo(width, height, { ns: '*', target: target2 }),
            circle = L.circle(width / 2, height / 2, 10).setAttributes({
                fill: '#34f'
            });
        L.animate.polar(
            circle,
            function (r, t){
                return  min/2 * Math.sin(t / 20);
            },
            function (y, t){
                return t % 360;
            }
        )
        L.append(circle).render();
    })();


    // document.body.appendChild(L.downloadAnchor());
};