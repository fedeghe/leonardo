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
        
        expect(slice.tag.getAttribute('d')).toBe('M0,0L200,100M200,0L0,100M100,50L110,50A10,10,0,0,0,90,50L100,50');
        
    });
    it('should slice - inverted ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            p = L.pathBuild.M(0,0).L(width, height).M(width, 0).L(0, height),
            slice = L.slice(width/ 2, height / 2, 10, 180, 0);
        
        expect(slice.tag.getAttribute('d')).toBe('M0,0L200,100M200,0L0,100M100,50L110,50A10,10,0,0,0,90,50L100,50');
        
    });
    it('slicePath ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            p = L.pathBuild.M(0,0).L(width, height).M(width, 0).L(0, height),
            slicePath = L.slicePath(width/ 2, height / 2, 10, 210, 0),
            slice = L.path(slicePath);
        
        expect(slice.tag.getAttribute('d')).toBe('M0,0L200,100M200,0L0,100M100,50L110,50A10,10,0,1,0,91.33974596215562,55L100,50');
        
    });
});