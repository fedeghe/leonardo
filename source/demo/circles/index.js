window.onload = function () {
    var target = document.getElementById('trg'),
        elements = [],
        colors = [
            '#000',
            '#111',
            '#222',
            '#333',
            '#444',
            '#555',
            'red',
            '#777',
            '#888',
            '#999',
            '#aaa',
            'blue',
            '#ccc',
            '#ddd',
            'green',
            '#fff'
        ];
        
    function getColor() {
        var i = Math.ceil(Math.random() * colors.length)
        return colors[i];
    }
    function clear() {
        for (var i = 0, l = elements.length; i < l; i++) {
            console.log(elements[i])
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
        var Leo = Leonardo(width, height, { ns: '*', target: target })

        for (var i = 0; i < 20; i++) {
            var color = getColor();
            var c1 = Leo.circle(width / 2 - width / (i+1), height / 2, min * 0.8**i).attrs({fill: color}),
                ani1 = Leo.animate.attr('r', min * 0.8 ** i, 1E3, '10s', 'indefinite');
            c1.add(ani1);
            var c2 = Leo.circle(width / 2 + width / (i + 1), height / 2, min * 0.8 ** i).attrs({ fill: color }),
                ani2 = Leo.animate.attr('r', min * 0.8 ** i, 1E3, '10s', 'indefinite');
            c2.add(ani2);
            elements.push(c1, c2);
            Leo.add(c1, c2)
        }
        Leo.render();
    }
    draw();
}
