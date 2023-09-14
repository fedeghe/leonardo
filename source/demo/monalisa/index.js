window.onload = function () {

    function render() {
        var target = document.getElementById('trg'),
            prop = 350/350,
            // width = Math.min(987, window.innerWidth-50),
            width = window.innerWidth-50,
            height = parseInt(width / prop, 10),
            w = function (p) {return width * p/100;},
            h = function (p) {return height * p/100;},
            Leo = Leonardo(width, height, { ns: '*', target: target }).setStyles({backgroundColor: '#222'}),
            img = Leo.image(0,0,width, height, './monaleo.jpg').setAttributes({opacity: 0.4}),
            fillStyle = {
                "stroke-width": 2,
                "stroke": '#ef88d8',
                "stroke-opacity": 1,
                "fill-opacity": 10,
                "stroke-linejoin": "round",
                fill: 'transparent'
            },
            fillStyle2 = {
                "stroke-width": 2,
                "stroke": '#88efd8',
                "stroke-opacity": 1,
                "fill-opacity": 10,
                "stroke-linejoin": "round",
                fill: 'transparent'
            },

            crunch = Leo.positionCruncher(width, height, fillStyle),
            crunch2 = Leo.positionCruncher(width, height, fillStyle2),
            pieces = [[
                [17.22, 38.52],
                [0.89, -2.68],
                [1.79, -1.79],
                [3.83, -0.64],
                [3.57, 0],
                [3.44, 1.28],
                [2.55, 1.66],
                [1.66, 2.68],
                [-0.51, 3.06],
                [-2.93, 2.81],
                [-3.7, 1.28],
                [-2.93, -0.64],
                [-6.38, -1.4],
                [-0.64, -1.66],
                [-0.38, -2.17],
            ],[
                [19.77, 0.13],
                [-2.68, 1.91],
                [-2.3, 4.08],
                [-1.02, 4.97],
                [-0.38, 4.34],
                [-1.28, 4.97],
                [0.26, 4.08],
                [0, 4.85],
                [0, 5.23],
                [-0.26, 3.83],
                [0.26, 4.85],
                [-0.13, 4.46],
                [0.38, 4.85],
                [0.77, 4.21],
                [1.02, 3.06],
                [0, 4.34],
                [0, 4.46],
                [1.4, 5.74],
                [1.79, 5.48],
                [3.06, 4.46],
                [2.68, 3.19],
                [3.57, 3.57],
                [2.81, 1.79],
                [3.06, 3.83],
                [2.04, 2.04],
                [2.81, 1.02],
                [1.79, 0]
            ],
            [
                [32.02, 58.8],
                [-0.38, 2.68],
                [-0.51, 2.68],
                [0.38, 2.68],
                [1.53, 0.26],
                [1.02, 1.4],
                [1.79, 1.53],
                [2.04, 0],
            ],
            [
                [33.55, 40.82],
                [-2.42, 0.13],
                [-4.46, 0],
                [-3.57, 0.26],
                [-2.81, -0.38],
                [-1.66, -1.4],
                [1.4, -1.66],
                [2.17, -1.4],
                [3.57, -0.26],
                [3.83, 0.77],
                [2.04, 1.28],
                [2.04, 2.3],
            ],
            [
                [13.39, 0.38],
                [-2.68, 3.06],
                [-2.17, 4.97],
                [-0.51, 4.97],
                [-3.44, 2.68],
                [-2.04, 4.72],
                [0.38, 5.36],
                [3.44, 6.38],
                [-1.15, 4.34],
                [-2.04, 5.99],
                [1.15, 6.63],
                [1.15, 4.08],
                [-3.06, 3.19],
                [-1.02, 6.76],
                [1.15, 6.25],
                [1.91, 5.36],
                [-0.38, 5.48],
                [-1.15, 7.91],
                [2.04, 6.63],
                [0.51, 3.83],
            ],
            [
                [11.61, 0.13],
                [-2.17, 2.93],
                [-2.68, 5.23],
                [-3.19, 3.7],
                [-2.81, 3.32],
                [-0.77, 3.32],
            ],
            [
                [38.52, 77.3],
                [-1.91, -0.51],
                [-1.91, -0.51],
                [-2.17, 0.38],
                [-1.02, 1.91],
                [-1.53, 0],
                [1.4, 0.51],
                [2.04, -0.38],
                [2.04, 0.38],
                [1.4, 0.51],
                [1.79, 0.38],
            ],
            [
                [39.03, 84.18],
[-2.3, -0.26],
[-2.68, -1.66],
[-1.15, -1.4],
[-1.4, -1.28],
[2.93, -0.64],
[2.42, 0.77],
[2.04, 0.64],
            ],
            [
                [25.38, 40.31],
[-0.64, -1.53],
[-0.13, -1.53],
[0.13, -1.02],
[1.79, 0.13],
[-0.13, 1.02],
[1.53, -0.38],
[-1.15, 1.02],
[1.28, -0.26],
[-0.77, 1.02],
[0.77, -0.64],
[0.64, 0.77],
[0, -1.15],
[0.89, 0.26],
[-0.64, -1.15],
[1.02, 0.64],
[0.13, 1.28],
[-0.13, 0.77],
[-0.51, 0.64],
[-0.51, 0.64],
            ]
        ],
        pieces2 = [
            [
                [47.45, 30.23],
[1.02, 1.91],
[1.4, 1.02],
[-0.13, -1.15],
[0.89, 1.28],
[1.15, 0.13],
[1.66, 0.51],
[-1.91, -2.17],
[2.42, 1.28],
[1.4, 1.15],
[3.83, 0.64],
[-2.3, -1.53],
[-3.06, -2.55],
[2.42, 1.15],
[2.3, 1.15],
[2.3, 1.4],
[-2.17, -2.3],
[-1.28, -2.42],
[2.55, 2.3],
[1.53, 1.4],
[2.68, 1.53],
[-1.4, -2.04],
[-2.04, -1.79],
[-1.28, -1.91],
[5.1, 4.46],
[2.81, 1.66],
[2.42, 0],
[-2.3, -1.02],
[-3.32, -1.66],
[-3.32, -3.57],
[2.93, 1.79],
[4.46, 2.68],
[2.68, 0.64],
[-3.19, -2.04],
[-4.34, -3.7],
            ],
            [
                [50.26, 39.67],
[2.17, -0.64],
[2.17, -1.4],
[2.04, -1.4],
[3.19, -0.51],
[2.68, 0],
[2.68, 0.38],
[2.68, 0.89],
[2.81, 1.15],
[-1.4, 1.53],
[-2.42, 1.28],
[-3.95, 0.64],
[-3.44, -0.13],
[-3.44, -0.77],
[-2.68, -0.89],
            ],
            [
                [57.65, 36.99],
[0.89, 1.91],
[1.79, 1.28],
[1.91, 0.26],
[2.3, -0.26],
[1.4, -1.66],
[0.77, -1.28],
[-1.53, -0.51],
[-1.91, -0.38],
[1.53, 0.89],
[-2.17, -1.15],
[1.66, 2.04],
[-1.79, -1.53],
[0.89, 2.04],
[-0.38, -1.15],
[-0.38, 1.28],
[-0.13, -1.15],
[-1.02, 0.77],
[0.13, -1.66],
[-0.89, 0.38],
[1.28, -1.02],
[-1.91, 0.26],
            ],
            [
                [39.67, 70.28],
[1.79, 0.26],
[1.4, -0.26],
[2.68, -1.66],
[-2.93, 0.89],
[1.28, -1.53],
[1.28, -1.28],
[2.3, 0.13],
[1.79, -0.13],
[1.53, -0.64],
[1.02, -1.4],
[0.64, -2.04],
[-0.38, -1.79],
[-1.02, -1.66],
[-2.04, -1.15],
            ],
            [
                [39.29, 80.23],
[1.66, -0.38],
[1.79, -1.02],
[2.3, 0.13],
[1.15, 0.64],
[2.3, 0.38],
[2.17, 0.26],
[1.53, 0.64],
[2.68, 0.64],
[-1.79, -1.53],
[-5.36, -3.19],
[-3.44, -0.64],
[-3.06, 0.26],
[-1.66, 0.26],
            ],
            [
                [39.29, 84.06],
[2.55, -0.38],
[2.55, -0.89],
[3.19, 0],
[3.19, 0],
[3.19, -0.64],
[0.77, -0.26],
            ],
            [
                [52.81, 61.61],
[1.66, 1.91],
[2.55, 3.44],
[2.42, 3.7],
[1.91, 3.06],
[1.53, 2.3],
            ],
            [
                [53.19, 44.77],
[1.4, 2.93],
[2.55, 1.66],
[3.7, 1.15],
[2.81, -0.26],
[2.42, -2.04],
[4.34, -0.64],
[4.72, -0.38],
[3.83, -1.4],
[-10.59, 1.28],
[-5.1, 0.26],
[-5.23, -1.02],
[-2.17, 0],
            ],
            [
                [60.46, 15.56],
[2.68, 1.02],
[4.08, 0.26],
[3.06, 1.79],
[2.68, 2.3],
[2.3, 3.19],
            ]
        ]


        Leo.append(img);
        Leo.append(pieces.map(function(p) {return crunch(p)}));
        Leo.append(pieces2.map(function(p) {return crunch2(p)}));
        
        
        
        
        
        Leo.render();
        Leo.positionInspector('[{r%x}, {r%y}],');
    }
    render();
    window.addEventListener('resize', render);
    
}