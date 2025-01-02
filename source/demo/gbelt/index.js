window.onload = function () {
    var target = document.getElementById('trg'),
        prop = 350/350,
        // width = Math.min(987, window.innerWidth-50),
        width = window.innerWidth,
        height = parseInt(width / prop, 10),
        Leo = Leonardo(width, height, { ns: '*', target: target }),
        main = Leo.group();
    
        img = Leo.image(0,0,width, height, './gbelt.png').setAttributes({opacity: 0.4}),
    main.append(img);
    Leo.append(main);
    Leo.render();
    Leo.positionInspector('[{r%x}, {r%y}],');
}
