window.onload = function () {
    var target = document.getElementById('trg'),
        width = 987,
        height = 652,
        w = function (p) {return width * p/100;},
        h = function (p) {return height * p/100;},
        Leo = Leonardo(width, height, { ns: '*', target: target }),
        img = Leo.image(0,0,width, height, './god.jpg').setAttributes({opacity: 0.6}),
        main = Leo.group(),
        fillStyle = {
			"stroke-width": 2,
			"stroke": '#ef88d8',
			"stroke-opacity": 1,
			"fill-opacity": 10,
			"stroke-linejoin": "round",
			fill: 'transparent'
		}
        leftmid = Leo.path(Leo.pathBuild.M(w(44.07), h(50.61))
        .l(w(0.3), h(3.07))
        .l(w(0.81), h(3.07))
        .l(w(-0.1), h(2.91))
        .l(w(0.91), h(3.53))
        .l(w(-1.11), h(0.46))
        .l(w(-1.11), h(-0.92))
        .l(w(-1.01), h(-2.3))
        .l(w(-1.11), h(-3.68))
        .l(w(-0.81), h(-1.99))
        .l(w(-0.41), h(-3.99))).setAttributes(fillStyle)
        leftmid2 = Leo.path(Leo.pathBuild.M(w(42.86), h(60.89))
        .l(w(0.51), h(2.76))
        .l(w(-1.11), h(0))
        .l(w(-1.11), h(-0.92))
        .l(w(-0.3), h(-1.99))
        .l(w(0), h(-1.99))
        .l(w(-0.51), h(-0.46))
        .l(w(-0.71), h(-1.69))
        .l(w(-0.2), h(-1.99))
        .l(w(-0.71), h(-0.77))
        .l(w(-0.91), h(-0.77))
        .l(w(-1.11), h(-2.3))
        .l(w(0.3), h(2.45))
        .l(w(-0.1), h(2.61))).setAttributes(fillStyle),
        leftLast = Leo.path(Leo.pathBuild.M(w(34.95), h(61.96))
        .l(w(-0.71), h(2.15))
        .l(w(-0.61), h(0.31))
        .l(w(-0.91), h(-1.23))
        .l(w(-0.1), h(-1.53))
        .l(w(0.2), h(-1.99))).setAttributes(fillStyle),
        leftHole = Leo.path(Leo.pathBuild.M(w(33.33), h(51.84))
        .l(w(-0.2), h(-1.99))
        .l(w(-0.61), h(-1.38))
        .l(w(-1.42), h(0.31))).setAttributes(fillStyle),
        left1 =  Leo.path(
            Leo.pathBuild
            .M(w(1.11), h(37.12))
            .l(w(4.86), h(-1.69))
            .l(w(3.44), h(-3.37))
            .l(w(3.24), h(-1.69))
            .l(w(3.04), h(-0.61))
            .l(w(4.15), h(0.61))
            .l(w(4.26), h(1.38))
.l(w(3.65), h(1.07))
.l(w(4.26), h(0.31))
.l(w(2.84), h(0.77))
.l(w(1.52), h(2.15))
.l(w(1.32), h(2.45))
.l(w(3.44), h(1.07))
.l(w(1.72), h(1.69))
.l(w(1.62), h(0.77))
.l(w(1.22), h(2.61))
.l(w(1.93), h(3.83))
.l(w(0.91), h(2.91))
.l(w(1.93), h(3.37))
.l(w(-1.11), h(1.23))
.l(w(-1.52), h(-0.15))
.l(w(-1.52), h(-1.53))
.l(w(-0.61), h(-1.99))
.l(w(-1.62), h(-1.84))
.l(w(-1.82), h(-3.37))

.l(w(-1.25), h(-0.20))

.l(w(-2.94), h(-0.92))
.l(w(-0.81), h(-0.92))
.l(w(-1.32), h(1.07))
.l(w(-2.33), h(-0.46))
.l(w(-0.41), h(-0.92))
.l(w(-2.23), h(1.69))
.l(w(-0.71), h(0.92))
.l(w(2.43), h(4.29))
.l(w(1.52), h(0.77))
.l(w(1.62), h(1.99))
.l(w(1.42), h(2.3))
.l(w(0.91), h(3.37))
.l(w(-0.2), h(1.84))
.l(w(-1.42), h(0.92))
.l(w(-1.42), h(-0.92))
.l(w(-2.13), h(-2.3))
.l(w(-1.32), h(-1.99))
.l(w(-1.93), h(-1.99))
.l(w(-2.33), h(-1.53))
.l(w(-2.43), h(-1.07))
.l(w(-2.03), h(-0.15))
.l(w(-1.72), h(-1.07))
.l(w(-2.03), h(-2.15))
.l(w(-1.52), h(-3.22))
.l(w(-1.22), h(1.07))
.l(w(-1.93), h(0.77))
.l(w(-1.82), h(1.69))
.l(w(-1.72), h(3.07))
.l(w(-1.72), h(2.91))
.l(w(-1.93), h(2.91))
.l(w(-1.93), h(2.45))
.l(w(-1.93), h(2.15))
.l(w(-2.53), h(2.15))
            // .Z()
        ).setAttributes(fillStyle),
        right1 = Leo.path(Leo.pathBuild.M(w(98.99), h(34.66))
        .l(w(-1.42), h(-0.15))
        .l(w(-1.82), h(0.77))
        .l(w(-1.62), h(-0.15))
        .l(w(-1.32), h(0.15))
        .l(w(-1.52), h(0.61))
        .l(w(-1.22), h(1.07))
        .l(w(-1.22), h(0.77))
        .l(w(-1.42), h(0))
        .l(w(-1.72), h(0))
        .l(w(-1.62), h(1.07))
        .l(w(-1.62), h(1.23))
        .l(w(-1.52), h(0))
        .l(w(-1.72), h(0))
        .l(w(-1.82), h(0.61))
        .l(w(-1.42), h(0.77))
        .l(w(-1.72), h(0.77))
        .l(w(-1.62), h(1.38))
        .l(w(-1.32), h(1.07))
        .l(w(-1.22), h(0.61))
        .l(w(-1.11), h(0.46))
        .l(w(-1.01), h(0.15))
        .l(w(-1.32), h(0))
        .l(w(-1.01), h(0.61))
        .l(w(-1.52), h(0.31))
        .l(w(-1.52), h(-0.15))
        .l(w(-1.22), h(-0.15))
        .l(w(-0.91), h(0.31))
        .l(w(-1.22), h(-0.15))
        .l(w(-1.52), h(0.92))
        .l(w(-1.11), h(0.61))
        .l(w(-0.91), h(0.46))
        .l(w(-0.81), h(0))
        .l(w(-0.61), h(0.46))
        .l(w(-1.32), h(0.92))
        .l(w(-0.91), h(0.46))
        .l(w(-0.41), h(1.07))
        .l(w(0.2), h(1.38))
        .l(w(0.81), h(0.61))
        .l(w(1.01), h(0.46))
        .l(w(1.52), h(0))
        .l(w(1.22), h(-0.46))
        .l(w(0.81), h(-0.61))
        .l(w(1.32), h(0.15))
        .l(w(1.42), h(-0.46))
        .l(w(1.01), h(-0.46))
        .l(w(1.11), h(0.61))
        .l(w(1.72), h(0.31))
        .l(w(1.11), h(0.15))
        .l(w(0.71), h(0))
        .l(w(0.51), h(0.92))
        .l(w(1.11), h(0.92))
        .l(w(-0.61), h(1.23))
        .l(w(-0.41), h(1.07))).setAttributes(fillStyle),
        right2 = Leo.path(Leo.pathBuild.M(w(73.35), h(49.54))
        .l(w(-1.42), h(1.99))
        .l(w(-1.11), h(2.61))
        .l(w(-1.52), h(1.53))
        .l(w(-1.22), h(0.46))
        .l(w(-0.3), h(0.92))
        .l(w(-0.81), h(-0.15))
        .l(w(-1.22), h(0.77))
        .l(w(-0.61), h(1.23))
        .l(w(-1.93), h(1.38))
        .l(w(-0.61), h(1.69))
        .l(w(0.3), h(1.53))
        .l(w(0.81), h(1.07))
        .l(w(1.22), h(0.77))
        .l(w(2.13), h(-0.15))
        .l(w(1.72), h(-1.07))
        .l(w(1.32), h(-1.99))
        .l(w(1.52), h(-1.38))
        .l(w(1.72), h(-1.23))
        .l(w(1.62), h(-0.92))
        .l(w(1.42), h(0.46))
        .l(w(1.52), h(0.15))
        .l(w(1.93), h(-0.46))
        .l(w(1.72), h(-0.61))
        .l(w(1.11), h(-1.23))
        .l(w(1.32), h(-1.99))).setAttributes(fillStyle),
        right3 = Leo.path(Leo.pathBuild.M(w(64.54), h(65.18))
        .l(w(0), h(2.76))
        .l(w(-0.41), h(1.84))
        .l(w(0), h(1.69))
        .l(w(0.3), h(1.53))
        .l(w(0.1), h(3.07))
        .l(w(0.91), h(1.38))
        .l(w(1.42), h(-0.15))
        .l(w(0.41), h(-1.23))
        .l(w(0.2), h(-2.3))
        .l(w(-0.2), h(-2.15))
        .l(w(0.3), h(-1.53))
        .l(w(0.1), h(-1.99))
        .l(w(0.3), h(-1.99))
        .l(w(1.01), h(-2.3))).setAttributes(fillStyle),
        right4 = Leo.path(Leo.pathBuild.M(w(67.17), h(76.53))
        .l(w(0.71), h(0.77))
        .l(w(1.42), h(-0.46))
        .l(w(0.51), h(-1.69))
        .l(w(0.3), h(-1.84))
        .l(w(-0.3), h(-1.23))
        .l(w(0.71), h(-1.53))
        .l(w(0.41), h(-1.84))
        .l(w(0.1), h(-1.23))
        .l(w(1.22), h(-1.38))
        .l(w(1.01), h(-1.99))
        .l(w(-0.3), h(2.61))
        .l(w(-0.51), h(1.84))
        .l(w(-0.1), h(1.69))
        .l(w(0), h(1.38))
        .l(w(0.3), h(2.15))
        .l(w(0.61), h(1.69))
        .l(w(1.32), h(0.31))
        .l(w(0.81), h(-0.92))
        .l(w(0.41), h(-1.99))
        .l(w(-0.1), h(-1.53))
        .l(w(0), h(-1.99))
        .l(w(0.51), h(-1.23))
        .l(w(0.41), h(-1.23))
        .l(w(0), h(-1.07))
        .l(w(1.93), h(-0.15))
        .l(w(1.11), h(0))
        .l(w(1.01), h(-0.92))
        .l(w(1.32), h(-1.23))
        .l(w(1.22), h(-0.61))
        .l(w(0.81), h(-0.92))
        .l(w(0.81), h(-1.69))
        .l(w(1.32), h(-1.07))
        .l(w(0.71), h(-1.07))
        .l(w(0.71), h(-0.61))
        .l(w(0.2), h(-1.07))
        .l(w(0.81), h(0.15))
        .l(w(0.61), h(-0.61))
        .l(w(1.52), h(0))
        .l(w(1.32), h(0.31))
        .l(w(1.42), h(0.46))
        .l(w(1.32), h(0.61))
        .l(w(1.22), h(0.46))
        .l(w(1.72), h(0.31))
        .l(w(1.22), h(0.31))).setAttributes(fillStyle);
        /*
        
.l(w(1.11), h(37.12))
.l(w(4.86), h(-1.69))
.l(w(3.44), h(-3.37))
.l(w(3.24), h(-1.69))
.l(w(3.04), h(-0.61))
.l(w(4.15), h(0.61))

.l(w(4.26), h(1.38))
.l(w(3.65), h(1.07))
.l(w(4.26), h(0.31))
.l(w(2.84), h(0.77))
.l(w(1.52), h(2.15))
.l(w(1.32), h(2.45))
.l(w(3.44), h(1.07))
.l(w(1.72), h(1.69))
.l(w(1.62), h(0.77))
.l(w(1.22), h(2.61))
.l(w(1.93), h(3.83))
.l(w(0.91), h(2.91))
.l(w(1.93), h(3.37))
.l(w(-1.11), h(1.23))
.l(w(-1.52), h(-0.15))
.l(w(-1.52), h(-1.53))
.l(w(-0.61), h(-1.99))
.l(w(-1.62), h(-1.84))
.l(w(-1.82), h(-3.37))
.l(w(3.65), h(1.69))
.l(w(-2.94), h(-0.92))
.l(w(-0.81), h(-0.92))
.l(w(-1.32), h(1.07))
.l(w(-2.33), h(-0.46))
.l(w(-0.41), h(-0.92))
.l(w(-2.23), h(1.69))
.l(w(-0.71), h(0.92))
.l(w(2.43), h(4.29))
.l(w(1.52), h(0.77))
.l(w(1.62), h(1.99))
.l(w(1.42), h(2.3))
.l(w(0.91), h(3.37))
.l(w(-0.2), h(1.84))
.l(w(-1.42), h(0.92))
.l(w(-1.42), h(-0.92))
.l(w(-2.13), h(-2.3))
.l(w(-1.32), h(-1.99))
.l(w(-1.93), h(-1.99))
.l(w(-2.33), h(-1.53))
.l(w(-2.43), h(-1.07))
.l(w(-2.03), h(-0.15))
.l(w(-1.72), h(-1.07))
.l(w(-2.03), h(-2.15))
.l(w(-1.52), h(-3.22))
.l(w(-1.22), h(1.07))
.l(w(-1.93), h(0.77))
.l(w(-1.82), h(1.69))
.l(w(-1.72), h(3.07))
.l(w(-1.72), h(2.91))
.l(w(-1.93), h(2.91))
.l(w(-1.93), h(2.45))
.l(w(-1.93), h(2.15))
.l(w(-2.53), h(2.15))

        
        */
    
    

    main.append(img)

    Leo.append(main);
    Leo.append(left1, leftmid, leftmid2, leftLast, leftHole);
    Leo.append(right1, right2, right3, right4);
    
    Leo.render();
    Leo.positionInspector('.l(w({RPx}), h({RPy}))');
    document.body.appendChild(Leo.downloadAnchor())
}
