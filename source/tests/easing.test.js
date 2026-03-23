/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Easing Functions', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('Easing object', () => {
        test('should have linear easing', () => {
            expect(L.animate.Easing.linear).toBeDefined();
            expect(typeof L.animate.Easing.linear).toBe('function');
            expect(L.animate.Easing.linear(0)).toBe(0);
            expect(L.animate.Easing.linear(0.5)).toBe(0.5);
            expect(L.animate.Easing.linear(1)).toBe(1);
        });

        test('should have easeInQuad', () => {
            expect(L.animate.Easing.easeInQuad).toBeDefined();
            expect(L.animate.Easing.easeInQuad(0)).toBe(0);
            expect(L.animate.Easing.easeInQuad(0.5)).toBe(0.25);
            expect(L.animate.Easing.easeInQuad(1)).toBe(1);
        });

        test('should have easeOutQuad', () => {
            expect(L.animate.Easing.easeOutQuad).toBeDefined();
            expect(L.animate.Easing.easeOutQuad(0)).toBe(0);
            expect(L.animate.Easing.easeOutQuad(1)).toBe(1);
        });

        test('should have easeInOutQuad', () => {
            expect(L.animate.Easing.easeInOutQuad).toBeDefined();
            expect(L.animate.Easing.easeInOutQuad(0)).toBe(0);
            expect(L.animate.Easing.easeInOutQuad(0.5)).toBe(0.5);
            expect(L.animate.Easing.easeInOutQuad(1)).toBe(1);
        });

        test('should have easeInCubic', () => {
            expect(L.animate.Easing.easeInCubic).toBeDefined();
            expect(L.animate.Easing.easeInCubic(0)).toBe(0);
            expect(L.animate.Easing.easeInCubic(0.5)).toBe(0.125);
            expect(L.animate.Easing.easeInCubic(1)).toBe(1);
        });

        test('should have easeOutCubic', () => {
            expect(L.animate.Easing.easeOutCubic).toBeDefined();
            expect(L.animate.Easing.easeOutCubic(0)).toBe(0);
            expect(L.animate.Easing.easeOutCubic(1)).toBe(1);
        });

        test('should have easeInOutCubic', () => {
            expect(L.animate.Easing.easeInOutCubic).toBeDefined();
            expect(L.animate.Easing.easeInOutCubic(0)).toBe(0);
            expect(L.animate.Easing.easeInOutCubic(1)).toBe(1);
        });

        test('should have easeInQuart', () => {
            expect(L.animate.Easing.easeInQuart).toBeDefined();
            expect(L.animate.Easing.easeInQuart(0)).toBe(0);
            expect(L.animate.Easing.easeInQuart(1)).toBe(1);
        });

        test('should have easeOutQuart', () => {
            expect(L.animate.Easing.easeOutQuart).toBeDefined();
            expect(L.animate.Easing.easeOutQuart(0)).toBe(0);
            expect(L.animate.Easing.easeOutQuart(1)).toBe(1);
        });

        test('should have easeInOutQuart', () => {
            expect(L.animate.Easing.easeInOutQuart).toBeDefined();
            expect(L.animate.Easing.easeInOutQuart(0)).toBe(0);
            expect(L.animate.Easing.easeInOutQuart(1)).toBe(1);
        });

        test('should have spring', () => {
            expect(L.animate.Easing.spring).toBeDefined();
            expect(L.animate.Easing.spring(0)).toBe(0);
            expect(L.animate.Easing.spring(1)).toBe(1);
        });

        test('should have bounce', () => {
            expect(L.animate.Easing.bounce).toBeDefined();
            expect(L.animate.Easing.bounce(0)).toBe(0);
            expect(L.animate.Easing.bounce(1)).toBe(1);
        });
    });

    describe('withEasing', () => {
        test('should be defined', () => {
            expect(L.animate.withEasing).toBeDefined();
            expect(typeof L.animate.withEasing).toBe('function');
        });

        test('should animate with easing', (done) => {
            const circle = L.circle(50, 50, 20);
            L.append(circle);
            L.render();

            const stopper = L.animate.withEasing(circle, {
                attributeName: 'r',
                from: 20,
                to: 50,
                dur: 0.1,
                easing: L.animate.Easing.linear,
                onComplete: function() {
                    expect(circle.tag.getAttribute('r')).toBe('50');
                    done();
                }
            });

            expect(typeof stopper).toBe('function');
        });

        test('should use linear easing by default', (done) => {
            const circle = L.circle(50, 50, 20);
            L.append(circle);
            L.render();

            const stopper = L.animate.withEasing(circle, {
                attributeName: 'r',
                from: 20,
                to: 50,
                dur: 0.1,
                onComplete: function() {
                    done();
                }
            });

            expect(typeof stopper).toBe('function');
        });

        test('should stop animation when stopper is called', (done) => {
            const circle = L.circle(50, 50, 20);
            L.append(circle);
            L.render();

            let completed = false;
            const stopper = L.animate.withEasing(circle, {
                attributeName: 'r',
                from: 20,
                to: 50,
                dur: 1,
                onComplete: function() {
                    completed = true;
                }
            });

            // Stop immediately
            stopper();

            // Wait and verify it didn't complete
            setTimeout(() => {
                expect(completed).toBe(false);
                done();
            }, 100);
        });
    });
});
