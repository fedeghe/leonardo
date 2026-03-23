
/**
 * Creates a pattern definition that can be used as fill or stroke
 *
 * @param {number} width - Pattern width
 * @param {number} height - Pattern height
 * @param {Element|Array} content - Element(s) to use as pattern content
 * @param {Object} options - Optional configuration
 * @param {string} options.id - Custom id for the pattern
 * @param {string} options.patternUnits - 'userSpaceOnUse' or 'objectBoundingBox' (default: 'userSpaceOnUse')
 * @param {string} options.patternTransform - Transform to apply to the pattern
 * @param {number} options.x - Pattern x offset
 * @param {number} options.y - Pattern y offset
 * @returns {string} - URL reference to use as fill or stroke
 *
 * @example
 * var pattern = L.pattern(20, 20,
 *     L.circle(10, 10, 5).setAttributes({ fill: 'red' }),
 *     { patternUnits: 'userSpaceOnUse' }
 * );
 * element.setAttributes({ fill: pattern });
 */
L.prototype.pattern = function(width, height, content, options) {
    options = options || {};
    var defs = getDefs(this),
        pattern = new Element('pattern'),
        patternId = options.id || lid();

    pattern.sas({
        id: patternId,
        width: width,
        height: height,
        x: options.x || 0,
        y: options.y || 0,
        patternUnits: options.patternUnits || 'userSpaceOnUse'
    });

    if (options.patternTransform) {
        pattern.sas({ patternTransform: options.patternTransform });
    }

    // Handle single element or array of elements
    /* istanbul ignore else */
    if (content instanceof Array) {
        content.forEach(function(el) {
            pattern.append(el);
        });
    } else if (content) {
        pattern.append(content);
    }

    defs.append(pattern);
    return 'url(#' + patternId + ')';
};

// Static version
Leo.pattern = L.pattern = L.prototype.pattern;
