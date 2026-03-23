
/**
 * Creates an arc path data string for a circular arc between two points
 *
 * @param {number} x1 - Starting x coordinate
 * @param {number} y1 - Starting y coordinate
 * @param {number} x2 - Ending x coordinate
 * @param {number} y2 - Ending y coordinate
 * @param {number} radius - Radius of the arc
 * @param {number} largeArc - 0 for small arc, 1 for large arc (default: 0)
 * @param {number} sweep - 0 for clockwise, 1 for counter-clockwise (default: 1)
 * @returns {string} - Path data string
 *
 * @example
 * var arc = L.arc(0, 50, 100, 50, 50); // Half-circle arc
 * element.setAttributes({ d: arc });
 */
L.prototype.arc = function(x1, y1, x2, y2, radius, largeArc, sweep) {
    largeArc = typeof largeArc === 'undefined' ? 0 : largeArc;
    sweep = typeof sweep === 'undefined' ? 1 : sweep;
    return 'M ' + x1 + ',' + y1 + ' A ' + radius + ',' + radius + ' 0 ' + largeArc + ',' + sweep + ' ' + x2 + ',' + y2;
};

/**
 * Creates a smooth curve path through a series of points using spline interpolation
 *
 * @param {Array} points - Array of [x, y] coordinates
 * @param {boolean} closed - Whether to close the path (default: false)
 * @returns {string} - Path data string
 *
 * @example
 * var path = L.smoothCurveThroughPoints([[0,0], [50,100], [100,0], [150,50]]);
 * element.setAttributes({ d: path });
 */
L.prototype.smoothCurveThroughPoints = function(points, closed) {
    if (!points || points.length < 2) return '';
    if (points.length === 2) {
        return 'M ' + points[0][0] + ',' + points[0][1] + ' L ' + points[1][0] + ',' + points[1][1];
    }

    var d = 'M ' + points[0][0] + ',' + points[0][1];

    // Calculate control points for smooth curves
    for (var i = 0; i < points.length - 1; i++) {
        var p0 = points[i === 0 ? 0 : i - 1];
        var p1 = points[i];
        var p2 = points[i + 1];
        var p3 = points[i + 2] || p2;

        var cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        var cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        var cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        var cp2y = p2[1] - (p3[1] - p1[1]) / 6;

        d += ' C ' + cp1x + ',' + cp1y + ' ' + cp2x + ',' + cp2y + ' ' + p2[0] + ',' + p2[1];
    }

    if (closed) {
        d += ' Z';
    }

    return d;
};

/**
 * Get the total length of a path element
 *
 * @param {Element} pathElement - A path element
 * @returns {number} - Total length of the path
 *
 * @example
 * var path = L.path('M0,0 L100,100');
 * var len = L.getTotalLength(path);
*/
/* istanbul ignore next */
L.prototype.getTotalLength = function(pathElement) {
    if (!pathElement || !pathElement.tag) return 0;
    return pathElement.tag.getTotalLength ? pathElement.tag.getTotalLength() : 0;
};

/**
 * Get a point at a specific distance along a path
 *
 * @param {Element} pathElement - A path element
 * @param {number} distance - Distance along the path
 * @returns {Object} - { x, y } coordinates or null
 *
 * @example
 * var path = L.path('M0,0 L100,100');
 * var point = L.getPointAtLength(path, 50);
 */
/* istanbul ignore next */
L.prototype.getPointAtLength = function(pathElement, distance) {
    if (!pathElement || !pathElement.tag || !pathElement.tag.getPointAtLength)  return null;
    var pt = pathElement.tag.getPointAtLength(distance);
    return { x: pt.x, y: pt.y };
};

// Static versions
Leo.arc = L.arc = L.prototype.arc;
Leo.smoothCurveThroughPoints = L.smoothCurveThroughPoints = L.prototype.smoothCurveThroughPoints;
Leo.getTotalLength = L.getTotalLength = L.prototype.getTotalLength;
Leo.getPointAtLength = L.getPointAtLength = L.prototype.getPointAtLength;
