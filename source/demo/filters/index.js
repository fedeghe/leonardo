function getShapeWithText(type, text) {
    var size = 300,
        Leo = Leonardo(size, size, { ns: '*' }),
        g = Leo.group(),
        shape = {
            circle: function () {
                return Leo.circle(size/2, size/2, 0.9 * size/2 ).setAttributes({fill: 'red'})
            },
            rect: function () {
                return Leo.rect(size*0.1,size*0.25,size*0.8, size/2).setAttributes({fill: 'red'})
            },
        }[type](),
        textt = Leo.text(size / 2.3, size / 1.9, text);

    g.append(shape, textt);
    return g;
}
function getShapeWithCenteredText(type, text) {
    var size = 300,
        Leo = Leonardo(size, size, { ns: '*' }),
        g = Leo.group(),
        shape = {
            circle: function () {
                return Leo.circle(size/2, size/2, 0.9 * size/2 ).setAttributes({fill: 'red'})
            },
            rect: function () {
                return Leo.rect(size*0.1,size*0.25,size*0.8, size/2).setAttributes({fill: 'red'})
            },
            square: function () {
                return Leo.rect(size*0.1,size*0.1,size*0.8, size*0.8).setAttributes({fill: 'red'})
            },
        }[type](),
        ctext =  Leo.centeredText(size, size, text, {fill: 'white', 'font-size': 38});
    
    g.append(shape, ctext);
    return g;
}


window.onload = function () {
    var target = document.getElementById('trg'),
        Leo = Leonardo(900, 900, { ns: '*', target: target }),
        main = Leo.group();
        
    
    main.append(
        getShapeWithText('circle', 'Hello').setAttributes({
            filter: Leo.filter([
                {type:'feDropShadow',
                    attrs:{
                        dx:5,
                        dy:5,
                        stdDeviation:"2.5",
                        "flood-color":"gray",
                        "flood-opacity":"6.5"
                    }
                },
            ])
        }),
        getShapeWithCenteredText('rect', 'Hello').setAttributes({
            filter: Leo.filter([
                {type:'feDropShadow',
                    attrs:{
                        dx:5,
                        dy:5,
                        stdDeviation:"2.5",
                        "flood-color":"gray",
                        "flood-opacity":"6.5"
                    }
                },
            ])
        }).move(300, 0),
        getShapeWithText('circle', 'Hello').setAttributes({
            filter: Leo.filter([
                {
                    type:'feTurbulence',
                    attrs:{
                        type:"turbulence",
                        baseFrequency:"0.2",
                        numOctaves:"20",
                        result:"turbulence"
                    }
                },
                {
                    type:'feDisplacementMap',
                    attrs:{
                        in2:"turbulence",
                        in:"SourceGraphic",
                        scale:"30",
                        xChannelSelector:"R",
                        yChannelSelector:"G"
                    }
                },
            ])
        }).move(600, 0),
        getShapeWithCenteredText('square', 'Hello world').setAttributes({
            filter: Leo.filter([
                {type:'feDropShadow',
                    attrs:{
                        dx:5,
                        dy:5,
                        stdDeviation:"2.5",
                        "flood-color":"gray",
                        "flood-opacity":"6.5"
                    }
                },
            ])
        }).move(0, 300),
    )

    Leo.append(main);
    Leo.render();
    document.body.appendChild(Leo.downloadAnchor())
}



