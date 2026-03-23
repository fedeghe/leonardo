
/**
 * Sets the viewBox attribute for the SVG
 *
 * @param {number} x - X coordinate of viewBox
 * @param {number} y - Y coordinate of viewBox
 * @param {number} width - Width of viewBox
 * @param {number} height - Height of viewBox
 * @returns {L} - Returns the instance for chaining
 *
 * @example
 * L.setViewBox(0, 0, 500, 500);
 */
L.prototype.setViewBox = function(x, y, width, height) {
    this.tag.setAttribute('viewBox', [x, y, width, height].join(' '));
    return this;
};

/**
 * Sets the preserveAspectRatio attribute
 *
 * @param {string} mode - Aspect ratio mode
 *   Alignment: 'xMinYMin', 'xMidYMin', 'xMaxYMin',
 *             'xMinYMid', 'xMidYMid', 'xMaxYMid',
 *             'xMinYMax', 'xMidYMax', 'xMaxYMax'
 *   Meet/Slice: 'meet' or 'slice'
 *   Or combine: 'xMidYMid meet' (default)
 * @returns {L} - Returns the instance for chaining
 *
 * @example
 * L.preserveAspectRatio('xMidYMid meet');
 * L.preserveAspectRatio('xMinYMin slice');
 */
L.prototype.preserveAspectRatio = function(mode) {
    this.tag.setAttribute('preserveAspectRatio', mode);
    return this;
};

/**
 * Converts screen coordinates to SVG coordinates
 *
 * @param {number} screenX - X coordinate in screen space
 * @param {number} screenY - Y coordinate in screen space
 * @returns {Object} - { x, y } in SVG coordinates
 *
 * @example
 * var svgPoint = L.screenToSVG(100, 200);
 */
/* istanbul ignore next */
L.prototype.screenToSVG = function(screenX, screenY) {
    /* istanbul ignore next */
    if (!this.tag.createSVGPoint) return { x: screenX, y: screenY };
    /* istanbul ignore next */
    var pt = this.tag.createSVGPoint();
    /* istanbul ignore next */
    pt.x = screenX;
    /* istanbul ignore next */
    pt.y = screenY;
    /* istanbul ignore next */
    var ctm = this.tag.getScreenCTM();
    /* istanbul ignore next */
    if (!ctm) return { x: screenX, y: screenY };
    /* istanbul ignore next */
    var svgP = pt.matrixTransform(ctm.inverse());
    /* istanbul ignore next */
    return { x: svgP.x, y: svgP.y };
};

/**
 * Converts SVG coordinates to screen coordinates
 *
 * @param {number} svgX - X coordinate in SVG space
 * @param {number} svgY - Y coordinate in SVG space
 * @returns {Object} - { x, y } in screen coordinates
 *
 * @example
 * var screenPoint = L.svgToScreen(50, 50);
 */
/* istanbul ignore next */
L.prototype.svgToScreen = function(svgX, svgY) {
    /* istanbul ignore next */
    var pt = this.tag.createSVGPoint();
    /* istanbul ignore next */
    pt.x = svgX;
    /* istanbul ignore next */
    pt.y = svgY;
    /* istanbul ignore next */
    var screenP = pt.matrixTransform(this.tag.getScreenCTM());
    /* istanbul ignore next */
    return { x: screenP.x, y: screenP.y };
};

/**
 * Gets the current viewBox values
 *
 * @returns {Object} - { x, y, width, height } or null if no viewBox
 */
L.prototype.getViewBox = function() {
    var viewBox = this.tag.getAttribute('viewBox');
    if (!viewBox) return null;
    var parts = viewBox.split(/\s+/).map(parseFloat);
    return {
        x: parts[0],
        y: parts[1],
        width: parts[2],
        height: parts[3]
    };
};

// Static versions
Leo.setViewBox = L.setViewBox = L.prototype.setViewBox;
Leo.preserveAspectRatio = L.preserveAspectRatio = L.prototype.preserveAspectRatio;
Leo.screenToSVG = L.screenToSVG = L.prototype.screenToSVG;
Leo.svgToScreen = L.svgToScreen = L.prototype.svgToScreen;
Leo.getViewBox = L.getViewBox = L.prototype.getViewBox;
