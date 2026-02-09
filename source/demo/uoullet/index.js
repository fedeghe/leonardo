window.onload = function () {

    function GimmeU(L, gap, bxWidth, bxHeight, wGapMul, hGapMul) {
        return L.path(
            L.pathBuild
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
        )
    }


    function getTheme(label) {
        var themes = {
                black: {
                    // background: '#000000',
                    stroke: 'white',
                    fill: '#000000'
                },
                white: {
                    // background: '#ffffff',
                    stroke: '#000000',
                    fill: '#ffffff'
                },
                blue: {
                    // background: '#ffffff',
                    stroke: '#000000',
                    fill: 'red',
                    // fill: 'gold',
                    
                }
            }
        return {
            fillStyle: {
                "stroke-width": 5,
                "stroke-opacity": 1,
                "fill-opacity": 10,
                "stroke-linejoin": "round",
                "stroke": themes[label].stroke,
                fill: themes[label].fill,
                // "stroke-linejoin": "miter",
            },
            background: 'background' in themes[label] ? themes[label].background : '#ffffff00'
        }
    }

    var gap = 5,
        hGapMul = 3.5,
        wGapMul = 9.5,
        bxWidth = 170,
        bxHeight = 90;

    function render(target, themeLabel) {
        var theme = getTheme(themeLabel),
            
            letters = 7
            height = bxHeight,
            width = bxWidth  * letters,
            prop = width / height,
            Leo = Leonardo(width, height, { ns: '*', target: target }).setStyles({
                backgroundColor: theme.background
            }),
            w = Leonardo.getScaler(width),
            h = Leonardo.getScaler(height),
            fillStyle = theme.fillStyle,
            

            u1 = GimmeU(Leo, gap, bxWidth, bxHeight, wGapMul, hGapMul),
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
                    .Z()
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
            ).setAttributes(fillStyle);

        Leo.append(g).render();

        target.appendChild(Leo.downloadAnchor('download '+ themeLabel, 'uoullet'+themeLabel));
        return Leo.tag;
    }
    
    render(this.document.getElementById('trg1'), 'black');

    render(this.document.getElementById('trg2'), 'white');


    function renderU(){
        var target = document.getElementById('trgU'),
            theme = getTheme('blue'),
            LeoU = Leonardo(900, 500, { ns: '*', target }).setStyles({
                backgroundColor: '#00000055'
            }),
            txt = LeoU.text(0, 0, 'uoullet.com').setAttributes({
                    'font-size': 50,
                    'fill': theme.fillStyle.stroke,
                    'font-family': 'Verdana, sans-serif',
                    'font-weight': 'bold',
                })
                .scale(0.8, 1.6)
                .rotate(-90,600,-220),
            U = GimmeU(LeoU , gap, bxWidth, bxHeight, wGapMul, hGapMul).setAttributes({
                ...theme.fillStyle,
                // "stroke-linejoin": "miter",
            });


        // tp get the b64 encoded qr this is asynch (would be great to find a sync solution)
        // this makes it downloadable (or must be a url, not visible offline!!!)
        Leo.img2base64png('/media/qr.png', function (b64){
            var I =  LeoU.image(300, 70,300, 300, b64);
            LeoU.append(U.scale(5).move(25,25),I, txt).render();
            target.appendChild(LeoU.downloadAnchor('download print', 'uoullet print'));
        })
        
        
    }
    renderU();

    //wallet
    (function(){
        var w = 650,
            h = 650,
            trg = document.getElementById('trg4'),
            Leo = Leonardo(w, h, { ns: '*', target: trg }),
            g = Leo.group(),
            fac = 1,
            img = Leo.image(
                0, 0, w, h,'uoullet.svg'
            ).scale(fac);
        g.append(img);
        

        Leo.append(g);
        Leo.render();
        // Leo.positionInspector('[{r%x}, {r%y}],');
    })()

    /*
    
    */



    // whould need target and label
    // window.addEventListener('resize', render);


    

}
