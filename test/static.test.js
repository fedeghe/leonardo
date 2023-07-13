/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');
const circle = '<circle cx="10" cy="10" r="5" fill="rgb(174, 222, 113)" fill-opacity="100%"/>'

describe('Static', () => {

    describe ('import', () => {
        it('as string', () => {
            const L = Leo.import(circle);
            expect(L.tag.outerHTML).toBe(circle);
            expect(L.tag.tagName).toBe('circle');
        });
        it('as element', () => {
            const circleEl = document.createElement('circle');
            circleEl.setAttribute('cx', 4)
            circleEl.setAttribute('cy', 5)
            circleEl.setAttribute('r', 6)
            const L = Leo.import(circleEl);
            // expect(L.tag.outerHTML).toBe(circle);
            expect(L.tag.tagName).toBe('CIRCLE');
            expect(L.tag.getAttribute('cx')).toBe('4');
            expect(L.tag.getAttribute('cy')).toBe('5');
            expect(L.tag.getAttribute('r')).toBe('6');
        });

    });

    describe('getqs', () => {
        it('straight', () => {
            delete window.location;
            window.location = { search: '?a=1&b=aa%20a' };
            const qs = Leo.getqs();
            expect(qs.a).toBe('1');
            expect(qs.b).toBe('aa a');
        });
        it('missing & empty el', () => {
            delete window.location;
            window.location = { search: '?a&b=aa%20a&c=' };
            const qs = Leo.getqs();
            expect(qs.a).toBe(null);
            expect(qs.b).toBe('aa a');
            expect(qs.c).toBe('');
        });
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

    describe('randomColor', () => {
        it('full', () => {
            for(var i = 0; i < 1000; i++)
                expect(Leo.randomColor(true)).toMatch(/^[0-9A-Fa-f]{6}$/);
        });
        it('half', () => {
            expect(Leo.randomColor()).toMatch(/^[0-9A-Fa-f]{3}$/);
        });
    });
});