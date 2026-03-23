/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Event Delegation', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('L.delegate()', () => {
        test('should be defined', () => {
            expect(L.delegate).toBeDefined();
            expect(typeof L.delegate).toBe('function');
        });

        test('should return instance for chaining', () => {
            var result = L.delegate('click', 'circle', function() {});
            expect(result).toBe(L);
        });

        test('should delegate events to matching elements', () => {
            var handlerCalled = false;
            var handler = function(e, target) {
                handlerCalled = true;
            };
            L.delegate('click', 'circle', handler);

            var circle = L.circle(50, 50, 20);
            L.append(circle);
            L.render();

            var event = new MouseEvent('click', { bubbles: true });
            circle.tag.dispatchEvent(event);

            expect(handlerCalled).toBe(true);
        });

        test('should not delegate to non-matching elements', () => {
            var handlerCalled = false;
            L.delegate('click', 'circle', function() {
                handlerCalled = true;
            });

            var rect = L.rect(10, 10, 20, 20);
            L.append(rect);
            L.render();

            var event = new MouseEvent('click', { bubbles: true });
            rect.tag.dispatchEvent(event);

            expect(handlerCalled).toBe(false);
        });

        test('should delegate to class selectors', () => {
            var handlerCalled = false;
            L.delegate('click', '.my-class', function(e, target) {
                handlerCalled = true;
            });

            var circle = L.circle(50, 50, 20);
            circle.setAttributes({ class: 'my-class' });
            L.append(circle);
            L.render();

            var event = new MouseEvent('click', { bubbles: true });
            circle.tag.dispatchEvent(event);

            expect(handlerCalled).toBe(true);
        });

        test('should delegate to id selectors', () => {
            var handlerCalled = false;
            L.delegate('click', '#myId', function(e, target) {
                handlerCalled = true;
            });

            var circle = L.circle(50, 50, 20);
            circle.setAttributes({ id: 'myId' });
            L.append(circle);
            L.render();

            var event = new MouseEvent('click', { bubbles: true });
            circle.tag.dispatchEvent(event);

            expect(handlerCalled).toBe(true);
        });
    });

    describe('Element.delegate()', () => {
        test('should be defined', () => {
            var group = L.group();
            expect(group.delegate).toBeDefined();
            expect(typeof group.delegate).toBe('function');
        });

        test('should return element for chaining', () => {
            var group = L.group();
            var result = group.delegate('click', 'circle', function() {});
            expect(result).toBe(group);
        });

        test('should delegate events within element', () => {
            var handlerCalled = false;
            var group = L.group();
            group.delegate('click', 'circle', function(e, target) {
                handlerCalled = true;
            });

            var circle = L.circle(50, 50, 20);
            group.append(circle);
            L.append(group);
            L.render();

            var event = new MouseEvent('click', { bubbles: true });
            circle.tag.dispatchEvent(event);

            expect(handlerCalled).toBe(true);
        });

        test('should handle parent traversal when element is wrapped', () => {
            var handlerCalled = false;
            var group = L.group();
            group.delegate('click', 'circle', function(e, target) {
                handlerCalled = true;
            });

            // Create circle and wrap it in a group
            var innerGroup = L.group();
            var circle = L.circle(50, 50, 20);
            innerGroup.append(circle);
            group.append(innerGroup);
            L.append(group);
            L.render();

            var event = new MouseEvent('click', { bubbles: true });
            circle.tag.dispatchEvent(event);

            expect(handlerCalled).toBe(true);
        });

        test('should not traverse past element boundary', () => {
            var handlerCalled = false;
            var group = L.group();
            group.setAttributes({ id: 'outer' });
            group.delegate('click', 'circle', function() {
                handlerCalled = true;
            });

            // Click on something outside the group
            var outsideCircle = L.circle(30, 30, 10);
            L.append(outsideCircle);
            L.append(group);
            L.render();

            var event = new MouseEvent('click', { bubbles: true });
            outsideCircle.tag.dispatchEvent(event);

            expect(handlerCalled).toBe(false);
        });
    });

    describe('static method', () => {
        test('Leonardo.delegate should be defined', () => {
            expect(Leonardo.delegate).toBeDefined();
            expect(typeof Leonardo.delegate).toBe('function');
        });
    });
});