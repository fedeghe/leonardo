/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');
const circle = '<circle cx="10" cy="10" r="5" fill="rgb(174, 222, 113)" fill-opacity="100%"/>'

describe('Gradients', () => {

    describe('linearGradient', () => {
        it('base', () => {
            const L = Leo.import(circle),
                grad = L.linearGradient([
                    {perc: 0, color: "#000"},
                    {perc: 100, color: "#222", style: {fontSize:3}},
                ], '0%', '0%', '100%', '100%');
                expect(grad).toMatch(/url\(#leo_id_\d+\)/);
            expect(L.defs.childs[0].tag.tagName).toBe('linearGradient');
            expect(L.defs.childs[0].getAttributes('x1').x1).toBe('0%');
            expect(L.defs.childs[0].getAttributes('y1').y1).toBe('0%');
            expect(L.defs.childs[0].getAttributes('x2').x2).toBe('100%');
            expect(L.defs.childs[0].getAttributes('y2').y2).toBe('100%');
        });
        it('deafult values', () => {
            const L = Leo.import(circle),
                grad = L.linearGradient([
                    {perc: 0, color: "#000"},
                    {perc: 100, color: "#222"},
                ]);
            expect(grad).toMatch(/url\(#leo_id_\d+\)/);
            expect(L.defs.childs[0].tag.tagName).toBe('linearGradient');
            expect(L.defs.childs[0].getAttributes('x1').x1).toBe('0%');
            expect(L.defs.childs[0].getAttributes('y1').y1).toBe('0%');
            expect(L.defs.childs[0].getAttributes('x2').x2).toBe('100%');
            expect(L.defs.childs[0].getAttributes('y2').y2).toBe('0%');
        });
    });

    describe('radialGradient', () => {
        it('base', () => {
            const L = Leo.import(circle),
                grad = L.radialGradient([{
                    perc: 0,
                    color: "#fff",
                }, {
                    perc: 90,
                    color: "#888",
                }, {
                    perc: 94,
                    color: "#aaa"
                }, {
                    perc: 97,
                    color: "#aaa"
                }, {
                    perc: 100,
                    color: "#fff"
                }]);
            expect(grad).toMatch(/url\(#leo_id_\d+\)/);
            expect(L.defs.childs[0].tag.tagName).toBe('radialGradient');
        });
        it('styled', () => {
            const L = Leo.import(circle),
                grad = L.radialGradient([{
                    perc: 0,
                    color: "#fff",
                    style: {fontSize: '30px'}
                }, {
                    perc: 90,
                    color: "#888",
                }, {
                    perc: 94,
                    color: "#aaa"
                }, {
                    perc: 97,
                    color: "#aaa"
                }, {
                    perc: 100,
                    color: "#fff"
                }]);
            expect(grad).toMatch(/url\(#leo_id_\d+\)/);
            expect(L.defs.childs[0].tag.tagName).toBe('radialGradient');
        });
    });

});