
/**
 * Makes an element draggable
 *
 * @param {Object} options - Drag options
 * @param {Function} options.onDrag - Called during drag with (dx, dy, x, y)
 * @param {Function} options.onStart - Called when drag starts with (x, y)
 * @param {Function} options.onEnd - Called when drag ends with (x, y)
 * @param {string|Array} options.constrainTo - 'parent' or [x, y, width, height] bounds
 * @returns {Element} - Returns the element for chaining
 *
 * @example
 * circle.draggable({
 *     onDrag: function(dx, dy, x, y) {
 *         console.log('Dragging to:', x, y);
 *     },
 *     onStart: function(x, y) {
 *         console.log('Started dragging at:', x, y);
 *     },
 *     onEnd: function(x, y) {
 *         console.log('Ended dragging at:', x, y);
 *     },
 *     constrainTo: 'parent'
 * });
 */
Element.prototype.draggable = function(options) {
    options = options || {};
    var self = this,
        isDragging = false,
        startX = 0,
        startY = 0,
        initialX = 0,
        initialY = 0,
        currentX = 0,
        currentY = 0,
        onDrag = options.onDrag || function() {},
        onStart = options.onStart || function() {},
        onEnd = options.onEnd || function() {},
        constrainTo = options.constrainTo,
        svg = this.tag.ownerSVGElement;

    // Get initial position from transform or attributes
    function getPosition() {
        var transform = self.tag.getAttribute('transform');
        if (transform) {
            var match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
            if (match) {
                return {
                    x: parseFloat(match[1]) || 0,
                    y: parseFloat(match[2]) || 0
                };
            }
        }
        // Try cx/cy for circles/ellipses
        var cx = self.tag.getAttribute('cx'),
            cy = self.tag.getAttribute('cy'),
            x = self.tag.getAttribute('x'),
            y = self.tag.getAttribute('y');
        return {
            x: parseFloat(cx || x || 0),
            y: parseFloat(cy || y || 0)
        };
    }

    // Convert screen coordinates to SVG coordinates
    /* istanbul ignore next */
    function getSVGPoint(clientX, clientY) {
        if (!svg) return { x: clientX, y: clientY };
        /* istanbul ignore next */
        var pt = svg.createSVGPoint();
        /* istanbul ignore next */
        pt.x = clientX;
        /* istanbul ignore next */
        pt.y = clientY;
        /* istanbul ignore next */
        var ctm = svg.getScreenCTM();
        /* istanbul ignore next */
        if (ctm) {
            /* istanbul ignore next */
            return pt.matrixTransform(ctm.inverse());
        }
        /* istanbul ignore next */
        return { x: clientX, y: clientY };
    }

    // Apply constraints
    function constrain(x, y) {
        if (!constrainTo) return { x: x, y: y };

        var bounds;
        if (constrainTo === 'parent') {
            var parent = self.tag.parentNode;
            if (parent && parent.getBBox) {
                var bbox = parent.getBBox();
                bounds = [bbox.x, bbox.y, bbox.width, bbox.height];
            }
        } else if (constrainTo instanceof Array && constrainTo.length === 4) {
            bounds = constrainTo;
        }

        if (bounds) {
            var elBBox = self.tag.getBBox ? self.tag.getBBox() : { width: 0, height: 0 };
            x = Math.max(bounds[0], Math.min(x, bounds[0] + bounds[2] - elBBox.width));
            y = Math.max(bounds[1], Math.min(y, bounds[1] + bounds[3] - elBBox.height));
        }

        return { x: x, y: y };
    }

    function startDrag(e) {
        if (e.button !== 0) return; // Only left mouse button
        isDragging = true;

        var pos = getPosition();
        var svgPoint = getSVGPoint(e.clientX, e.clientY);
        initialX = pos.x;
        initialY = pos.y;
        startX = svgPoint.x;
        startY = svgPoint.y;
        currentX = initialX;
        currentY = initialY;

        onStart.call(self, initialX, initialY);
        e.preventDefault();
    }

    function doDrag(e) {
        if (!isDragging) return;

        var svgPoint = getSVGPoint(e.clientX, e.clientY);
        var dx = svgPoint.x - startX;
        var dy = svgPoint.y - startY;

        currentX = initialX + dx;
        currentY = initialY + dy;

        var constrained = constrain(currentX, currentY);
        currentX = constrained.x;
        currentY = constrained.y;

        self.move(currentX, currentY);
        onDrag.call(self, dx, dy, currentX, currentY);
    }

    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        onEnd.call(self, currentX, currentY);
    }

    // Mouse events
    this.tag.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', endDrag);

    // Touch events for mobile
    /* istanbul ignore next */
    this.tag.addEventListener('touchstart', function(e) {
        /* istanbul ignore next */
        if (e.touches.length === 1) {
            /* istanbul ignore next */
            startDrag(e.touches[0]);
        }
    });
    /* istanbul ignore next */
    document.addEventListener('touchmove', function(e) {
        /* istanbul ignore next */
        if (e.touches.length === 1) {
            /* istanbul ignore next */
            doDrag(e.touches[0]);
        }
    });
    /* istanbul ignore next */
    document.addEventListener('touchend', endDrag);

    return this;
};
