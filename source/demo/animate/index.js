window.onload = function () {
    var target1 = document.getElementById('trg1'),
        target2 = document.getElementById('trg2'),
        target3 = document.getElementById('trg3'),
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
                initial: [w2, h2],
                funcs: [
                    function (x, t){ return w2 * Math.sin(speed * t); },
                    function (y, t){ return h2 * Math.sin(speed * t / 8); },
                    0.05,
                    {trace: {style:{fill:'#33882266',stroke:'none', r: 0.5}}}
                ]
            },{
                func: 'polar',
                target: target2,
                color: '#45f',
                initial: [width / 2, height / 2],
                funcs: [
                    function (r, t){ return min/2 *  Math.cos(speed * t / 10);},
                    function (rho, t){ return speed * t % (2*Math.PI) },
                    0.05,
                //    {trace: {style:{fill:'#00ff0055', r: 4, stroke: '#ff000099', 'stroke-width': 1}}} 
                ]
            }];
        els.forEach(function(o) {
            var Lx = Leonardo(width, height, { ns: '*', target: o.target }).sas({
                    fill: '#eee'
                }),
                bg = Lx.rect(0, 0, 2*w2, 2*h2),
                circle = Lx.circle.apply(null, o.initial.concat(10)).setAttributes({fill: o.color}),
                extra = Lx.Element('text').setAttributes({fill: o.color}).move(w(2), h(5));
            extra.tag.innerHTML = o.func;
            Lx.animate[o.func].apply(null, [circle].concat(o.funcs));
            Lx.append(bg, circle, extra).render();
        });


        //4 
        (function (){
            var Lx = Leonardo(width, height, { ns: '*', target: target3 }),
                path = Lx.path('M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z').sas({
                    stroke: "black",
                    "stroke-linecap": "round",
                    "stroke-dasharray": "5,10,5",
                    fill: "none"
                }).move(w2*5/9,h2*7/9),
                text = Lx.text(w2*1/6,h2*2/7,'😋').scale(3);
            
            Lx.animate.motionPath(text, "M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z",{
                dur: 2
            });
            Lx.append(text, path).render();
        })();

    })();
};