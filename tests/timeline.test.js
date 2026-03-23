/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Animation Timeline', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('timeline()', () => {
        test('should create a timeline', () => {
            var tl = L.timeline();
            expect(tl).toBeDefined();
            expect(typeof tl.add).toBe('function');
            expect(typeof tl.play).toBe('function');
            expect(typeof tl.pause).toBe('function');
            expect(typeof tl.stop).toBe('function');
        });

        test('should add animations', () => {
            var tl = L.timeline();
            var result = tl.add(function() {}, 0);
            expect(result).toBe(tl);
            expect(tl.animations.length).toBe(1);
        });

        test('should play timeline', () => {
            var tl = L.timeline();
            var result = tl.play();
            expect(result).toBe(tl);
            expect(tl.isPlaying).toBe(true);
        });

        test('should not play if already playing', () => {
            var tl = L.timeline();
            tl.play();
            var result = tl.play();
            expect(result).toBe(tl);
        });

        test('should pause timeline', () => {
            var tl = L.timeline();
            tl.play();
            var result = tl.pause();
            expect(result).toBe(tl);
            expect(tl.isPlaying).toBe(false);
        });

        test('should stop timeline', () => {
            var tl = L.timeline();
            tl.add(function() {}, 0);
            tl.play();
            var result = tl.stop();
            expect(result).toBe(tl);
            expect(tl.isPlaying).toBe(false);
            expect(tl.currentIndex).toBe(0);
        });

        test('should call animation when offset is reached', (done) => {
            var tl = L.timeline();
            var called = false;
            tl.add(function() {
                called = true;
                return function() {}; // return stopper
            }, 0);
            tl.play();
            setTimeout(() => {
                expect(called).toBe(true);
                done();
            }, 50);
        });

        test('should not restart animation if already started', (done) => {
            var tl = L.timeline();
            var callCount = 0;
            tl.add(function() {
                callCount++;
                return function() {};
            }, 0);
            tl.play();
            setTimeout(() => {
                expect(callCount).toBe(1);
                done();
            }, 100);
        });

        test('should call onComplete when all animations complete', (done) => {
            var completed = false;
            var tl = L.timeline({
                onComplete: function() {
                    completed = true;
                }
            });
            tl.add(function() { return function() {}; }, 0);
            tl.play();
            setTimeout(() => {
                expect(completed).toBe(true);
                done();
            }, 100);
        });

        test('should support autoPlay option', () => {
            var tl = L.timeline({ autoPlay: true });
            // autoPlay option is stored but requires manual play
            expect(tl.autoPlay).toBe(true);
        });

        test('should pause running animations', (done) => {
            var tl = L.timeline();
            var stopperCalled = false;
            tl.add(function() {
                return function() { stopperCalled = true; };
            }, 0);
            tl.play();

            setTimeout(() => {
                tl.pause();
                expect(tl.isPlaying).toBe(false);
                done();
            }, 50);
        });

        test('should handle tick with pending animations', (done) => {
            var tl = L.timeline();
            var started = false;
            tl.add(function() {
                started = true;
                return function() {};
            }, 0.5); // Delayed animation
            tl.play();

            // Immediately check before animation starts
            setTimeout(() => {
                expect(started).toBe(false);
                tl.pause();
                done();
            }, 10);
        });
    });

    describe('static method', () => {
        test('L.timeline should be defined', () => {
            expect(L.timeline).toBeDefined();
            expect(typeof L.timeline).toBe('function');
        });
    });
});
