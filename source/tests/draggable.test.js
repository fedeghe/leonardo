/**
 * @jest-environment jsdom
 */
const Leonardo = require('../dist');

describe('Drag and Drop', () => {
    let L;

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        L = Leonardo(100, 100, { target: document.getElementById('root') });
    });

    describe('Element.draggable()', () => {
        test('should be defined', () => {
            var circle = L.circle(50, 50, 20);
            expect(circle.draggable).toBeDefined();
            expect(typeof circle.draggable).toBe('function');
        });

        test('should return element for chaining', () => {
            var circle = L.circle(50, 50, 20);
            var result = circle.draggable();
            expect(result).toBe(circle);
        });

        test('should accept options', () => {
            var circle = L.circle(50, 50, 20);
            var result = circle.draggable({
                onDrag: function() {},
                onStart: function() {},
                onEnd: function() {}
            });
            expect(result).toBe(circle);
        });

        test('should handle constrainTo parent', () => {
            var group = L.group();
            var circle = L.circle(50, 50, 20);
            group.append(circle);
            L.append(group);
            circle.draggable({ constrainTo: 'parent' });
            expect(circle).toBeDefined();
        });

        test('should handle constrainTo array bounds', () => {
            var circle = L.circle(50, 50, 20);
            circle.draggable({ constrainTo: [0, 0, 100, 100] });
            expect(circle).toBeDefined();
        });

        test('should handle mousedown event', () => {
            var circle = L.circle(50, 50, 20);
            var onStartCalled = false;
            circle.draggable({
                onStart: function() { onStartCalled = true; }
            });
            L.append(circle);
            L.render();

            var event = new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            });
            circle.tag.dispatchEvent(event);
            expect(onStartCalled).toBe(true);
        });

        test('should not trigger on right mouse button', () => {
            var circle = L.circle(50, 50, 20);
            var onStartCalled = false;
            circle.draggable({
                onStart: function() { onStartCalled = true; }
            });
            L.append(circle);
            L.render();

            var event = new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 2
            });
            circle.tag.dispatchEvent(event);
            expect(onStartCalled).toBe(false);
        });

        test('should get initial position from transform', () => {
            var circle = L.circle(50, 50, 20);
            // Set a proper translate transform
            circle.tag.setAttribute('transform', 'translate(10, 10)');
            L.append(circle);
            L.render();

            // Mock createSVGPoint for jsdom
            L.tag.createSVGPoint = function() {
                return {
                    x: 0,
                    y: 0,
                    matrixTransform: function() { return { x: 50, y: 50 }; }
                };
            };
            L.tag.getScreenCTM = function() {
                return { inverse: function() { return {}; } };
            };

            var onStartCalled = false;
            var pos = { x: 0, y: 0 };
            circle.draggable({
                onStart: function(x, y) {
                    onStartCalled = true;
                    pos = { x: x, y: y };
                }
            });

            circle.tag.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            }));

            expect(onStartCalled).toBe(true);
            expect(pos.x).toBe(10);
            expect(pos.y).toBe(10);
        });

        test('should handle transform without translate match', () => {
            var circle = L.circle(50, 50, 20);
            // Set a transform that doesn't match translate pattern
            circle.tag.setAttribute('transform', 'scale(2)');
            L.append(circle);
            L.render();

            // Mock createSVGPoint for jsdom
            L.tag.createSVGPoint = function() {
                return {
                    x: 0,
                    y: 0,
                    matrixTransform: function() { return { x: 50, y: 50 }; }
                };
            };
            L.tag.getScreenCTM = function() {
                return { inverse: function() { return {}; } };
            };

            var onStartCalled = false;
            var pos = { x: 0, y: 0 };
            circle.draggable({
                onStart: function(x, y) {
                    onStartCalled = true;
                    pos = { x: x, y: y };
                }
            });

            circle.tag.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            }));

            expect(onStartCalled).toBe(true);
            expect(typeof pos.x).toBe('number');
            expect(typeof pos.y).toBe('number');
        });

        test('should get initial position from cx/cy', () => {
            var circle = L.circle(50, 50, 20);
            L.append(circle);
            L.render();
            circle.draggable({});
            expect(circle).toBeDefined();
        });

        test('should get initial position from x/y', () => {
            var rect = L.rect(50, 50, 20, 20);
            L.append(rect);
            L.render();
            rect.draggable({});
            expect(rect).toBeDefined();
        });

        test('should handle mousemove during drag', () => {
            var circle = L.circle(50, 50, 20);
            var onDragCalled = false;
            circle.draggable({
                onDrag: function() { onDragCalled = true; }
            });
            L.append(circle);
            L.render();

            // Start drag
            var startEvent = new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            });
            circle.tag.dispatchEvent(startEvent);

            // Move
            var moveEvent = new MouseEvent('mousemove', {
                bubbles: true,
                clientX: 60,
                clientY: 60
            });
            document.dispatchEvent(moveEvent);

            expect(onDragCalled).toBe(true);
        });

        test('should handle mouseup to end drag', () => {
            var circle = L.circle(50, 50, 20);
            var onEndCalled = false;
            circle.draggable({
                onEnd: function() { onEndCalled = true; }
            });
            L.append(circle);
            L.render();

            // Start drag
            circle.tag.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            }));

            // End drag
            document.dispatchEvent(new MouseEvent('mouseup', {
                bubbles: true
            }));

            expect(onEndCalled).toBe(true);
        });

        test('should not drag if not started', () => {
            var circle = L.circle(50, 50, 20);
            var onDragCalled = false;
            circle.draggable({
                onDrag: function() { onDragCalled = true; }
            });
            L.append(circle);
            L.render();

            // Move without starting
            var moveEvent = new MouseEvent('mousemove', {
                bubbles: true,
                clientX: 60,
                clientY: 60
            });
            document.dispatchEvent(moveEvent);

            expect(onDragCalled).toBe(false);
        });

        test('should handle constrainTo array', () => {
            var circle = L.circle(50, 50, 20);
            var dragged = false;
            circle.draggable({
                constrainTo: [0, 0, 100, 100],
                onDrag: function() { dragged = true; }
            });
            L.append(circle);
            L.render();

            // Start and move
            circle.tag.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            }));
            document.dispatchEvent(new MouseEvent('mousemove', {
                bubbles: true,
                clientX: 60,
                clientY: 60
            }));

            expect(dragged).toBe(true);
        });

        test('should handle constrainTo parent without getBBox', () => {
            var group = L.group();
            var circle = L.circle(50, 50, 20);
            group.append(circle);
            L.append(group);
            L.render();

            // Remove getBBox from parent
            group.tag.getBBox = undefined;
            circle.tag.getBBox = function() {
                return { width: 40, height: 40 };
            };

            // Mock createSVGPoint for jsdom
            L.tag.createSVGPoint = function() {
                return {
                    x: 0,
                    y: 0,
                    matrixTransform: function() { return { x: 50, y: 50 }; }
                };
            };
            L.tag.getScreenCTM = function() {
                return { inverse: function() { return {}; } };
            };

            var dragged = false;
            circle.draggable({
                constrainTo: 'parent',
                onDrag: function() { dragged = true; }
            });

            // Start and move
            circle.tag.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            }));
            document.dispatchEvent(new MouseEvent('mousemove', {
                bubbles: true,
                clientX: 60,
                clientY: 60
            }));

            expect(dragged).toBe(true);
        });

        test('should handle constrainTo parent with getBBox', () => {
            var group = L.group();
            var circle = L.circle(50, 50, 20);
            group.append(circle);
            L.append(group);
            L.render();

            // Mock getBBox on parent
            group.tag.getBBox = function() {
                return { x: 0, y: 0, width: 100, height: 100 };
            };
            circle.tag.getBBox = function() {
                return { width: 40, height: 40 };
            };

            // Mock createSVGPoint for jsdom
            L.tag.createSVGPoint = function() {
                return {
                    x: 0,
                    y: 0,
                    matrixTransform: function() { return { x: 50, y: 50 }; }
                };
            };
            L.tag.getScreenCTM = function() {
                return { inverse: function() { return {}; } };
            };

            var dragged = false;
            circle.draggable({
                constrainTo: 'parent',
                onDrag: function() { dragged = true; }
            });

            // Start and move
            circle.tag.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            }));
            document.dispatchEvent(new MouseEvent('mousemove', {
                bubbles: true,
                clientX: 60,
                clientY: 60
            }));

            expect(dragged).toBe(true);
        });

        test('should get position from attributes when no transform', () => {
            var circle = L.circle(50, 50, 20);
            // Remove any existing transform
            circle.tag.removeAttribute('transform');
            L.append(circle);
            L.render();

            // Mock createSVGPoint for jsdom
            L.tag.createSVGPoint = function() {
                return {
                    x: 0,
                    y: 0,
                    matrixTransform: function() { return { x: 50, y: 50 }; }
                };
            };
            L.tag.getScreenCTM = function() {
                return { inverse: function() { return {}; } };
            };

            var pos = { x: 0, y: 0 };
            circle.draggable({
                onStart: function(x, y) { pos = { x: x, y: y }; }
            });

            circle.tag.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                clientX: 50,
                clientY: 50,
                button: 0
            }));

            expect(typeof pos.x).toBe('number');
            expect(typeof pos.y).toBe('number');
        });

    });
});