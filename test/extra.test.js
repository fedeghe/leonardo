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
            textPath = L.textPath(
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

    
    it('arcSection ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            arcSection1 = L.arcSection(50, 50, 10, 20, 0, 200);
            arcSection2 = L.arcSection(50, 50, 10, 20, 60, 120, 0);
            arcSection3 = L.arcSection(50, 50, 10, 20, 60, 120, 0, 1);
            arcSection4 = L.arcSection(50, 50, 10, 20, 60, 120, 1, 1);
        
        expect(arcSection1.tag.tagName).toBe('path');
        expect(arcSection2.tag.tagName).toBe('path');
        expect(arcSection3.tag.tagName).toBe('path');
        expect(arcSection4.tag.tagName).toBe('path');
        expect(arcSection1.tag.getAttribute('d')).toBe("M50.00,40.00L50.00,30.00A20,20,0,1,1,43.16,68.79L46.58,59.40A10,10,0,1,0,50.00,40.00Z");
        expect(arcSection2.tag.getAttribute('d')).toBe('M58.66,45.00L67.32,40.00A20,20,0,0,0,67.32,60.00L58.66,55.00A10,10,0,0,0,58.66,45.00Z');
        expect(arcSection3.tag.getAttribute('d')).toBe('M58.66,45.00L67.32,40.00A20,20,0,0,0,67.32,60.00L58.66,55.00A10,10,0,0,1,58.66,45.00Z');
        expect(arcSection4.tag.getAttribute('d')).toBe('M58.66,45.00L67.32,40.00A20,20,0,0,1,67.32,60.00L58.66,55.00A10,10,0,0,1,58.66,45.00Z');
    });

    describe('textBox ', () => {
        it('trasparent bg', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*'}),
                textBox = L.textBox('Hello World', 150, 50, {
                    "font-size" : 16,
                    "fill" : '#000000',
                    "stroke" : '#ff0000',
                    "text-anchor" : 'middle'
                });
            
            expect(textBox.tag.tagName).toBe('svg');
            expect(textBox.childs[0].tag.tagName).toBe('rect');
            expect(textBox.childs[0].tag.getAttribute('fill')).toBe('transparent');
            expect(textBox.childs[1].tag.tagName).toBe('text');
            expect(textBox.childs[1].tag.getAttribute('x')).toBe('50%');
            expect(textBox.childs[1].tag.getAttribute('y')).toBe('50%');
            expect(textBox.childs[1].tag.textContent).toBe('Hello World');
        });
        it('colored bg', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*'}),
                textBox = L.textBox('Hello World', 150, 50, {
                    "font-size" : 16,
                    "fill" : '#000000',
                    "stroke" : '#ff0000',
                    "text-anchor" : 'middle'
                }, {fill: '#00ff00'});
            
            expect(textBox.childs[0].tag.getAttribute('fill')).toBe('#00ff00');
        });

        it('updateText', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*'}),
                textBox = L.textBox('Hello World', 150, 50, {
                    "font-size" : 16,
                    "fill" : '#000000'
                });
            
            expect(textBox.childs[1].tag.textContent).toBe('Hello World');
            textBox.updateText('Updated Text');
            expect(textBox.childs[1].tag.textContent).toBe('Updated Text');
            
            textBox.updateText('Another Update');
            expect(textBox.childs[1].tag.textContent).toBe('Another Update');
        });

        it('rotation', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*'}),
                textBox = L.textBox('Rotated Text', 150, 50, {
                    "font-size" : 16,
                    "fill" : '#000000'
                }, undefined, 45);
            
            expect(textBox.childs[1].tag.tagName).toBe('text');
            expect(textBox.childs[1].tag.getAttribute('transform')).toBeTruthy();
            expect(textBox.childs[1].tag.getAttribute('transform')).toContain('rotate(45');
        })

        
    });
});