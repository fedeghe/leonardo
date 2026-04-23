/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('PathBuild', () => {
    it('should create a path attribute as expected ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'}),
            p = L.pathBuild;
        let s = '';
            
        expect(p.path).toBe('');
        Object.entries({
            M:0, m:1,
            Z: 2,
            L:3, l:4,
            H:5, h: 6,
            V:7, v: 8,
            C: 9, c:10,
            Q: 11, q:12,
            S: 13, s:14,
        }).forEach(([key, value]) => {  
            p[key](value, value);
            s += `${key}${value},${value}`;
            expect(p.path).toBe(s);
        });
        p.s(12,12)
        expect(p.path).toBe(`${s} 12,12`);
    });

});

describe('PathBuild maybe method', () => {
    
    beforeEach(() => { 
        Leo.pathBuild.reset();
    });
    

    it('should add path command when condition is true', () => {
        const p1 = Leo.pathBuild;
        p1.M(0, 0).maybe(true, 'A', [36, 60, 0, 0, 1, 150.71, 170.29]);
        
        expect(p1.path).toContain('M0,0');
        expect(p1.path).toContain('A36,60,0,0,1,150.71,170.29');
    });

    it('should skip path command when condition is false', () => {
        const p2 = Leo.pathBuild;
        p2.M(10, 10).maybe(false, 'A', [36, 60, 0, 0, 1, 150.71, 170.29]);
        
        expect(p2.path).toContain('M10,10');
        expect(p2.path).not.toContain('A36,60,0,0,1,150.71,170.29');
    });

    it('should skip command when same as previous', () => {
        const p3 = Leo.pathBuild;
        p3.M(10, 10)
            .L(36, 60)
            .maybe(true, 'L', [86, 30]);
        
        expect(p3.path).toBe('M10,10L36,60 86,30');
        
    });
});