
/**
 * Debug mode - adds visual guides and information to help with development
 *
 * @param {Object} options - Debug options
 * @param {boolean} options.showBoundingBoxes - Show bounding boxes around elements (default: true)
 * @param {boolean} options.showCenterPoints - Show center points for elements (default: true)
 * @param {boolean} options.showGrid - Show coordinate grid (default: false)
 * @param {number} options.gridSize - Grid size in pixels (default: 50)
 * @param {boolean} options.showCoordinates - Show coordinates on hover (default: true)
 * @returns {L} - Returns the instance for chaining
 *
 * @example
 * L.debug({ showGrid: true, gridSize: 25 });
 */
L.prototype.debug = function(options) {
    options = options || {};
    var self = this,
        showBoundingBoxes = options.showBoundingBoxes !== false,
        showCenterPoints = options.showCenterPoints !== false,
        showGrid = options.showGrid || false,
        gridSize = options.gridSize || 50,
        showCoordinates = options.showCoordinates !== false;

    // Create debug group
    var debugGroup = this.group();
    debugGroup.sas({ class: 'leo-debug-layer' });

    // Add grid if requested
    if (showGrid) {
        var gridGroup = this.group();
        var w = this.width,
            h = this.height;

        // Vertical lines
        for (var x = 0; x <= w; x += gridSize) {
            var line = this.line(x, 0, x, h).setAttributes({
                stroke: '#ddd',
                'stroke-width': 0.5
            });
            gridGroup.append(line);
        }

        // Horizontal lines
        for (var y = 0; y <= h; y += gridSize) {
            var line = this.line(0, y, w, y).setAttributes({
                stroke: '#ddd',
                'stroke-width': 0.5
            });
            gridGroup.append(line);
        }

        debugGroup.append(gridGroup);
    }

    // Add coordinate display
    if (showCoordinates) {
        var coordText = this.text(10, 20, 'x: 0, y: 0').setAttributes({
            fill: '#666',
            'font-family': 'monospace',
            'font-size': '12px',
            class: 'leo-debug-coords'
        });
        debugGroup.append(coordText);

        /* istanbul ignore next */
        this.tag.addEventListener('mousemove', function(e) {
            /* istanbul ignore next */
            var pt = self.tag.createSVGPoint();
            /* istanbul ignore next */
            pt.x = e.clientX;
            /* istanbul ignore next */
            pt.y = e.clientY;
            /* istanbul ignore next */
            var svgP = pt.matrixTransform(self.tag.getScreenCTM().inverse());
            /* istanbul ignore next */
            coordText.updateText('x: ' + Math.round(svgP.x) + ', y: ' + Math.round(svgP.y));
        });
    }

    // Store reference to debug group
    this._debugGroup = debugGroup;
    this.append(debugGroup);

    // Add debug info to all elements
    if (showBoundingBoxes || showCenterPoints) {
        this._debugElements = [];
        this._enableElementDebug(showBoundingBoxes, showCenterPoints);
    }

    return this;
};

/**
 * Enable debug visualization for individual elements
 * @private
 */
L.prototype._enableElementDebug = function(showBoundingBoxes, showCenterPoints) {
    var self = this;

    // Override append to add debug info to new elements
    var originalAppend = this.append;
    /* istanbul ignore next */
    this.append = function() {
        /* istanbul ignore next */
        var result = originalAppend.apply(this, arguments);

        // Add debug visualization for new elements
        /* istanbul ignore next */
        for (var i = 0; i < arguments.length; i++) {
            /* istanbul ignore next */
            var el = arguments[i];
            /* istanbul ignore next */
            if (el instanceof Element && el.tag.getBBox) {
                /* istanbul ignore next */
                el._addDebugInfo(self, showBoundingBoxes, showCenterPoints);
            }
        }

        /* istanbul ignore next */
        return result;
    };
};

/**
 * Add debug visualization to an element
 * @private
 */
/* istanbul ignore next */
Element.prototype._addDebugInfo = function(leoInstance, showBoundingBoxes, showCenterPoints) {
    /* istanbul ignore if */
    if (!this.tag.getBBox) return;

    /* istanbul ignore next */
    var bbox = this.tag.getBBox();
    var debugElements = [];

    /* istanbul ignore next */
    if (showBoundingBoxes) {
        /* istanbul ignore next */
        var box = leoInstance.rect(bbox.x, bbox.y, bbox.width, bbox.height).setAttributes({
            fill: 'none',
            stroke: 'rgba(255, 0, 0, 0.5)',
            'stroke-width': 1,
            'stroke-dasharray': '4,2',
            class: 'leo-debug-bbox'
        });
        /* istanbul ignore next */
        debugElements.push(box);
    }

    /* istanbul ignore next */
    if (showCenterPoints) {
        /* istanbul ignore next */
        var cx = bbox.x + bbox.width / 2;
        /* istanbul ignore next */
        var cy = bbox.y + bbox.height / 2;
        /* istanbul ignore next */
        var center = leoInstance.circle(cx, cy, 3).setAttributes({
            fill: 'rgba(0, 255, 0, 0.5)',
            stroke: 'none',
            class: 'leo-debug-center'
        });
        /* istanbul ignore next */
        debugElements.push(center);
    }

    // Add to debug group
    /* istanbul ignore next */
    if (leoInstance._debugGroup && debugElements.length > 0) {
        /* istanbul ignore next */
        debugElements.forEach(function(el) {
            /* istanbul ignore next */
            leoInstance._debugGroup.append(el);
        });
    }

    /* istanbul ignore next */
    this._debugElements = debugElements;
};

/**
 * Remove debug mode
 *
 * @returns {L} - Returns the instance for chaining
 */
L.prototype.undebug = function() {
    if (this._debugGroup) {
        this._debugGroup.remove();
        this._debugGroup = null;
    }
    return this;
};

// Static versions
Leo.debug = L.debug = L.prototype.debug;
Leo.undebug = L.undebug = L.prototype.undebug;
