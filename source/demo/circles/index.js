window.onload = function () {
    var target = document.getElementById('trg'),
        elements = [],
        colors = [
            '#000', '#111', '#222', '#333', '#444', '#555', 'red', '#777',
            '#888', '#999', '#aaa', 'blue', '#ccc', '#ddd', 'green', '#fff'
        ];
        
    function getColor() {
        var i = Math.ceil(Math.random() * colors.length)
        var r = Math.floor(256 * Math.random()),
            g = Math.floor(256 * Math.random()),
            b = Math.floor(256 * Math.random());
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'; //colors[i];
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
            var c1 = Leo.circle(width * Math.random(), height * Math.random(), 1).setAttributes({fill: getColor()}),
                ani1 = Leo.animate.attr({
                    attributeName: 'r',
                    attributeType: 'XML',
                    type:'scale',
                    from: 1,
                    to: 1E3 * Math.random(),
                    begin: diff + 's',
                    dur: '10s',
                    repeatCount: 'indefinite'
                });

            c1.append(ani1);
            elements.push(c1);
            Leo.append(c1);
        }
        var now = +new Date
        var ti = setInterval(addCircle, 1E3)
        setTimeout(function () {clearInterval(ti)}, 1E4)
        Leo.render();
    }
    draw();
}
