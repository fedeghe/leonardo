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
            repeatCount: '1',
            values: 'x',
            type: 'r'
        }));
        
        expect(c1.childs.length).toBe(1)
        expect(c1.childs[0].tag.tagName).toBe('animate')
    });
    describe('cartesian', () => {
        it('base', done => {
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
                expect(c1.getAttributes('transform').transform).toBe('translate(0 0)')
                done();
            }, 100);
        });
        it('default time', done => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5);
            L.append(c1);
            const stop = L.animate.cartesian(
                c1,
                function (x, t) { return  x * Math.sin(t); },
                function (y, t) { return  y * Math.cos(t); }
            );
            
            expect(L.childs.length).toBe(1)
            setTimeout(() => {
                stop();
                expect(c1.getAttributes('transform').transform).toBe('translate(0 0)')
                done();
            }, 100);
        });
        it('trace option', done => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5);
            L.append(c1);
            const initialLength = L.childs.length;
            const stop = L.animate.cartesian(
                c1,
                function (x, t) { return  x * Math.sin(t); },
                function (y, t) { return  y * Math.cos(t); },
                100,
                {trace: true}
            );
            
            expect(stop).toBeDefined();
            setTimeout(() => {
                expect(L.childs.length).toBeGreaterThan(initialLength);
                stop();
                done();
            }, 50);
        });
    });



    describe('polar', () => {
        it('base', done => {
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
                expect(c1.getAttributes('transform').transform).toBe('translate(0 0)')
                done();
            }, 100);
        });
        it('default time', done => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5);
            L.append(c1);
            const stop = L.animate.polar(
                c1,
                function (r, t) { return r * Math.sin(t); },
                function (pi, t) { return t; }
            );
            
            expect(L.childs.length).toBe(1)
            setTimeout(() => {
                stop();
                expect(c1.getAttributes('transform').transform).toBe('translate(0 0)')
                done();
            }, 100);
        });
        it('trace option', done => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5);
            L.append(c1);
            const initialLength = L.childs.length;
            const stop = L.animate.polar(
                c1,
                function (r, t) { return r * Math.sin(t); },
                function (pi, t) { return t; },
                100,
                {trace: true}
            );
            
            expect(stop).toBeDefined();
            setTimeout(() => {
                expect(L.childs.length).toBeGreaterThan(initialLength);
                stop();
                done();
            }, 50);
        });
    });

    describe('motionPath', () => {
        it('basic usage', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5),
                pathStr = 'M20,50 C20,-50 180,150 180,50';
            L.append(c1);
            const result = L.animate.motionPath(c1, pathStr);
            
            expect(result).toBe(c1);
            expect(c1.childs.length).toBe(1);
            expect(c1.childs[0].tag.tagName).toBe('animateMotion');
        });
        it('with attributes', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5),
                pathStr = 'M20,50 C20,-50 180,150 180,50',
                ats = {dur: '2s', repeatCount: '3'};
            L.append(c1);
            const result = L.animate.motionPath(c1, pathStr, ats);
            
            expect(result).toBe(c1);
            expect(c1.childs[0].tag.tagName).toBe('animateMotion');
            expect(c1.childs[0].tag.getAttribute('dur')).toBe('2s');
            expect(c1.childs[0].tag.getAttribute('repeatCount')).toBe('3');
        });
    });
});