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
                {
                    type:'feDropShadow',
                    attrs:{
                        dx:20,
                        dy:10,
                        stdDeviation:"2.5",
                        "flood-color":"gray",
                        "flood-opacity":"6.5"
                    }
                },
            ])
        }).move(0, 300),

        // based on https://codepen.io/olawanlejoel/pen/jOBBRjd
        Leo.path('M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266').setAttributes({
            fill: '#4691f6',
            filter: Leo.filter([
                {
                    type:'feOffset',
                    attrs:{
                        dx: 0,
                        dy: 0
                    }
                },
                {
                    type:'feGaussianBlur',
                    attrs:{
                        stdDeviation: 1,
                        result: 'offset-blur'
                    }
                },
                {
                    type:'feComposite',
                    attrs:{
                        operator:'out',
                        in:'SourceGraphic',
                        in2:'offset-blur',
                        result:'inverse',
                    }
                },
                {
                    type:'feFlood',
                    attrs:{
                        'flood-color':'black',
                        'flood-opacity': '.95',
                        result:'color'
                    }
                },
                {
                    type:'feComposite',
                    attrs:{
                        operator:'in',
                        in:'color',
                        in2:'inverse',
                        result:'shadow'
                    }
                },
                {
                    type:'feComposite',
                    attrs:{
                        operator:'over',
                        in:'shadow',
                        in2:'SourceGraphic'
                    }
                },
            ])
        }).scale(15,15).move(300, 300),
    )

    Leo.append(main);
    Leo.render();
    document.body.appendChild(Leo.downloadAnchor())
}



