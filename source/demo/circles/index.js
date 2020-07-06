window.onload = function () {
    var target = document.getElementById('trg'),
        elements = [],
        colors = [
            '#000', '#111', '#222', '#333', '#444', '#555', 'red', '#777',
            '#888', '#999', '#aaa', 'blue', '#ccc', '#ddd', 'green', '#fff'
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
        var Leo = Leonardo(width, height, { ns: '*', target: target }),
            i = 0,
            color, c1, ani1, c2, ani2;

        for (null; i < 20; i++) {
            color = getColor();
            c1 = Leo.circle(width / 2 - width / (i+1), height / 2, min * 0.8**i).setAttributes({fill: color});
            ani1 = Leo.animate.attr({
                attributeName: 'r',
                from: min * 0.8 ** i,
                to: 1E3,
                dur: '10s',
                repeatCont: 'indefinite'
            });
            c1.append(ani1);

            c2 = Leo.circle(width / 2 + width / (i + 1), height / 2, min * 0.8 ** i).setAttributes({ fill: color });
            ani2 = Leo.animate.attr({
                attributeName: 'r',
                from: min * 0.8 ** i,
                to: 1E3,
                dur: '10s',
                repeatCount: 'indefinite'
            });
            c2.append(ani2);
            elements.push(c1, c2);
            Leo.append(c1, c2)
        }
        Leo.render();
    }
    draw();
}
