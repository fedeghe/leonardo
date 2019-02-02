window.onload = function () {
    var target = document.getElementById('trg'),
        qs = Leonardo.getqs(),
        size = 800,
        nowH = (new Date).getHours(),
        settings = {
            filled: false,
            draw12: false
        },
        
        themes = {
            white: {
                bg: 'white',
                ms: '#eee',
                s: '#bbb',
                m: '#999',
                h: '#777',
                D: 'white',
                M: 'black',
                Y: 'white'
            },
            black: {
                bg: '#000',
                ms: '#222',
                s: '#444',
                m: '#666',
                h: '#888',
                D: 'black',
                M: 'white',
                Y: 'black'
            },
            rainbow: {
                bg: 'white',
                ms: '#77aaff',
                s: 'yellow',
                m: 'orange',
                h: 'red',
                D: 'black',
                M: 'white',
                Y: 'black'
            },
            rel: {
                bg: 'black',
                ms: 'red',
                s: 'white',
                m: 'green',
                h: 'red',
                D: 'black',
                M: 'white',
                Y: 'black'
            }
        },
        theme = ('theme' in qs && qs.theme in themes)
            ? qs.theme : (nowH > 7 && nowH < 17) ? 'white' : 'black',
        color = function(c) {
            return themes[theme][c]
        },
        width = size,
        height = size,
        Leo = Leonardo(width, height),

        container = Leo.group(),
        center = {
            x: width / 2,
            y: height / 2
        },
        step = size / 20,
        cir0 = Leo.circle(center.x, center.y, size / 2).attrs({fill: color('bg')}),
        circles = [
            createTimingSlice(0, center, step * 10, color('ms'), { step: 3.6, timestep: 10 , fun: function (d) {return 1000 / 360 *  (d % 1000)}}), // mssec
            createTimingSlice(1, center, step * 8, color('s'), { step: 0.6, timestep: 100, fun: function (d) {return 6 * d.getSeconds(); } }), // sec
            createTimingSlice(2, center, step * 6, color('m'), { step: 1, timestep: 10000, fun: function (d) { return 6 * d.getMinutes(); } }), // mim
            createTimingSlice(3, center, step * 4, color('h'), { step: 1, timestep: 240000, fun: function (d) { return  ((d.getHours() % 12) * 60 + d.getMinutes()) / 2; } }) // hour    0.1 in 24 *1000
        ],
        lines = [],
        degs = [
            0, // ms
            0, // s
            0, // m
            0  // h
        ];

    function createTimingSlice(index, center, r, col, timing) {
        var now = new Date,
            i = timing.fun(now),
            circle = Leo.slice(center.x, center.y, r, 0, 0).attrs({ fill: col }),
            grp = Leo.group(),
            innerC = Leo.circle(center.x, center.y, r - 2*step).attrs({ fill: color('bg') });
        
        grp.add(circle);
        !settings.filled && grp.add(innerC);

        circle.attrs({
            d: Leo.slicePath(center.x, center.y, r, 0, -i),
            fill: col
        }).rotate(-90, center.x, center.y)
        
        setInterval(function () {
            // var now = new Date,
                // i = timing.fun(now) % 360
            
            i = (i + timing.step) % 360
            degs[index] = i;

            if (degs[0] === degs[1] === degs[2]) console.log('met');
            
            circle.attrs({
                d: Leo.slicePath(center.x, center.y, r, 0, -i),
                fill: col
            })
        }, timing.timestep);
        return grp;
    }
    setInterval(function () {
        console.clear();
        console.log(new Date)
    }, 1000)

    container.add(cir0);
    container.add(circles);
    if (settings.draw12) {
        var col = color('bg')
        var l = Leo.line(width / 2, 0, width / 2, height).attrs({
                fill: col,
                "stroke-width" : size / 200,
                "stroke" : col
            }),     
            tmp;
        for (var i = 0; i < 6; i ++) {
            tmp = l.clone();
            tmp.rotate(i * 30, width / 2, height / 2);
            lines.push(tmp);
        }
        tmp = Leo.circle(center.x, center.y, size / 2 - 1).attrs({
            "stroke-width": size / 200,
            "stroke": col,
            fill: 'none'
        });
        lines.push(tmp)
        container.add(lines)
    }   
    
    Leo.add(container);

    Leo.render(target, function () {
        console.log('rendered')
    });	
    
};