/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Tags', () => {
    it('<desc> ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            desc = 'this is just a description',
            tag = L.desc(desc);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('desc');
        expect(spot.textContent).toBe(desc);
    });
    it('<desc> - static', () => {
        const text = 'this is just a description',
            desc = Leo.desc(text);
        expect(desc.tag.tagName).toBe('desc');
        expect(desc.tag.textContent).toBe(text);
    });
    

    it('<title> ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            title = 'a title',
            tag = L.title(title);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('title');
        expect(spot.textContent).toBe(title);
    });
    it('<title> - static', () => {
        const text = 'a title',
            title = Leo.title(text);
        expect(title.tag.tagName).toBe('title');
        expect(title.tag.textContent).toBe(text);
    });

    it('<text> ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            txt = 'a text',
            tag = L.text(10, 20, txt);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('text');
        expect(spot.textContent).toBe(txt);
    });

    it('<text> - static', () => {
        const cnt = 'a text',
            text = Leo.text(10, 20, cnt),
            text1 = Leo.text();
        expect(text.tag.tagName).toBe('text');
        expect(text.tag.textContent).toBe(cnt);
        expect(text1.tag.tagName).toBe('text');
        expect(text1.tag.textContent).toBe('');
    });

    it('<text> updateText', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            t = L.text(0,0,'hello');

        L.append(t);
        
        expect(t.tag.textContent).toBe('hello');
        t.updateText('world');
        expect(t.tag.textContent).toBe('world');
    })


    it('<g> ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.group();
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('g');
    })
    it('<g> - static', () => {
        const grp = Leo.group();
        expect(grp.tag.tagName).toBe('g');
    })

    it('<g> append in constructor', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            txt = L.line(0, 0, 5, 5),
            rootg = L.group(txt);
        L.append(rootg);
        const line = rootg.tag.children[0]
        expect(line.tagName).toBe('line');
    });

    it('<image> ', () => {
        const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.image(0, 0, 30, 30, './source/demo/god/god.jpg');
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('image');
    });
    it('<image> - static', () => {
        const img = Leo.image(0, 0, 30, 30, './source/demo/god/god.jpg');
        expect(img.tag.tagName).toBe('image');
    });

    describe('<polygon>', () => {
        it('basic usage ', () => {
            const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.polygon(0,50, 50,0, 100,50, 125,25, 175,25, 75,125);
            L.append(tag);
            const spot = L.tag.children[0]
            expect(spot.tagName).toBe('polygon');
        });
        it('basic usage - static', () => {
            const poly = Leo.polygon(0,50, 50,0, 100,50, 125,25, 175,25, 75,125);
            expect(poly.tag.tagName).toBe('polygon');
        });
        it('error: odd number of points', () => {
            const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'});
            expect(() => {
                L.polygon(0,50, 50,0, 100);
            }).toThrow(Leo.ERRORS.even_numbers_expected);
        });
    })

    it('<polyline> ', () => {
        const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.polyline(0,50, 50,0, 100,50, 125,25, 175,25, 75,125);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('polyline');
    });
    it('<polyline> - static', () => {
        const polyline = Leo.polyline(0,50, 50,0, 100,50, 125,25, 175,25, 75,125);
        expect(polyline.tag.tagName).toBe('polyline');
    });



    describe('<script> ', () => {
        it('<script> with content', () => {
            const width = 200, height = 100,
                L = Leo(width, height, {ns : '*'}),
                cnt = 'var s = "hello";'
                tag = L.script(cnt);
            L.append(tag);
            const spot = L.tag.children[0];
            expect(spot.tagName).toBe('script');
            expect(spot.innerHTML.includes(cnt)).toBeTruthy();
        });
        it('<script> with content - static', () => {
            const cnt = 'var s = "hello";'
                script = Leo.script(cnt);
        
            expect(script.tag.tagName).toBe('script');
            expect(script.tag.innerHTML.includes(cnt)).toBeTruthy();
        });
        
        it('<script> with src', () => {
            const width = 200, height = 100,
                L = Leo(width, height, {ns : '*'}),
                src = 'http://www.example.com/index.js'
                tag = L.script().setAttributes({src});
            
            L.append(tag);
            const spot = L.tag.children[0];
            expect(spot.tagName).toBe('script');
            expect(spot.getAttribute('src')).toBe(src);
        });
        it('<script> with src - static', () => {
            const src = 'http://www.example.com/index.js'
                script = Leo.script().setAttributes({src});
            expect(script.tag.tagName).toBe('script');
            expect(script.tag.getAttribute('src')).toBe(src);
        });
    });
    

    it('<path> ', () => {
        const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.path(
                'M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266',
                {
                    fill: '#4691f6',
                }
            );
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('path');
    });
    it('<path> - static', () => {
        const path = Leo.path(
            'M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266',
            {
                fill: '#4691f6',
            }
        );
        expect(path.tag.tagName).toBe('path');
    });

    it('Generic element ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            elementName = 'switch',
            tag = L.Element(elementName);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe(elementName);
    });
    it('Generic element - static', () => {
        const elementName = 'switch',
            t = Leo.Element(elementName);
        expect(t.tag.tagName).toBe(elementName);
    });

    describe('dumb tags - attributes ', () => {
        [{
            tag: 'circle',
            attrs: {cx: 10, cy: 20, r: 5}
        }, {
            tag: 'ellipse',
            attrs: {cx: 10, cy: 20, rx: 5, ry: 7}
        }, {
            tag: 'line',
            attrs: {x1: 10, y1: 20, x2: 5, y2: 7}
        }, {
            tag: 'rect',
            attrs: {x: 10, y: 20, width: 5, height: 7}
        }].forEach(o => {
            it(`<${o.tag}> tag attributes`, () => {
                const width = 200,
                    height = 100,
                    L = Leo(width, height, {ns : '*'}),
                    tag = L[o.tag].apply(null, Object.values(o.attrs));
                L.append(tag);
                const spot = L.tag.children[0]
                expect(spot.tagName).toBe(o.tag);
                for (att in o.attrs) {
                    expect(spot.getAttribute(att)).toBe(`${o.attrs[att]}`);
                }
            });

            it(`<${o.tag}> tag attributes - static`, () => {
                const t = Leo[o.tag].apply(null, Object.values(o.attrs));
                
                expect(t.tag.tagName).toBe(o.tag);
                for (att in o.attrs) {
                    expect(t.tag.getAttribute(att)).toBe(`${o.attrs[att]}`);
                }
            });

        })
        it('<rect> squared case', () => {
            const width = 200,
                    height = 100,
                    L = Leo(width, height, {ns : '*'}),
                    tag = L.rect(10, 11, 20);
                L.append(tag);
                const rect = L.tag.children[0]
                expect(rect.tagName).toBe('rect');
                
                expect(rect.getAttribute('x')).toBe('10');
                expect(rect.getAttribute('y')).toBe('11');
                expect(rect.getAttribute('width')).toBe('20');
                expect(rect.getAttribute('height')).toBe('20');
        })
         it('<rect> squared case - static', () => {
            const t = Leo.rect(10, 11, 20);
                expect(t.tag.tagName).toBe('rect');
                expect(t.tag.getAttribute('x')).toBe('10');
                expect(t.tag.getAttribute('y')).toBe('11');
                expect(t.tag.getAttribute('width')).toBe('20');
                expect(t.tag.getAttribute('height')).toBe('20');
        })
    
    });

    it('use and symbol', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            rect = L.rect(10, 10, 20),
            symbol = L.symbol({
                width: 50,
                height: 50,
                viewBox: '0 0 50 50'
            }, rect),
            use = L.use({
                href: `#${symbol.tag.getAttribute('id')}`,
                x: 50,
                y: 50
            });;
        symbol.append(rect);
        L.append(symbol, use);
            
        expect(symbol.tag.tagName).toBe('symbol');
        expect(symbol.childs[0].tag.tagName).toBe('rect');
        expect(use.tag.tagName).toBe('use');
        expect(use.tag.getAttribute('href')).toBe(`#${symbol.tag.getAttribute('id')}`);
    });

});

describe('foreignObject', () => {
    it('creates foreignObject element', () => {
        const L = Leo(400, 300);
        const fo = L.foreignObject(50, 50, 300, 200);
        
        expect(fo.tag.tagName).toBe('foreignObject');
        expect(fo.tag.getAttribute('x')).toBe('50');
        expect(fo.tag.getAttribute('y')).toBe('50');
        expect(fo.tag.getAttribute('width')).toBe('300');
        expect(fo.tag.getAttribute('height')).toBe('200');
    });

    it('foreignObject can append child elements', () => {
        const L = Leo(400, 300);
        const fo = L.foreignObject(50, 50, 300, 200);
        const circle = L.circle(10, 10, 5);
        
        fo.append(circle);
        
        expect(fo.tag.children.length).toBe(1);
        expect(fo.tag.children[0].tagName).toBe('circle');
    });

    it('foreignObject can be appended to SVG', () => {
        const L = Leo(400, 300);
        const fo = L.foreignObject(50, 50, 300, 200);
        
        L.append(fo);
        
        expect(L.tag.children[0].tagName).toBe('foreignObject');
    });
});