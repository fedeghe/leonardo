/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');
const circle = '<circle cx="10" cy="10" r="5" fill="rgb(174, 222, 113)" fill-opacity="100%"/>'

describe('Static', () => {

    it('import', () => {
        const L = Leo.import(circle);
        expect(L.tag.outerHTML).toBe(circle);
        expect(L.tag.tagName).toBe('circle');
    });

    it('getqs', () => {
        delete window.location;
        window.location = { search: '?a=1&b=aa%20a' };
        const qs = Leo.getqs();
        expect(qs.a).toBe('1');
        expect(qs.b).toBe('aa a');
    });

    it('toString', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            c = L.circle(1,1,1);
        
        L.append(c);
        const str = Leo.toString(L.tag);
        expect(str).toBe('<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 200 100"><circle cx="1" cy="1" r="1"></circle></svg>');
    });

    it('toDocument', () => {
        const str = Leo.toDocument('<svg height="300" id="hero" viewbox="0 0 900 300" width="900" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" fill="rgb(174, 222, 113)" fill-opacity="100%" r="5"/></svg>');
        expect(str.outerHTML).toBe('<svg height="300" id="hero" viewbox="0 0 900 300" width="900" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" fill="rgb(174, 222, 113)" fill-opacity="100%" r="5"/></svg>');
    });

});