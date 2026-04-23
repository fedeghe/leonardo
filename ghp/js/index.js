window.onload = function () {
    var target = document.getElementById('trg'),
        fact = 1,
        width = 987 * fact,
        height = 652 * fact,
        w = function (p) {return width * p/100;},
        h = function (p) {return height * p/100;},
        Leo = Leonardo(width, height, { ns: '*', target: target }).setStyles({backgroundColor: '#222'}),
        img = Leo.image(0, 0,width, height, 'ghp/god.jpg').setAttributes({opacity: 1});
        // .on('click', function() {
        //     console.log({this: this});
        //     img.infoUrl(true);
        // });

    Leo
        .append(img)
        .render()
        .positionInspector({
            tpl: '[{r%x}, {r%y}],',
            cb: (c) => console.log({c}),
            trace : true,
            svgCb: console.log,
            overrideStylePath: {
                stoke: 'red',
                'stroke-width': 4,
                'stroke-dasharray': '10,5',
            },
        });


    
};
