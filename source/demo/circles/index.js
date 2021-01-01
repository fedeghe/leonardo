window.onload = function () {
    var target = document.getElementById('trg'),
        elements = [];
        
    function getColor() {
        var r = Math.floor(256 * Math.random()),
            g = Math.floor(256 * Math.random()),
            b = Math.floor(256 * Math.random());
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
    function clear() {
        for (var i = 0, l = elements.length; i < l; i++) {
            elements[i].tag.parentNode.removeChild(elements[i].tag);
            elements[i] = null;
        }
        elements = [];
    }
    window.addEventListener('resize', draw);

    function draw() {
        clear();
        width = window.innerWidth || document.documentElement.clientWidth,
        height = window.innerHeight || document.documentElement.clientHeight,
        min = Math.min(width, height);
        var Leo = Leonardo(width, height, { ns: '*', target: target });

        function addCircle() {
            var nextTime = +new Date,
                diff = (nextTime - now) / 1000;
            var c1 = Leo.circle(width * Math.random(), height * Math.random(), 1).setAttributes({fill: getColor(), 'fill-opacity': "50%"}),
                ani1 = Leo.animate.attr({
                    attributeName: 'r',
                    attributeType: 'XML',
                    type:'scale',
                    from: 1,
                    to: 1E3 * Math.random(),
                    begin: diff + 's',
                    dur: '20s',
                    repeatCount: 'indefinite'
                });

            c1.append(ani1);
            elements.push(c1);
            Leo.append(c1);
        }
        var now = +new Date
        var ti = setInterval(addCircle, 1E3)
        setTimeout(function () {clearInterval(ti)}, 1E5)
        Leo.render();
    }
    draw();
}
