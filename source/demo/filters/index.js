function getShapeWithText(type, text, shapeAttrs, textAttrs) {
    shapeAttrs = shapeAttrs || {}
    textAttrs = textAttrs || {}
    var size = 300,
        Leo = Leonardo(size, size, { ns: '*' }),
        g = Leo.group(),
        shape = {
            circle: function () {
                return Leo.circle(size/2, size/2, 0.9 * size/2 ).setAttributes(shapeAttrs)
            },
            rect: function () {
                return Leo.rect(size*0.1,size*0.25,size*0.8, size/2).setAttributes(shapeAttrs)
            },
        }[type](),
        textt = Leo.text(size / 2.3, size / 1.9, text).setAttributes(textAttrs);

    g.append(shape, textt);
    return g;
}
function getShapeWithCenteredText(type, text, shapeAttrs, textAttrs) {
    shapeAttrs = shapeAttrs || {}
    textAttrs = textAttrs || {}
    var size = 300,
        Leo = Leonardo(size, size, { ns: '*' }),
        g = Leo.group(),
        shape = {
            circle: function () {
                return Leo.circle(size/2, size/2, 0.9 * size/2 ).setAttributes(shapeAttrs)
            },
            rect: function () {
                return Leo.rect(size*0.1,size*0.25,size*0.8, size/2).setAttributes(shapeAttrs)
            },
            square: function () {
                return Leo.rect(size*0.1,size*0.1,size*0.8, size*0.8).setAttributes(shapeAttrs)
            },
        }[type](),
        ctext =  Leo.centeredText(size, size, text, textAttrs);
    
    g.append(shape, ctext);
    return g;
}


window.onload = function () {
    var target = document.getElementById('trg'),
        Leo = Leonardo(900, 900, { ns: '*', target: target }),
        main = Leo.group();
        
    
    main.append(
        getShapeWithText('circle', 'Hello', {fill: 'red'}).setAttributes({
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
        getShapeWithCenteredText('rect', 'Hello', {fill: '#e5e5e5'}, {fill: 'blue', 'font-size': '38'}).setAttributes({
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
        getShapeWithText('circle', 'Hello', {fill: 'green'}).setAttributes({
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
        getShapeWithCenteredText('square', 'Hello world', {}, {fill: 'yellow', 'font-size': '28', 'font-family': 'verdana'}).setAttributes({
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



