/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Animate', () => {
    it('attrs', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            c1 = L.circle(10, 10, 5);
        c1.append(L.animate.attr({
            attributeName: 'r',
            from: '5',
            to: '10',
            dur: '0.1s',
            repeatCount: '1'
        }));
        
        expect(c1.childs.length).toBe(1)
        expect(c1.childs[0].tag.tagName).toBe('animate')
    });
    it('cartesian', done => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            c1 = L.circle(10, 10, 5);
        L.append(c1);
        const stop = L.animate.cartesian(
            c1,
            function (x, t) { return  x * Math.sin(t); },
            function (y, t) { return  y * Math.cos(t); },
            100
        );
        
        expect(L.childs.length).toBe(1)
        setTimeout(() => {
            stop();
            expect(c1.getAttributes('transform').transform).toBe('  translate(0 0) ')
            done()
        }, 100)
    });
    it('polar', done => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            c1 = L.circle(10, 10, 5);
        L.append(c1);
        const stop = L.animate.polar(
            c1,
            function (r, t) { return r * Math.sin(t); },
            function (pi, t) { return t; },
            100
        );
        
        expect(L.childs.length).toBe(1)
        setTimeout(() => {
            stop();
            expect(c1.getAttributes('transform').transform).toBe('  translate(0 0) ')
            done()
        }, 100)
    });
});