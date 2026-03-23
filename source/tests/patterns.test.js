/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Patterns', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('pattern()', () => {
        test('should create a pattern with auto-generated id', () => {
            const circle = L.circle(10, 10, 5).setAttributes({ fill: 'red' });
            const patternRef = L.pattern(20, 20, circle);

            expect(patternRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should create a pattern with custom id', () => {
            const circle = L.circle(10, 10, 5).setAttributes({ fill: 'red' });
            const patternRef = L.pattern(20, 20, circle, { id: 'myPattern' });

            expect(patternRef).toBe('url(#myPattern)');
        });

        test('should create a pattern with multiple elements', () => {
            const rect = L.rect(0, 0, 10, 10).setAttributes({ fill: 'blue' });
            const circle = L.circle(10, 10, 5).setAttributes({ fill: 'red' });
            const patternRef = L.pattern(20, 20, [rect, circle]);

            expect(patternRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should apply pattern to element fill', () => {
            const circle = L.circle(10, 10, 5).setAttributes({ fill: 'red' });
            const patternRef = L.pattern(20, 20, circle);
            const element = L.rect(0, 0, 100, 100).setAttributes({ fill: patternRef });

            expect(element.tag.getAttribute('fill')).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should support patternUnits option', () => {
            const circle = L.circle(10, 10, 5);
            const patternRef = L.pattern(20, 20, circle, { patternUnits: 'objectBoundingBox' });

            expect(patternRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should support x and y offset options', () => {
            const circle = L.circle(10, 10, 5);
            const patternRef = L.pattern(20, 20, circle, { x: 5, y: 5 });

            expect(patternRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should support patternTransform option', () => {
            const circle = L.circle(10, 10, 5);
            const patternRef = L.pattern(20, 20, circle, { patternTransform: 'rotate(45)' });

            expect(patternRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });
    });

    describe('static method', () => {
        test('L.pattern should be defined', () => {
            expect(L.pattern).toBeDefined();
            expect(typeof L.pattern).toBe('function');
        });
    });
});
