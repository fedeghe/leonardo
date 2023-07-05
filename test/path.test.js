/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Path ', () => {
    it('should slice ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            p = L.pathBuild.M(0,0).L(width, height).M(width, 0).L(0, height),
            slice = L.slice(width/ 2, height / 2, 10, 0, 180);
        
        expect(slice.tag.getAttribute('d')).toBe('M 0,0 L 200,100 M 200,0 L 0,100 M 100,50 L 110,50 A 10,10,0,0,0,90,50 L 100,50 ');
        
    });
    it('should slice - inverted ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            p = L.pathBuild.M(0,0).L(width, height).M(width, 0).L(0, height),
            slice = L.slice(width/ 2, height / 2, 10, 180, 0);
        
        expect(slice.tag.getAttribute('d')).toBe('M 0,0 L 200,100 M 200,0 L 0,100 M 100,50 L 110,50 A 10,10,0,0,0,90,50 L 100,50 ');
        
    });
});