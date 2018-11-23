window.onload = function () {

    var target = document.getElementById('trg'),
        qs = Leonardo.getqs(),
        size = 400,
        nowH = (new Date).getHours(),
        theme = ('theme' in qs && qs.theme.match(/white|blackx/))
            ? qs.theme : (nowH > 7 && nowH < 17) ? 'white' : 'black',
        themes = {
            white: {
                bg: 'purple',
                ms: 'white',
                s: 'black',
                m: 'red',
                h: 'blue',
                D: 'white',
                M: 'black',
                Y: 'white'
            },
            black: {
                bg: 'gainsboro',
                ms: 'black',
                s: 'azure',
                m: 'orange',
                h: 'yellow',
                D: 'black',
                M: 'white',
                Y: 'black'
            }
        },
        color = function(c) {
            return themes[theme][c]
        },
        width = size,
        height = size,
        L = Leonardo(width, height),

        container = L.group(),
        center = {
            x: width / 2,
            y: height / 2
        },
        step = size / 2 / 10
        cir0 = L.circle(center.x, center.y, size / 2).attrs({fill: color('bg')}),
        
        circles = [
            createTimingSlice(0, center, step * 10, color('ms'), { step: 3.6, timestep: 10 , fun: function (d) {return (1000 / 360) *  (d % 1000)}}), // mssec
            createTimingSlice(1, center, step * 9, color('s'), { step: 0.6, timestep: 100, fun: function (d) {return 6 * d.getSeconds(); } }), // sec
            createTimingSlice(2, center, step * 8, color('m'), { step: 1, timestep: 10000, fun: function (d) { return 6 * d.getMinutes(); } }), // mim
            createTimingSlice(3, center, step * 7, color('h'), { step: 1, timestep: 240000, fun: function (d) { return  (d.getHours()*60 + d.getMinutes()) / 2; } }) // hour    0.1 in 24 *1000
        ];
    
    function createTimingSlice(index, center, r, color, timing) {
        var now = new Date,
            i = timing.fun(now),
            circle = L.slice(center.x, center.y, r, 0, 0).attrs({ fill: color });

        circle.attrs({
            d: L.slicePath(center.x, center.y, r, 0, -i),
            fill: color
        }).rotate(-90, center.x, center.y)
        
        setInterval(function () {
            // var now = new Date,
                // i = timing.fun(now) % 360
            i = (i + timing.step) % 360
            // var newNode = L.slice(center.x, center.y, r, 0, -i).attrs({ fill: color }).rotate(-90, center.x, center.y)
            // container.replace(circles[index], newNode);
            // debugger;
            circle.attrs({
                d: L.slicePath(center.x, center.y, r, 0, -i),
                fill: color
            }).rotate(-90, center.x, center.y)
        }, timing.timestep);
        return circle;
    }


    container.add(cir0);
    container.add(circles);


    L.add(container);

    L.render(target, function () {
        console.log('rendered')
        
    });	
    
};