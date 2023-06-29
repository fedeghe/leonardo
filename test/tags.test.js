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