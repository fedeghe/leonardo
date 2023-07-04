/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('extra', () => {    
    it('textPath ', () => {
        const width = 200,
            height = 100,
            cx = width / 2,
            cy = height / 2,
            size = 200,
            L = Leo(width, height, {ns : '*'}),
            textPath = L.textPath("smade",
                L.pathBuild
                    .M(cx * 0.925, size * 0.89 * 0.995)
                    .Q(cx, size * 0.89, cx * 1.075, size * 0.89 * 0.995),
                "swiss made"
            );
        
        expect(textPath.tag.tagName).toBe('text');
        expect(textPath.childs[0].tag.tagName).toBe('defs');
        
        expect(textPath.childs[1].tag.tagName).toBe('textPath');
        expect(textPath.childs[1].tag.textContent).toBe('swiss made');
        expect(textPath.childs[0].childs[0].tag.tagName).toBe('path');        
    });

    it('centeredText ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            centeredText = L.centeredText(200, 80, 'hello');
        
        expect(centeredText.tag.tagName).toBe('g');
        expect(centeredText.childs[0].tag.tagName).toBe('path');
        expect(centeredText.childs[1].tag.tagName).toBe('text');
        expect(centeredText.childs[1].childs[0].tag.textContent).toBe('hello');
    });

    it('arcCentered ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            arcCentered = L.arcCentered(50, 50, 10, -30, 30);
        
        expect(arcCentered.tag.tagName).toBe('path');
        expect(arcCentered.tag.getAttribute('d')).toBe('M 50 50 L 55 41.33974596215562 A 10 10 0 0 0 45 41.33974596215561 Z');
    });
});