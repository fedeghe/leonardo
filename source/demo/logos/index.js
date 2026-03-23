window.onload = function () {
 
    (function() {
        var target = document.getElementById('trg1'),
            
            width = 225,
            height = 80,
            bricks = [],

            L = Leonardo(width, height, {ns : '*', target : target}),
            bricksGroup = L.group(),
            malta = L.path(
                L.pathBuild.m(60,35)
                .q(-60,-2, -50, 10)
                .l(95,30)
                .q(0,2, 5, 2)
                .q(5,2, 5, -2)
                .l(100,-10)
                .q(5, 0, 5, -20)
                .q(0, -12, -60, -10)
            ).setAttributes({
                fill : '#777',
                "stroke-width" : 2.5,
                stroke : 'black'
            }),
            brick = L.rect(0, 0, 100, 30).setAttributes({
                "stroke-width" : 2.5,
                "stroke-linejoin" : 'round',
                "stroke" : 'black',
                fill : 'brown'
            });

        bricks.push(brick.clone().move(55,0))
        bricks.push(brick.clone().move(0,40))
        bricks.push(brick.clone().move(110,40))

        bricksGroup.append(bricks).move(5, 5);

        L.append(malta, bricksGroup);

        L.render();

        target.appendChild(L.svgDownloadAnchor({name: 'malta'}))
    })();


    (function(){
        var target = document.getElementById('trg2'),
            Leo = Leonardo(600, 250, { ns: '*', target: target }),
            main = Leo.group(),
            c = Leo.group(),
            v = Leo.group(),
            e = Leo.group(),
            r = Leo.group(),
            stroke = 10;
        c.append(Leo.polygon(0,50, 50,0, 150,0, 100,50, 150,100, 50,100).setAttributes({
            fill : 'green',
            "stroke-width" : stroke,
            stroke : 'black',
            'stroke-linejoin': 'round'
        }));
        v.append(Leo.polygon(0,50, 50,0, 100,50, 125,25, 175,25, 75,125).setAttributes({
            fill : 'white',
            "stroke-width" : stroke,
            stroke : 'black',
            'stroke-linejoin': 'round'
        }));
        e.append(Leo.polygon(0,100, -25,75, 75,-25, 125,25, 100,50, 125,75, 100,100).setAttributes({
            fill : 'white',
            "stroke-width" : stroke,
            stroke : 'black',
            'stroke-linejoin': 'round'
        }));
        e.append(Leo.polyline(50,25, 75,25, 100,50).setAttributes({
            fill : 'transparent',
            "stroke-width" : stroke,
            stroke : 'black',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }));
        e.append(Leo.polyline(50,75, 75,75, 100,50).setAttributes({
            fill : 'transparent',
            "stroke-width" : stroke,
            stroke : 'black',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }));
        r.append(Leo.polygon(0,0, 100,0, 150,50, 125,75, 150,100, 100,100, 75,75, 50,100, 0,100, 25,75, 0,50, 25,25).setAttributes({
            fill : 'red',
            "stroke-width" : stroke,
            stroke : 'black',
            'stroke-linejoin': 'round'
        }));
        main.append(
            c,
            v.move(100),
            e.move(250),
            r.move(350)
        ).setAttributes({
            filter: Leo.filter(
                {type:'feDropShadow',
                    attrs:{
                        dx:5,
                        dy:5,
                        stdDeviation:"2.5",
                        "flood-color":"gray",
                        "flood-opacity":"6.5"
                    }
                },
            )
        })

        Leo.append(main.move(40, 90));
        Leo.render();
        target.appendChild(Leo.svgDownloadAnchor({name: 'cver'}));

        // var img = Leo.toImageTag();
        // target.appendChild(img);
    })();

    (function(){
        var target = document.getElementById('trg3'),
            // REF
            devSize = 512,
            width = devSize,
            height = devSize,
            zoom = 1,
            L = Leonardo(width * zoom, height * zoom, {id : 'hero', target}),
            title = L.title('jshero'),
            container = L.group(),
            logo = L.group(),
            // w = function (i) {return devSize * i/1E3 * zoom;},
            // h = function (i) {return devSize * i/1E3 * zoom;},
            w = L.getScaler(devSize, 1e3, zoom),
            h = L.getScaler(devSize, 1e3, zoom),
            
            fillStyle = {
                "stroke-width": h(80),
                "stroke": '#dd0000',
                "stroke-opacity": 1,
                "fill-opacity": 1,
                "stroke-linejoin": "round",
                fill: '#efda4f'
            },

            brdStyle = {
                // "stroke-width": h(20),
                // "stroke": 'black',
                "stroke-opacity": 1,
                "stroke-linejoin": "miter",
                fill: 'none'
            },

            bg = L.rect(0,0,w(1000),h(1000)).setAttributes({
                fill: L.radialGradient([
                    { perc: 0, color: '#0055aa' },
                    
                    { perc: 50, color: '#0088ff' },
                    
                    { perc: 100, color: '#0055aa' },
                ]),
                rx: h(140), 
                ry: h(140)
            }),
            
            brdFill = L.path(L.pathBuild
                .M(w(200), h(230))

                .L(w(800), h(230))

                .L(w(910), h(500))

                .L(w(500), h(850))

                .L(w(90), h(400))
                .Z()
            ).setAttributes(fillStyle),

            brdIn = L.path(L.pathBuild
                .M(w(177), h(190))
                .L(w(823), h(190))
                .L(w(960), h(405))
                .L(w(500), h(910))
                .L(w(40), h(405))
                .Z()
            ).setAttributes(brdStyle),

            brdOut = L.path(L.pathBuild
                .M(w(222), h(269))
                .L(w(778), h(269))
                .L(w(860), h(396))
                .L(w(500), h(792))
                .L(w(140), h(396))
                .Z()
            ).setAttributes(brdStyle),

            family = "Verdana", //Arial

            J = L.text(w(290), h(580), "J").setAttributes({
                'font-size' : h(400),
                'font-family' : family,
                "stroke-width": h(50),
                "stroke": '#dd0000',
                color:'black'
            }),
            S = L.text(w(490), h(580), "S").setAttributes({
                'font-size' : h(400),
                'font-family' : family,
                "stroke-width": h(50),
                "stroke": '#dd0000',
                color:'black'
            }),
            J2 = J.clone().move(w(10), h(10)).setAttributes({
                'opacity' : 0.4
            }),
            S2 = S.clone().move(w(10), h(10)).setAttributes({
                'opacity' : 0.4
            });

        container.setAttributes({
            viewBox : "0 0 " + width + " " + height
        }).append(bg);

        logo.append(title, brdFill,  brdIn, brdOut, J, J2, S, S2)
            .move(0, -20);

        container.append(logo);
        L.append(
            // title,
            // bg, 
            container.scale(0.8).move(w(35), h(165)).rotate(-8),
            // brdIn,
            // brdOut,
            // J, J2,
            // S, S2
        );

        L.render();
        target.appendChild(L.svgDownloadAnchor({name: 'jsHero'}));
    })();


    (function () {
        var target = document.getElementById('trg4'),
            width = 500,
            height = 500,
            min = width > height ? height : width,
            wperc = width / 100,
            hperc = height / 100,
            mperc = min / 100,

            w = function (n) { return n * wperc; },
            h = function (n) { return n * hperc; },
            m = function (n) { return n * mperc; },

            L = Leonardo(width, height, { ns: '*', target: target }),
            attrs = {
                cloud: { fill: '#3C3C3B' },
                thunder: {
                    fill: '#eeee00',
                    stroke: '#ff660077',
                    'stroke-width': 15
                },
            },

            elements = {
                cloud: [
                    L.circle(w(20), h(50), m(15)),
                    L.circle(w(80), h(50), m(15)),
                    L.circle(w(58), h(33), m(22)),
                    L.circle(w(30), h(33), m(10)),
                    L.rect(w(20), h(35), w(60), h(30)),
                ],
                thunder: [
                    L.polygon(
                        w(50), h(0),
                        w(43), h(47),
                        w(67), h(38),
                        
                        w(50), h(100),
                        w(57), h(53),
                        w(33), h(62)
                    ),
                ]
            },
            cloud = L.group()
                .append(elements.cloud)
                .setAttributes(attrs.cloud),
            thunder = L.group()
                .append(elements.thunder)
                .setAttributes(attrs.thunder)
                .scale(1, 0.5)
                .move(0, 200);
        thunder.append(L.animate.attr({
            attributeName: 'stroke',
            values: '#ff660077;#ffaa00aa;#ff660077',
            dur: '0.3s',
            repeatCount: 'indefinite'
        }))
        thunder.append(L.animate.attr({
            attributeName: 'fill',
            values: '#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#eeee00;#fff',
            dur: '5s',
            repeatCount: 'indefinite'
        }))

        L.append(cloud, thunder);
        L.render();
        
        target.appendChild(
            L.pngDownloadAnchor({txt: 'download as png', name: 'synchazard'})
        );
        // target.appendChild(L.svgDownloadAnchor({name: 'synchazard'}));
    })();


    (function () {
        var target = document.getElementById('trg5'),
            width = 500,
            height = 100,
            min = width > height ? height : width,
            hperc = height / 100,
            mperc = min / 100,
            
            L = Leonardo(width, height, { ns: '*', target: target }),
            w = L.getScaler(width, 1e3),
            h = L.getScaler(height, 1e3),



            blackBox = L.rect(0,0,w(700),h(1000)).setAttributes({
                rx: h(140), 
                ry: h(140),
                fill: '#000000'
            }),
            orangeBox = L.rect(w(600),0,w(400),h(1000)).setAttributes({
                rx: h(140), 
                ry: h(140),
                fill: '#ff7700'
            }),

            common = {
                'font-family': 'verdana',
                    'font-size': '4rem',
                    'font-weight': 'bold',
            }
            elements = {
                good: L.text(w(50),75,'Good').setAttributes({
                    ...common,
                    fill:'#ffffff',
                    'letter-spacing': 21,
                    filter: L.filter(
                        {type:'feDropShadow',
                            attrs:{
                                dx:0,
                                dy:0,
                                stdDeviation:"5",
                                "flood-color":"#ff7700",
                                "flood-opacity":"6.5",
                            }
                        },
                    )
                }),
                boy: L.text(w(650),75,'boy').setAttributes({
                    ...common,
                    'letter-spacing': 10,
                    fill:'#000000',
                    filter: L.filter(
                        {type:'feDropShadow',
                            attrs:{
                                dx:0,
                                dy:0,
                                stdDeviation:"10",
                                "flood-color":"white",
                                "flood-opacity":"6.5",
                            }
                        },
                    )
                }),
                
            },
            g = L.group(
                blackBox,
                orangeBox,
                elements.good, elements.boy
            );
            // .scale(0.9).move(w(50), h(50)).sas({
            //     filter: L.filter(
            //         {type:'feDropShadow',
            //             attrs:{
            //                 dx:0,
            //                 dy:0,
            //                 stdDeviation:"2",
            //                 "flood-color":"red",
            //                 "flood-opacity":"6.5",
            //             }
            //         },
            //     )
            // });

        


        L.append(g).render();
        
        target.appendChild(
            L.pngDownloadAnchor({txt: 'download as png', name: 'good boy'})
        );
        // target.appendChild(L.svgDownloadAnchor({name: 'synchazard'}));
    })();
};