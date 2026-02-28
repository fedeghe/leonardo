/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Filter', () => {
    const list = [
        {
            filter: 'feGaussianBlur',
            attrs: {
                stdDeviation: 1,
                result: 'offset-blur'
            }
        }, {
            filter: 'feDropShadow',
            attrs: {
                dx:5, dy:5,
                stdDeviation:"2.5",
                "flood-color":"gray",
                "flood-opacity":"6.5"
            }
        }, {
            filter: 'feMorphology',
            attrs: {
                operator: 'dilate',
                radius: 5
            }
        }, {
            filter: 'feDisplacementMap',
            attrs: {
                in2: "turbulence",
                in: "SourceGraphic",
                scale: "50",
                xChannelSelector: "R",
                yChannelSelector: "G"
            }
        }, {
            filter: 'feBlend',
            attrs: {
                in: 'SourceGraphic',
                in2: 'floodFill',
                mode: 'multiply'
            }
        }, {
            filter: 'feColorMatrix',
            attrs: {
                in: 'SourceGraphic',
                type: 'matrix',
                values: '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0' 
            }
        }, {
            filter: 'feConvolveMatrix',
            attrs: {
                kernelMatrix: '3 0 0 0 0 0 0 0 -3'
            }
        }, 
        // feComponentTransfer needs subtags
        {
            filter: 'feSpecularLighting',
            attrs: {
                result: 'specOut',
                specularExponent: '20',
                'lighting-color': '#bbbbbb'
            }
        }, {
            filter: 'feDiffuseLighting',
            attrs: {
                in: 'SourceGraphic',
                result: 'light',
                'lighting-color': 'white'
            }
        }, {
            filter: 'feFlood',
            attrs: {
                x: '50', y: '50',
                width: '100',
                height: '100',
                'flood-color': 'green',
                'flood-opacity': '0.5' ,
            }
        }, {
            filter: 'feTurbulence',
            attrs: {
                type: "turbulence",
                baseFrequency: "0.05",
                numOctaves: "2",
                result: "turbulence",
            }
        }, {
            filter: 'feImage',
            attrs: {
                'xlink:href': 'mdn_logo_only_color.png',
            }
        }, {
            filter: 'feTile',
            attrs: {
                in:'SourceGraphic',
                x:'50', y:'50',
                width:'100', height:'100', 
            }
        }, {
            filter: 'feOffset',
            attrs: {
                in: 'SourceGraphic',
                dx: '60', dy: '60' 
            }
        }, {
            filter: 'feComposite',
            attrs: {
                in2: 'SourceGraphic',
                operator: 'arithmetic',
                k1: '0.1', k2: '0.2',
                k3: '0.3', k4: '0.4"',
            }
        }
        // feMerge needs subtags
    ];
    list.forEach(({filter, attrs}) => {
        it(`tag - ${filter}`, () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                t = L.circle(50, 50, 10).setAttributes({
                    filter: L.filter([
                        {
                            type: filter,
                            attrs
                        },
                    ])
                });
            L.append(t);
            const defs = L.defs
            const filters = defs.childs[0]
            const f = filters.childs[0]
            expect(f.tag.tagName).toBe(filter);
            Object.entries(attrs).forEach(([key, value]) => {
                expect(f.tag.getAttribute(key)).toBe(`${value}`);
            })
            
        });
    });
    it('multiple filters, some not expected', () => {
        const width = 200,
                height = 100,
                L = Leo(width, height),
                t = L.circle(50, 50, 10).setAttributes({
                    filter: L.filter([
                        {
                            type: 'feGaussianBlur',
                            attrs: {
                                stdDeviation: 1,
                                result: 'offset-blur'
                            }
                        },
                        {
                            type: 'feDropShadow',
                            attrs: {
                                dx:5, dy:5,
                                stdDeviation:"2.5",
                                "flood-color":"gray",
                                "flood-opacity":"6.5"
                            }
                        },
                        {
                            type: 'nopeXXXX',
                            attrs: {
                                dx:5, dy:5,
                                stdDeviation:"2.5",
                                "flood-color":"gray",
                                "flood-opacity":"6.5"
                            }
                        }
                    ])
                });
            L.append(t);
            const defs = L.defs
            const filters = defs.childs[0]
            const f1 = filters.childs[0]
            const f2 = filters.childs[1]
            expect(f1.tag.tagName).toBe('feGaussianBlur');
            expect(f2.tag.tagName).toBe('feDropShadow');
            
    })
});