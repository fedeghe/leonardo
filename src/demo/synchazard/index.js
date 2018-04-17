window.onload = function () {

    var target = document.getElementById('trg'),
        width = 500,
        height = 500,
        w20 = width / 20,
        h20 = height / 20,

        L = Leonardo(width, height, { ns: '*', target: target }),

        arc = L.path(
            L.pathBuild
                .m(w20, h20*9)
                .A(w20*9, h20*9, 0, 0, 1, w20*19, h20*9)
                .L(w20*16, h20*9)
                .A(w20 * 6, h20 * 6, 0, 0, 0, w20 * 4, h20 * 9)
                .L(w20, h20 * 9)
        ).attrs({
            fill: '#444',
            "stroke-width": 2.5,
            stroke: 'black'
        }),
        arc2 = arc.clone().move(0, 0).mirrorV();



    L.add(arc, arc2);

    L.render(target);
};