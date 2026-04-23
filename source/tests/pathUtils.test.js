/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Path Utilities', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('arc()', () => {
        test('should create an arc path string', () => {
            const arc = L.arc(0, 50, 100, 50, 50);
            expect(arc).toMatch(/^M 0,50 A 50,50 0 0,1 100,50$/);
        });

        test('should support largeArc parameter', () => {
            const arc = L.arc(0, 50, 100, 50, 50, 1);
            expect(arc).toMatch(/^M 0,50 A 50,50 0 1,1 100,50$/);
        });

        test('should support sweep parameter', () => {
            const arc = L.arc(0, 50, 100, 50, 50, 0, 0);
            expect(arc).toMatch(/^M 0,50 A 50,50 0 0,0 100,50$/);
        });

        test('should use defaults when optional params undefined', () => {
            const arc = L.arc(0, 50, 100, 50, 50, undefined, undefined);
            expect(arc).toMatch(/^M 0,50 A 50,50 0 0,1 100,50$/);
        });
    });

    describe('smoothCurveThroughPoints()', () => {
        test('should return empty string for insufficient points', () => {
            expect(L.smoothCurveThroughPoints([])).toBe('');
            expect(L.smoothCurveThroughPoints([[0, 0]])).toBe('');
        });

        test('should create line for 2 points', () => {
            const path = L.smoothCurveThroughPoints([[0, 0], [100, 100]]);
            expect(path).toBe('M 0,0 L 100,100');
        });

        test('should create smooth curve for 3 points', () => {
            const path = L.smoothCurveThroughPoints([[0, 0], [50, 100], [100, 0]]);
            expect(path).toContain('M 0,0');
            expect(path).toContain('C');
        });

        test('should create smooth curve for many points', () => {
            const points = [[0, 0], [25, 50], [50, 0], [75, 50], [100, 0]];
            const path = L.smoothCurveThroughPoints(points);
            expect(path).toContain('M 0,0');
            expect(path).toContain('C');
        });

        test('should support closed path', () => {
            const path = L.smoothCurveThroughPoints([[0, 0], [50, 100], [100, 0]], true);
            expect(path).toContain('Z');
        });

        test('should handle points with same values', () => {
            const path = L.smoothCurveThroughPoints([[0, 0], [0, 0], [0, 0]]);
            expect(path).toContain('M 0,0');
        });
    });

    describe('getTotalLength()', () => {
        test('should return length for path element', () => {
            const path = L.path('M0,0 L100,100');
            const len = L.getTotalLength(path);
            // In jsdom, getTotalLength may not be available
            if (typeof len === 'number') {
                expect(len).toBeGreaterThanOrEqual(0);
            }
        });

        test('should return 0 for invalid element', () => {
            expect(L.getTotalLength(null)).toBe(0);
        });

        test('should return 0 for element without tag', () => {
            expect(L.getTotalLength({})).toBe(0);
        });
    });

    describe('getPointAtLength()', () => {
        test('should return point for path element', () => {
            const path = L.path('M0,0 L100,0');
            const pt = L.getPointAtLength(path, 50);
            // In jsdom, getPointAtLength may not be available
            if (pt) {
                expect(pt).toHaveProperty('x');
                expect(pt).toHaveProperty('y');
            }
        });

        test('should return null for invalid element', () => {
            expect(L.getPointAtLength(null, 50)).toBeNull();
        });

        test('should return null for element without tag', () => {
            expect(L.getPointAtLength({}, 50)).toBeNull();
        });

        test('should return null for element without getPointAtLength', () => {
            const el = { tag: {} };
            expect(L.getPointAtLength(el, 50)).toBeNull();
        });
    });

    describe('static methods', () => {
        test('L.arc should be defined', () => {
            expect(L.arc).toBeDefined();
            expect(typeof L.arc).toBe('function');
        });

        test('Leonardo.arc should be defined', () => {
            expect(Leonardo.arc).toBeDefined();
            expect(typeof Leonardo.arc).toBe('function');
        });

        test('L.smoothCurveThroughPoints should be defined', () => {
            expect(L.smoothCurveThroughPoints).toBeDefined();
            expect(typeof L.smoothCurveThroughPoints).toBe('function');
        });

        test('Leonardo.smoothCurveThroughPoints should be defined', () => {
            expect(Leonardo.smoothCurveThroughPoints).toBeDefined();
            expect(typeof Leonardo.smoothCurveThroughPoints).toBe('function');
        });
    });
});