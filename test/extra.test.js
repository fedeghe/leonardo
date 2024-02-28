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
        centeredText.updateText('hello world');
        expect(centeredText.childs[1].childs[0].tag.textContent).toBe('hello world');
    });

    it('arcCentered ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            arcCentered = L.arcCentered(50, 50, 10, -30, 30);
        
        expect(arcCentered.tag.tagName).toBe('path');
        expect(arcCentered.tag.getAttribute('d')).toBe('M 50 50 L 55 41.33974596215562 A 10 10 0 0 0 45 41.33974596215561 Z');
    });
    it('arcSection ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            arcSection1 = L.arcSection(50, 50, 10, 20, Math.PI/3, 2*Math.PI/3);
            arcSection2 = L.arcSection(50, 50, 10, 20, Math.PI/3, 2*Math.PI/3, 0);
            arcSection3 = L.arcSection(50, 50, 10, 20, Math.PI/3, 2*Math.PI/3, 0, 1);
            arcSection4 = L.arcSection(50, 50, 10, 20, Math.PI/3, 2*Math.PI/3, 1, 1);
        
        expect(arcSection1.tag.tagName).toBe('path');
        expect(arcSection2.tag.tagName).toBe('path');
        expect(arcSection3.tag.tagName).toBe('path');
        expect(arcSection4.tag.tagName).toBe('path');
        expect(arcSection1.tag.getAttribute('d')).toBe('M50.18276027628548,40.0016702054087L50.365520552570956,30.003340410817405A20,20,0,0,1,50.730919006261125,30.01336052743518L50.365459503130566,40.00668026371759A10,10,0,0,0,50.18276027628548,40.0016702054087Z');
        expect(arcSection2.tag.getAttribute('d')).toBe('M50.18276027628548,40.0016702054087L50.365520552570956,30.003340410817405A20,20,0,0,0,50.730919006261125,30.01336052743518L50.365459503130566,40.00668026371759A10,10,0,0,0,50.18276027628548,40.0016702054087Z');
        expect(arcSection3.tag.getAttribute('d')).toBe('M50.18276027628548,40.0016702054087L50.365520552570956,30.003340410817405A20,20,0,0,0,50.730919006261125,30.01336052743518L50.365459503130566,40.00668026371759A10,10,0,0,1,50.18276027628548,40.0016702054087Z');
        expect(arcSection4.tag.getAttribute('d')).toBe('M50.18276027628548,40.0016702054087L50.365520552570956,30.003340410817405A20,20,0,0,1,50.730919006261125,30.01336052743518L50.365459503130566,40.00668026371759A10,10,0,0,1,50.18276027628548,40.0016702054087Z');
    });
});