/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Masks and ClipPaths', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('mask()', () => {
        test('should create a mask with auto-generated id', () => {
            const rect = L.rect(0, 0, 50, 50).setAttributes({ fill: 'white' });
            const maskRef = L.mask(rect);

            expect(maskRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should create a mask with custom id', () => {
            const rect = L.rect(0, 0, 50, 50).setAttributes({ fill: 'white' });
            const maskRef = L.mask('myMask', rect);

            expect(maskRef).toBe('url(#myMask)');
        });

        test('should create a mask with multiple elements', () => {
            const rect = L.rect(0, 0, 50, 50).setAttributes({ fill: 'white' });
            const circle = L.circle(25, 25, 10).setAttributes({ fill: 'black' });
            const maskRef = L.mask(rect, circle);

            expect(maskRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should apply mask to element', () => {
            const rect = L.rect(0, 0, 50, 50).setAttributes({ fill: 'white' });
            const maskRef = L.mask(rect);
            const element = L.rect(0, 0, 100, 100).setAttributes({ mask: maskRef });

            expect(element.tag.getAttribute('mask')).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should handle no elements', () => {
            const maskRef = L.mask();
            expect(maskRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should handle null/undefined elements gracefully', () => {
            const rect = L.rect(0, 0, 50, 50).setAttributes({ fill: 'white' });
            const maskRef = L.mask(null, rect, undefined);
            expect(maskRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });
    });

    describe('clipPath()', () => {
        test('should create a clipPath with auto-generated id', () => {
            const circle = L.circle(50, 50, 40);
            const clipRef = L.clipPath(circle);

            expect(clipRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should create a clipPath with custom id', () => {
            const circle = L.circle(50, 50, 40);
            const clipRef = L.clipPath('myClip', circle);

            expect(clipRef).toBe('url(#myClip)');
        });

        test('should apply clip-path to element', () => {
            const circle = L.circle(50, 50, 40);
            const clipRef = L.clipPath(circle);
            const element = L.rect(0, 0, 100, 100).setAttributes({ 'clip-path': clipRef });

            expect(element.tag.getAttribute('clip-path')).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should handle no elements', () => {
            const clipRef = L.clipPath();
            expect(clipRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });

        test('should handle null/undefined elements gracefully', () => {
            const circle = L.circle(50, 50, 40);
            const clipRef = L.clipPath(null, circle, undefined);
            expect(clipRef).toMatch(/^url\(#leo_id_\d+\)$/);
        });
    });

    describe('static methods', () => {
        test('Leonardo.mask should be defined', () => {
            expect(Leonardo.mask).toBeDefined();
            expect(typeof Leonardo.mask).toBe('function');
        });

        test('Leonardo.clipPath should be defined', () => {
            expect(Leonardo.clipPath).toBeDefined();
            expect(typeof Leonardo.clipPath).toBe('function');
        });
    });
});
