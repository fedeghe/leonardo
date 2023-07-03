/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');
const circle = '<circle cx="10" cy="10" r="5" fill="rgb(174, 222, 113)" fill-opacity="100%"/>'

describe('Gradients', () => {

    it('linearGradient', () => {
        const L = Leo.import(circle),
            grad = L.linearGradient([
                {perc: 0, color: "#000"},
                {perc: 100, color: "#222"},
            ], '0%', '0%', '100%', '100%');
        expect(grad).toBe('url(#leo_id_1)');
        expect(L.defs.childs[0].tag.tagName).toBe('linearGradient');
    });

    it('radialGradient', () => {
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
        expect(grad).toBe('url(#leo_id_2)');
        expect(L.defs.childs[0].tag.tagName).toBe('radialGradient');
    });

});