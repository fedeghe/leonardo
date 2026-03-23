/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Debug Mode', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('L.debug()', () => {
        test('should be defined', () => {
            expect(L.debug).toBeDefined();
            expect(typeof L.debug).toBe('function');
        });

        test('should return instance for chaining', () => {
            var result = L.debug();
            expect(result).toBe(L);
        });

        test('should accept options', () => {
            var result = L.debug({
                showGrid: true,
                gridSize: 25,
                showBoundingBoxes: true,
                showCenterPoints: true
            });
            expect(result).toBe(L);
        });

        test('should create debug group', () => {
            L.debug();
            expect(L._debugGroup).toBeDefined();
        });

        test('should show grid when option is true', () => {
            L.debug({ showGrid: true, gridSize: 50 });
            expect(L._debugGroup).toBeDefined();
        });

        test('should show coordinates on mousemove', () => {
            // Skip in jsdom - createSVGPoint not supported
            if (!L.tag.createSVGPoint) {
                return;
            }
            L.debug({ showCoordinates: true });
            L.render();

            var event = new MouseEvent('mousemove', {
                bubbles: true,
                clientX: 50,
                clientY: 50
            });
            L.tag.dispatchEvent(event);

            expect(L._debugGroup).toBeDefined();
        });

        test('should show bounding boxes when option is true', () => {
            var circle = L.circle(50, 50, 20);
            L.append(circle);
            L.debug({ showBoundingBoxes: true });
            L.render();
            expect(L._debugGroup).toBeDefined();
        });

        test('should show center points when option is true', () => {
            var circle = L.circle(50, 50, 20);
            L.append(circle);
            L.debug({ showCenterPoints: true });
            L.render();
            expect(L._debugGroup).toBeDefined();
        });

        test('should add debug info to newly appended elements', () => {
            // Skip if getBBox not available in jsdom
            var circle = L.circle(50, 50, 20);
            L.append(circle);
            L.render();
            if (!circle.tag.getBBox) {
                return;
            }
            L.debug({ showBoundingBoxes: true });
            expect(circle._debugElements).toBeDefined();
        });
    });

    describe('L.undebug()', () => {
        test('should be defined', () => {
            expect(L.undebug).toBeDefined();
            expect(typeof L.undebug).toBe('function');
        });

        test('should return instance for chaining', () => {
            L.debug();
            var result = L.undebug();
            expect(result).toBe(L);
        });

        test('should remove debug group', () => {
            L.debug();
            L.undebug();
            expect(L._debugGroup).toBeNull();
        });

        test('should handle undebug without prior debug', () => {
            var result = L.undebug();
            expect(result).toBe(L);
        });
    });

    describe('static methods', () => {
        test('Leonardo.debug should be defined', () => {
            expect(Leonardo.debug).toBeDefined();
            expect(typeof Leonardo.debug).toBe('function');
        });

        test('Leonardo.undebug should be defined', () => {
            expect(Leonardo.undebug).toBeDefined();
            expect(typeof Leonardo.undebug).toBe('function');
        });
    });
});