window.onload = function () {

    function render() {
        console.log(Leonardo);
        var target = document.getElementById('trg'),
            bxWidth = 150,
            bxHeight = 100,
            letters = 7
            height = bxHeight,
            width = bxWidth  * letters,
            prop = width / height,
            // width = Math.min(987, window.innerWidth-50),
            // width = window.innerWidth - 50,
            // height = parseInt(width / prop, 10),
            Leo = Leonardo(width, height, { ns: '*', target: target }).setStyles({
                // backgroundColor: '#222222aa' 
            }),
            w = Leonardo.getScaler(width), //function (p) { return width * p / 100; },
            h = Leonardo.getScaler(height), //function (p) { return height * p / 100; },
            img = Leo.image(0, 0, width, height, './uoullet.jpg').setAttributes({ opacity: 0.4 }),
            fillStyle = {
                "stroke-width": 2,
                "stroke-opacity": 1,
                "fill-opacity": 10,
                "stroke-linejoin": "round",
                "stroke": '#fff',
                fill: '#ffffff55'
            },
            gridStyle = {...fillStyle, "stroke-width": 2, "stroke-opacity": 0.2,"stroke": '#fff',},
            boxStyle = {...fillStyle, "stroke-width": 2, "stroke-opacity": 0.2,"stroke": '#00f',},
         
            crunch = Leo.positionCruncher(width, height, fillStyle),
            crunchClose = Leo.positionCruncher(width, height, fillStyle, true),

            gap = 5,
            hGapMul = 4,
            wGapMul = 8,
            bx1 = Leo.group(
                Leo.rect(0, 0, bxWidth, bxHeight).setAttributes(boxStyle),
                Leo.group(
                    Leo.line(0, gap, bxWidth, gap),
                    Leo.line(0, gap*hGapMul, bxWidth, gap*hGapMul),
                    Leo.line(0, gap*(hGapMul+1), bxWidth, gap*(hGapMul+1)),
                    Leo.line(0, bxHeight-gap,bxWidth,bxHeight-gap),
                    Leo.line(0,bxHeight-gap*hGapMul,bxWidth,bxHeight-gap*hGapMul),
                    Leo.line(0,bxHeight-gap*(hGapMul+1),bxWidth,bxHeight-gap*(hGapMul+1)),


                    Leo.line(gap, 0, gap, bxHeight),
                    Leo.line(gap*wGapMul,0,gap*wGapMul,bxHeight),
                    Leo.line(bxWidth - gap,0,bxWidth - gap,bxHeight),
                    Leo.line(bxWidth - gap*wGapMul,0,bxWidth - gap*wGapMul,bxHeight),
                    
                ).setAttributes(gridStyle)
            ),
            bx2 = bx1.clone(),
            bx3 = bx1.clone(),
            bx4 = bx1.clone(),
            bx5 = bx1.clone(),
            bx6 = bx1.clone(),
            bx7 = bx1.clone()
            u1 = Leo.path(
                Leo.pathBuild
                    .M(gap, gap*hGapMul)
                    .L(gap, bxHeight - gap*hGapMul)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap*wGapMul, bxHeight - gap)
                    .L(bxWidth - gap*wGapMul, bxHeight - gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, bxWidth - gap, bxHeight - gap*hGapMul)
                    .L(bxWidth - gap, gap*hGapMul)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, bxWidth - gap*wGapMul, gap)

                    .L(bxWidth - gap*wGapMul - 10, gap)
                    .A(10, gap*hGapMul, 0, 0, 1, bxWidth - gap*wGapMul, gap*(hGapMul+1))
                    .L(bxWidth - gap*wGapMul, bxHeight - gap*(hGapMul+1))
                    .A(gap, gap, 0, 0, 1, bxWidth - gap*wGapMul - gap, bxHeight - gap*(hGapMul+1)+gap)
                    .L(gap*wGapMul + gap, bxHeight - gap*hGapMul)
                    .A(gap, gap, 0, 0, 1, gap*wGapMul, bxHeight - gap*hGapMul - gap)
                    .L(gap*wGapMul, gap*(hGapMul+1))
                    .A(10, gap*hGapMul, 0, 0, 1, gap*wGapMul + 10, gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap, gap*hGapMul)
                    .Z()

                    // .L(gap*(wGapMul+4), bxHeight - gap*hGapMul)
                    // .A(gap*wGapMul + 10, bxHeight - gap*hGapMul, 0, 0, 1, gap*wGapMul, bxHeight - gap*(hGapMul+1))
                    // .L(gap*wGapMul, gap*(hGapMul+1))
                    
                    // .L(bxWidth - gap*wGapMul - 10, gap)

                    // .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap, gap*hGapMul)
                    // .Z()
                    ),
            o = Leo.path(
                Leo.pathBuild
                    .M(gap, gap*hGapMul)
                    .L(gap, bxHeight - gap*hGapMul)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap*wGapMul, bxHeight - gap)
                    .L(bxWidth - gap*wGapMul, bxHeight - gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, bxWidth - gap, bxHeight - gap*hGapMul)
                    .L(bxWidth - gap, gap*hGapMul)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, bxWidth - gap*wGapMul, gap)
                    .L(gap*wGapMul, gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap, gap*hGapMul)
                    .M(gap*wGapMul+gap, gap*hGapMul)
                    .L(bxWidth-gap*wGapMul -gap, gap*hGapMul)
                    .A(gap, gap, 0,0,1,bxWidth-gap*wGapMul, gap*hGapMul + gap)
                    .L(bxWidth-gap*wGapMul, bxHeight - gap*hGapMul - gap)
                    .A(gap, gap, 0,0,1,bxWidth-gap*wGapMul -gap, bxHeight - gap*hGapMul)
                    .L(gap*wGapMul+gap, bxHeight - gap*hGapMul)
                    .A(gap, gap, 0,0,1,gap*wGapMul, bxHeight - gap*hGapMul-gap)
                    .L(gap*wGapMul, gap*hGapMul+gap)
                    .A(gap, gap, 0,0,1,gap*wGapMul+gap, gap*hGapMul)
                    .Z()
                    
            ).move(bxWidth, 0),
            l1 = Leo.path(
                Leo.pathBuild
                    .M(gap, gap*hGapMul)
                    .L(gap, bxHeight - gap*hGapMul)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap*wGapMul, bxHeight - gap)
                    .L(bxWidth - gap*wGapMul, bxHeight - gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, bxWidth - gap, bxHeight - gap*hGapMul)
                    .L(bxWidth - wGapMul*gap/2, bxHeight - hGapMul*gap - wGapMul*gap/2)
                    .A(wGapMul*gap/2, wGapMul*gap/2, 0, 0, 1, bxWidth - wGapMul*gap/2 - wGapMul*gap/2, bxHeight - hGapMul*gap)
                    .L(wGapMul*gap + gap, bxHeight - hGapMul*gap)
                    .A(gap, gap, 0, 0, 1, wGapMul*gap + gap - gap, bxHeight - hGapMul*gap - gap)
                    .L(wGapMul*gap, hGapMul*gap + gap)
                    .A(10, gap*hGapMul, 0, 0, 1, gap*wGapMul + 10, gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap, gap*hGapMul)
                    .Z()
                    
            ).move(bxWidth*3, 0),
            l2 = l1.clone().move(bxWidth*4, 0),

            eMidDist = bxWidth*7/10,
            e = Leo.path(
                Leo.pathBuild
                    .M(gap, gap*hGapMul)
                    .L(gap, bxHeight - gap*hGapMul)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap*wGapMul, bxHeight - gap)
                    .L(bxWidth - gap*wGapMul, bxHeight - gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, bxWidth - gap, bxHeight - gap*hGapMul)
                    .L(bxWidth - wGapMul*gap/2, bxHeight - hGapMul*gap - wGapMul*gap/2)
                    .A(wGapMul*gap/2, wGapMul*gap/2, 0, 0, 1, bxWidth - wGapMul*gap/2 - wGapMul*gap/2, bxHeight - hGapMul*gap)
                    .L(wGapMul*gap + gap, bxHeight - hGapMul*gap)
                    .A(gap, gap, 0, 0, 1, wGapMul*gap + gap - gap, bxHeight - hGapMul*gap - gap)

                    .L(wGapMul*gap, bxHeight/2 + hGapMul*gap/2)
                    .L(eMidDist, bxHeight/2 + hGapMul*gap/2)
                    .L(eMidDist, bxHeight/2 + 3*gap)
                    .A(2*gap, 3*gap, 0, 0, 0, eMidDist, bxHeight/2 - 3*gap)
                    .L(eMidDist, bxHeight/2 - hGapMul*gap/2)
                    .L(wGapMul*gap, bxHeight/2 - hGapMul*gap/2)
                    .L(wGapMul*gap, hGapMul*gap + gap)
                    .A(gap, gap, 0, 0, 1, wGapMul*gap+gap, hGapMul*gap)
                    .L(bxWidth - wGapMul*gap, hGapMul*gap)
                    .A(wGapMul*gap/2, wGapMul*gap/2, 0, 0, 1, bxWidth - wGapMul*gap/2,hGapMul*gap + wGapMul*gap/2)
                    .L(bxWidth-gap, hGapMul*gap + gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, bxWidth - wGapMul*gap, gap)
                    .L(gap*wGapMul, gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 0, gap, gap*hGapMul)
                    .Z()
                
            ).move(bxWidth*5, 0),
            t = Leo.path(
                Leo.pathBuild
                    .M(gap, hGapMul*gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 1, wGapMul*gap, gap)
                    .L(bxWidth - wGapMul*gap, gap)
                    .A(gap*wGapMul, gap*hGapMul, 0, 0, 1, bxWidth - gap, gap*hGapMul)
                    .L(bxWidth - wGapMul*gap/2,hGapMul*gap + wGapMul*gap/2)
                    .A(wGapMul*gap/2, wGapMul*gap/2, 0, 0, 0, bxWidth - wGapMul*gap, hGapMul*gap)
                    .L(wGapMul*gap*2, hGapMul*gap)
                    .A(gap, gap, 0, 0, 0, wGapMul*gap*2 - gap, hGapMul*gap + gap)
                    .L(wGapMul*gap*2 - gap, bxHeight - hGapMul*gap - gap)
                    .L(wGapMul*gap*2 - gap+ 5*gap, bxHeight - gap)
                    .A(wGapMul*gap*2, gap+hGapMul*gap, 0,0,1, wGapMul*gap, bxHeight - hGapMul*gap - gap)
                    .L(wGapMul*gap, hGapMul*gap)
                    .A(wGapMul*gap/2, wGapMul*gap/2, 0, 0, 0, wGapMul*gap/2, hGapMul*gap + wGapMul*gap/2)
                    .L(gap, hGapMul*gap)
                    .Z()
                    
            ).move(bxWidth*6, 0)
            u2 = u1.clone().move(bxWidth * 2, 0),

            g = Leo.group(
                u1,
                o,
                u2,
                l1, l2,
                e,t
            // ).setAttributes(fillStyle);
            ).setAttributes({...fillStyle, "stroke": '#000', fill: '#00000055'});

        // Leo.append(img);
        Leo.append(
            g,
            
            // bx1.move(0, 0),
            // bx2.move(150, 0),
            // bx3.move(300, 0),
            // bx4.move(450, 0),
            // bx5.move(600, 0),
            // bx6.move(750, 0),
            // bx7.move(900, 0),
        );
        Leo.append(
            
            g
            // bx1.move(0, 0),
            // bx2.move(150, 0),
            // bx3.move(300, 0),
            // bx4.move(450, 0),
            // bx5.move(600, 0),
            // bx6.move(750, 0),
            // bx7.move(900, 0),
        );
        // Leo.append(u1);

        



        Leo.render();
        // Leo.positionInspector('[{r%x}, {r%y}],');
        Leo.downloadAnchor('download', 'uoullet', document.body);

        
    }
    render();
    window.addEventListener('resize', render);

}
