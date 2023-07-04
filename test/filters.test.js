/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Filter', () => {
    const list = [
        {
            tag: 'feGaussianBlur',
            attrs: {
                stdDeviation: 1,
                result: 'offset-blur'
            }
        }, {
            tag: 'feDropShadow',
            attrs: {
                dx:5, dy:5,
                stdDeviation:"2.5",
                "flood-color":"gray",
                "flood-opacity":"6.5"
            }
        }, {
            tag: 'feMorphology',
            attrs: {
                operator: 'dilate',
                radius: 5
            }
        }, {
            tag: 'feDisplacementMap',
            attrs: {
                in2: "turbulence",
                in: "SourceGraphic",
                scale: "50",
                xChannelSelector: "R",
                yChannelSelector: "G"
            }
        }, {
            tag: 'feBlend',
            attrs: {
                in: 'SourceGraphic',
                in2: 'floodFill',
                mode: 'multiply'
            }
        }, {
            tag: 'feColorMatrix',
            attrs: {
                in: 'SourceGraphic',
                type: 'matrix',
                values: '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0' 
            }
        }, {
            tag: 'feConvolveMatrix',
            attrs: {
                kernelMatrix: '3 0 0 0 0 0 0 0 -3'
            }
        }, 
        // feComponentTransfer needs subtags
        {
            tag: 'feSpecularLighting',
            attrs: {
                result: 'specOut',
                specularExponent: '20',
                'lighting-color': '#bbbbbb'
            }
        }, {
            tag: 'feDiffuseLighting',
            attrs: {
                in: 'SourceGraphic',
                result: 'light',
                'lighting-color': 'white'
            }
        }, {
            tag: 'feFlood',
            attrs: {
                x: '50', y: '50',
                width: '100',
                height: '100',
                'flood-color': 'green',
                'flood-opacity': '0.5' ,
            }
        }, {
            tag: 'feTurbulence',
            attrs: {
                type: "turbulence",
                baseFrequency: "0.05",
                numOctaves: "2",
                result: "turbulence",
            }
        }, {
            tag: 'feImage',
            attrs: {
                'xlink:href': 'mdn_logo_only_color.png',
            }
        }, {
            tag: 'feTile',
            attrs: {
                in:'SourceGraphic',
                x:'50', y:'50',
                width:'100', height:'100', 
            }
        }, {
            tag: 'feOffset',
            attrs: {
                in: 'SourceGraphic',
                dx: '60', dy: '60' 
            }
        }, {
            tag: 'feComposite',
            attrs: {
                in2: 'SourceGraphic',
                operator: 'arithmetic',
                k1: '0.1', k2: '0.2',
                k3: '0.3', k4: '0.4"',
            }
        }
        // feMerge needs subtags
    ];
    list.forEach(({tag, attrs}) => {
        it(`tag - ${tag}`, () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                t = L.circle(50, 50, 10).setAttributes({
                    filter: L.filter([
                        {
                            type: tag,
                            attrs
                        },
                    ])
                });
            L.append(t);
            const defs = L.defs
            const filters = defs.childs[0]
            const filter = filters.childs[0]
            expect(filter.tag.tagName).toBe(tag);
            Object.entries(attrs).forEach(([key, value]) => {
                expect(filter.tag.getAttribute(key)).toBe(`${value}`);
            })
            
        });
    });
});