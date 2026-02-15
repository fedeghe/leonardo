window.onload = function () {
    var target = document.getElementById('trg'),
        prop = 350/350,
        // width = Math.min(987, window.innerWidth-50),
        width = 1050,
        height = parseInt(width / prop, 10),
        Leo = Leonardo(width, height, { ns: '*', target: target }),
        main = Leo.group(),
    
        img = Leo.image(0,0,width, height, './gbelt.png').setAttributes({opacity: 0.4}),
        attrs = {
            "stroke-width" : 5,
            "stroke" : 'red',
            "stroke-opacity" : 1,
            "fill-opacity" : 1,
            "stroke-linejoin" : "round",
            fill : 'none'
        },
        tbox = Leo.textBox('Leonardo centered', 250, 30, {
            "font-size" : 22,
            "fill" : '#aa0000',
            "font-family" : 'Verdana, sans-serif',
            "stroke" : '#000000',
            "text-anchor" : 'middle'
        },{fill: '#fede76'});
    main.append(img, tbox);

    Leo.append(main);
    var p1 = Leo.bezierThroughPoints([
        [138, 735],
        [124, 818],
        [121, 903],
        [126, 941],
        [132, 961],
        [308, 1001],
        [328, 988],
        [323, 957],
        [319, 869],
        [331, 792],
        [334, 769],
        [317, 769],
        [315, 790],
        [308, 819],
        [304, 875],
        [305, 959],
    ]).setAttributes(attrs),
    p2 = Leo.bezierThroughPoints([
        [202, 734],
        [190, 812],
        [188, 905],
        [193, 941],
    ]).setAttributes({
        ...attrs,
        "stroke-dasharray" : "20,10",
        stroke : 'blue'
    }),
    p3 = Leo.bezierThroughPoints([
        [605, 284],
        [545, 492],
        [526, 620],
        [549, 821],
        [661, 802],
        [748, 576],
        [766, 310],
        [714, 128],
        [556, 68],
        [426, 256]
    ]).setAttributes({
        ...attrs,
        "stroke-dasharray" : "10,10",
        stroke : 'green'
    }),
    s1 = Leo.bezierThroughPoints([
        [219, 423],
        [189, 527],
        [177, 633],
        [243, 649],
        [309, 659],
        [323, 540],
        [348, 433],
        [283, 421]
    ]).setAttributes({
        ...attrs,
        fill : 'orange',
    }),
    p4 = Leo.bezierThroughPoints([
        [347, 1019],
        [98, 982],
        [107, 718],
        [365, 756]
    ]).setAttributes(attrs);
    Leo.append(p1, p2, p3, s1, p4);
    Leo.render();
    Leo.positionInspector('[{x}, {y}],');
};
