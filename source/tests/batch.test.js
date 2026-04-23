/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Batch Operations', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('L.batch()', () => {
        test('should be defined', () => {
            expect(L.batch).toBeDefined();
            expect(typeof L.batch).toBe('function');
        });

        test('should return instance for chaining', () => {
            var result = L.batch(function() {});
            expect(result).toBe(L);
        });

        test('should execute batch function', () => {
            var executed = false;
            L.batch(function() {
                executed = true;
            });
            expect(executed).toBe(true);
        });

        test('should defer append operations', () => {
            var circle = L.circle(10, 10, 5);
            var rect = L.rect(20, 20, 10, 10);

            L.batch(function() {
                this.append(circle);
                this.append(rect);
            });

            expect(L.childs).toContain(circle);
            expect(L.childs).toContain(rect);
        });

        test('should handle nested elements in batch', () => {
            var group = L.group();
            var circle = L.circle(10, 10, 5);
            group.append(circle);

            L.batch(function() {
                this.append(group);
            });

            expect(L.childs).toContain(group);
        });

        test('should restore original append after batch', () => {
            var originalAppend = L.append;
            L.batch(function() {});
            expect(L.append).toBe(originalAppend);
        });

        test('should handle errors gracefully', () => {
            expect(() => {
                L.batch(function() {
                    throw new Error('Test error');
                });
            }).toThrow('Test error');
        });
    });

    describe('Element.batchAppend()', () => {
        test('should be defined', () => {
            var group = L.group();
            expect(group.batchAppend).toBeDefined();
            expect(typeof group.batchAppend).toBe('function');
        });

        test('should return element for chaining', () => {
            var group = L.group();
            var result = group.batchAppend([L.circle(10, 10, 5)]);
            expect(result).toBe(group);
        });

        test('should append multiple elements efficiently', () => {
            var group = L.group();
            var circle1 = L.circle(10, 10, 5);
            var circle2 = L.circle(20, 20, 5);
            var rect = L.rect(30, 30, 10, 10);

            group.batchAppend([circle1, circle2, rect]);

            expect(group.childs).toContain(circle1);
            expect(group.childs).toContain(circle2);
            expect(group.childs).toContain(rect);
        });

        test('should skip non-element items', () => {
            var group = L.group();
            var circle = L.circle(10, 10, 5);

            group.batchAppend([circle, null, undefined, "string", 123]);

            expect(group.childs.length).toBe(1);
            expect(group.childs).toContain(circle);
        });
    });

    describe('static method', () => {
        test('Leonardo.batch should be defined', () => {
            expect(Leonardo.batch).toBeDefined();
            expect(typeof Leonardo.batch).toBe('function');
        });
    });
});
