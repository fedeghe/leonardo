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
            s += `${key} ${value},${value} `;
            expect(p.path).toBe(s);
        });
        p.s(12,12)
        expect(p.path).toBe(`${s}  12,12 `);
    });
});