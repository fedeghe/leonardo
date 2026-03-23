/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('ViewBox and Coordinate Helpers', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('setViewBox()', () => {
        test('should set viewBox attribute', () => {
            L.setViewBox(0, 0, 500, 500);
            expect(L.tag.getAttribute('viewBox')).toBe('0 0 500 500');
        });

        test('should return instance for chaining', () => {
            const result = L.setViewBox(0, 0, 200, 200);
            expect(result).toBe(L);
        });
    });

    describe('preserveAspectRatio()', () => {
        test('should set preserveAspectRatio attribute', () => {
            L.preserveAspectRatio('xMinYMin meet');
            expect(L.tag.getAttribute('preserveAspectRatio')).toBe('xMinYMin meet');
        });

        test('should return instance for chaining', () => {
            const result = L.preserveAspectRatio('xMidYMid slice');
            expect(result).toBe(L);
        });
    });

    describe('getViewBox()', () => {
        test('should return null if no viewBox set', () => {
            // Remove default viewBox
            L.tag.removeAttribute('viewBox');
            expect(L.getViewBox()).toBeNull();
        });

        test('should return viewBox values as object', () => {
            L.setViewBox(10, 20, 300, 400);
            const vb = L.getViewBox();
            expect(vb).toEqual({
                x: 10,
                y: 20,
                width: 300,
                height: 400
            });
        });
    });

    describe('screenToSVG()', () => {
        test('should be defined', () => {
            expect(L.screenToSVG).toBeDefined();
            expect(typeof L.screenToSVG).toBe('function');
        });
    });

    describe('svgToScreen()', () => {
        test('should be defined', () => {
            expect(L.svgToScreen).toBeDefined();
            expect(typeof L.svgToScreen).toBe('function');
        });
    });

    describe('static methods', () => {
        test('L.setViewBox should be defined', () => {
            expect(L.setViewBox).toBeDefined();
            expect(typeof L.setViewBox).toBe('function');
        });

        test('L.preserveAspectRatio should be defined', () => {
            expect(L.preserveAspectRatio).toBeDefined();
            expect(typeof L.preserveAspectRatio).toBe('function');
        });

        test('L.getViewBox should be defined', () => {
            expect(L.getViewBox).toBeDefined();
            expect(typeof L.getViewBox).toBe('function');
        });
    });
});
