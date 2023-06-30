/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Tags', () => {
    test('<desc> ', () => {
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

    test('<title> ', () => {
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

    test('<text> ', () => {
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

    test('<g> ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            txt = 'a text',
            tag = L.group();
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('g');
    });

    test('<image> ', () => {
        const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.image(0, 0, 30, 30, './source/demo/god/god.jpg');
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('image');
    });

    test('<polygon> ', () => {
        const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.polygon(0,50, 50,0, 100,50, 125,25, 175,25, 75,125);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('polygon');
    });

    test('<polyline> ', () => {
        const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            tag = L.polyline(0,50, 50,0, 100,50, 125,25, 175,25, 75,125);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe('polyline');
    });



    test('<script> ', () => {
        const width = 200, height = 100,
            L = Leo(width, height, {ns : '*'}),
            cnt = 'var s = "hello";'
            tag = L.script(cnt);
        L.append(tag);
        const spot = L.tag.children[0];
        expect(spot.tagName).toBe('script');
        expect(spot.innerHTML.includes(cnt)).toBeTruthy();
    });
    

    test('<path> ', () => {
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

    test('Generic element ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            elementName = 'switch',
            tag = L.Element(elementName);
        L.append(tag);
        const spot = L.tag.children[0]
        expect(spot.tagName).toBe(elementName);
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
            test(`<${o.tag}> tag attributes`, () => {
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

        })
    
    });

});