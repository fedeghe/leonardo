window.onload = function () {

    function render() {
        var target = document.getElementById('trg'),
            prop = 422/600,
            // width = Math.min(987, window.innerWidth-50),
            width = window.innerWidth-50,
            height = parseInt(width / prop, 10),
            w = function (p) {return width * p/100;},
            h = function (p) {return height * p/100;},
            Leo = Leonardo(width, height, { ns: '*', target: target }).setStyles({backgroundColor: '#222'}),
            img = Leo.image(0,0,width, height, './vitruvian.jpg').setAttributes({opacity: 0.4}),
            fillStyle = {
                "stroke-width": 2,
                "stroke": '#777777',
                "stroke-opacity": 1,
                "fill-opacity": 10,
                "stroke-linejoin": "round",
                fill: 'transparent'
            },

            crunch = Leo.positionCruncher(width, height, fillStyle, true),

            outer = crunch([
                [41.34, 46.43],
[-3.43, 4.41],
[-1.19, 4.1],
[-2.24, 2.1],
[-3.43, 2.31],
[-1.94, 3.47],
[-1.04, 2.73],
[-0.6, 2.21],
[-1.64, 1.37],
[-1.49, 0.63],
[3.43, 1.79],
[1.19, -0.53],
[0.3, -1.16],
[0.6, -2],
[2.69, -2.94],
[1.94, -1.89],
[1.64, -3.36],
[2.84, -2.31],
[2.84, -3.36],
[3.28, -2.1],
[1.94, -2.1],
[0.9, -1.26],
[2.24, -0.11],
[1.04, 2.94],
[3.13, 3.57],
[2.39, 3.15],
[1.19, 1.58],
[0.9, 2.73],
[1.94, 2.63],
[1.94, 2.1],
[2.54, 2],
[1.34, 1.79],
[0.6, 1.68],
[2.54, -1.05],
[1.49, 0],
[1.04, -0.63],
[2.09, -1.16],
[-1.04, -0.74],
[-3.43, 0.21],
[-1.49, -1.05],
[-2.24, -3.78],
[-1.64, -2.42],
[-1.49, -1.58],
[-0.75, -1.26],
[-0.15, -1.47],
[-1.34, -1.58],
[-0.15, -1.68],
[-1.04, -2.73],
[-1.94, -2.84],
[-0.9, -1.89],
[-0.6, -1.79],
[-1.04, -2.21],
[0.15, -0.95],
[-0.15, -1.89],
[0.75, -2.42],
[1.04, -2.21],
[1.04, -2],
[2.39, -0.74],
[2.54, 0.11],
[4.63, -0.32],
[4.18, 0.53],
[4.48, -0.84],
[4.18, 0],
[5.97, -0.32],
[-2.09, -0.53],
[2.54, -0.32],
[-2.69, -0.53],
[3.58, 0.11],
[-3.28, -0.63],
[2.39, -0.21],
[-4.33, -0.63],
[-2.24, 0.74],
[-2.84, 0.32],
[-3.43, -0.11],
[-5.52, 0.32],
[-4.78, -0.11],
[-3.88, -0.95],
[-3.73, 0],
[-2.84, -0.63],
[-1.94, -1.58],
[0.6, -1.26],
[0.3, -2.21],
[-1.04, -1.47],
[-3.73, -0.53],
[-1.34, 1.68],
[0, 2.21],
[0.45, 1.79],
[-0.9, 1.16],
[-1.79, 0.32],
[-3.58, 0.42],
[-3.28, 0.63],
[-2.54, -0.11],
[-2.84, 0.63],
[-2.69, -0.53],
[-2.39, 0.11],
[-2.84, -0.21],
[-3.28, 0.11],
[-3.28, -0.42],
[-4.18, -0.63],
[1.79, 0.84],
[-3.43, -0.32],
[2.99, 0.95],
[-3.13, 0],
[2.84, 0.42],
[-2.54, 0.63],
[4.03, 0.53],
[2.09, 0.53],
[2.39, -0.32],
[3.58, 0.42],
[5.22, 0],
[4.33, -0.11],
[3.43, 0.63],
[3.43, 0],
[1.79, 1.05],
[0.3, 2.1],
[1.19, 2.63],
[0, 1.26],
[-0.45, 1.68],
[-0.45, 2.42],
            ]),
            inner = crunch([
                [41.49, 46.01],
[0.3, 2.31],
[-0.3, 3.47],
[0.3, 3.57],
[0.9, 2.73],
[-0.45, 2.63],
[-1.04, 3.15],
[0.15, 2.52],
[1.19, 2.52],
[1.34, 2.21],
[0.45, 2.1],
[-0.15, 1.47],
[1.64, 0.53],
[3.43, 0.11],
[-1.04, -1.47],
[-0.15, -0.95],
[-1.19, -1.68],
[-0.6, -3.36],
[0.15, -1.89],
[-0.6, -2.73],
[0.15, -1.26],
[0.6, -2.1],
[0.3, -2.42],
[0.15, -2.31],
[0.9, -2],
[0.75, -2.94],
[-0.3, 4.1],
[0.45, 2.31],
[-0.45, 3.05],
[0, 2.21],
[-0.75, 3.15],
[0.75, 2.63],
[0.45, 2.84],
[0.9, 2.31],
[-0.3, 1.79],
[1.49, 1.05],
[2.39, -0.53],
[3.28, 0.32],
[3.13, -0.32],
[-2.24, -1.05],
[-2.99, -0.84],
[-1.49, -1.68],
[-0.3, -2.63],
[0, -3.26],
[-0.3, -2.84],
[0.75, -2.1],
[0.15, -1.58],
[0.9, -2.94],
[0.9, -3.36],
[0.15, -3.99],
[-0.15, -3.36],
[0, -2.73],
[0.3, -3.99],
[1.04, -3.05],
[-0.15, -1.58],
[1.49, -2],
[3.28, -1.37],
[4.18, -1.37],
[2.69, -0.95],
[2.39, 0],
[3.58, -1.37],
[3.13, -1.26],
[2.39, -0.74],
[2.84, -0.95],
[2.99, -1.16],
[-2.69, 0.42],
[2.54, -1.37],
[-2.69, 0.84],
[3.13, -1.79],
[-3.13, 1.16],
[1.79, -1.68],
[-4.03, 1.37],
[-1.64, 1.05],
[-2.84, 0.53],
[-3.43, 0.63],
[-4.03, 1.37],
[-2.54, 1.16],
[-2.99, 0.63],
[-1.64, 0.53],
[-2.09, -0.21],
[-1.79, 0.21],
[-2.09, 0.53],
[-1.49, 0.42],
[-0.6, -0.63],
[2.09, -0.63],
[0.9, -1.89],
[-0.15, -1.89],
[-0.9, -0.63],
[0, -0.84],
[-0.75, -0.21],
[-0.75, -0.95],
[-1.49, -0.42],
[-1.94, 0.11],
[-1.64, -0.32],
[-1.49, 0],
[-1.34, 0.84],
[-1.34, 0.11],
[0, 0.95],
[-1.49, 0.21],
[0, 0.84],
[-0.9, 1.26],
[0.75, 0.74],
[-0.9, 0.95],
[1.49, 0.11],
[0, 1.05],
[1.34, 0.21],
[-0.3, 0.74],
[-2.54, -0.84],
[-2.54, 0],
[-1.94, 0.11],
[-2.69, -0.84],
[-2.84, -0.11],
[-1.19, -1.16],
[-2.24, -0.63],
[-2.69, -0.63],
[-3.28, -0.11],
[-2.24, -0.95],
[-0.6, -1.26],
[-3.28, -1.37],
[1.19, 1.16],
[-3.13, -0.95],
[2.09, 1.26],
[-2.99, -0.74],
[2.69, 1.68],
[-2.24, -0.42],
[2.69, 1.47],
[1.64, 0.95],
[1.49, 0.21],
[2.39, 0.63],
[2.39, 1.05],
[2.69, 0.95],
[2.24, 0.42],
[3.13, 0.84],
[2.09, 0.63],
[2.69, 0.74],
[1.64, 0.63],
[1.64, 1.68],
[1.34, 2.73],
[1.34, 3.05],
[-0.3, 3.15],
[-0.75, 2.52]
            ]),
            czz = crunch([
                [46.49, 47.2],
[0.94, 0.58],
[1.64, 0.08],
[-1.17, -1.07],
[1.87, 0.99],
[0.94, -0.99],
[-0.23, 0.91],
[1.64, -0.82],
[-1.41, 1.15],
[0, 0.82],
[0.12, 0.99],
[-1.29, 0.58],
[-0.47, -0.33],
[-0.7, 0.16],
[-0.82, -0.25],
[-0.12, -0.91],
[0.7, -0.91],
[0.82, -0.33],
[0, 0.58],
[-0.12, 0.49],
[-0.23, 0.58],
[0.47, 0.41],
[0.59, 0.16],
[0.59, -0.41],
[-0.12, -0.58],
[0, -0.74],
            ]),
            tits = crunch([
                [41.45, 33.11],
[1.76, 1.48],
[1.52, 0.49],
[2.11, -0.49],
[2.11, -0.49],
[1.64, 0.33],
[1.76, 0.41],
[1.29, 0],
[1.64, -0.49],
[1.05, -1.24]
            ]),
            face = crunch([
                [48.24, 23.89],
[-1.05, 0],
[-0.47, 0.33],
[0.7, 0.16],
[1.52, -0.49],
[0.82, 0.33],
[0.7, 0.25],
[0.7, -0.25],
[0.23, -0.41],
[-0.94, 0],
[-0.82, 0],
[-0.94, 0.49],
[-0.12, 0.66],
[-0.47, 0.33],
[0.47, 0.16],
[1.05, -0.08],
[0.59, 0.33],
[-0.12, 0.66],
[-2.11, -0.16],
[0.7, 0.25],
[1.05, 0.08],
            ]),
            circle = Leo.circle(w(49), h(42), w(47)).setAttributes(fillStyle),
            poly = Leo.polygon(
                w(11), h(21),
                w(88), h(21),
                w(88), h(75),
                w(11), h(75),
            ).setAttributes(fillStyle);



        // Leo.append(img);
        
        Leo.append(outer, inner,circle, poly, czz, tits, face);
        
        
        
        Leo.render();
        // Leo.positionInspector('[{r%x}, {r%y}],');
        document.body.appendChild(Leo.downloadAnchor());
    }
    render();
    window.addEventListener('resize', render);
    
}
