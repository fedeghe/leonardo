
/**
 * Creates a mask definition that can be applied to elements
 *
 * @param {string|Element} id - Optional id for the mask, or first element
 * @param {...Element} elements - Elements to include in the mask
 * @returns {string} - URL reference to use in setAttributes({ mask: ... })
 *
 * @example
 * var mask = L.mask(
 *     L.rect(0, 0, 100, 100).setAttributes({ fill: 'white' }),
 *     L.circle(50, 50, 30).setAttributes({ fill: 'black' })
 * );
 * element.setAttributes({ mask: mask });
 */
L.prototype.mask = function(id) {
    var args = [].slice.call(arguments, 0),
        defs = getDefs(this),
        mask = new Element('mask'),
        maskId,
        elements;

    // Check if first argument is an element (has _id property) or a string ID
    if (id && typeof id === 'string' && !id._id) {
        maskId = id;
        elements = args.slice(1);
    } else {
        maskId = lid();
        elements = args;
    }

    mask.sas({ id: maskId });
    elements.forEach(function(el) {
        if (el && el._id) {
            mask.append(el);
        }
    });
    defs.append(mask);
    return 'url(#' + maskId + ')';
};

/**
 * Creates a clipPath definition that can be applied to elements
 *
 * @param {string|Element} id - Optional id for the clipPath, or first element
 * @param {...Element} elements - Elements defining the clip path
 * @returns {string} - URL reference to use in setAttributes({ 'clip-path': ... })
 *
 * @example
 * var clip = L.clipPath(
 *     L.circle(50, 50, 40)
 * );
 * element.setAttributes({ 'clip-path': clip });
 */
L.prototype.clipPath = function(id) {
    var args = [].slice.call(arguments, 0),
        defs = getDefs(this),
        clipPath = new Element('clipPath'),
        clipId,
        elements;

    // Check if first argument is an element (has _id property) or a string ID
    if (id && typeof id === 'string' && !id._id) {
        clipId = id;
        elements = args.slice(1);
    } else {
        clipId = lid();
        elements = args;
    }

    clipPath.sas({ id: clipId });
    elements.forEach(function(el) {
        if (el && el._id) {
            clipPath.append(el);
        }
    });
    defs.append(clipPath);
    return 'url(#' + clipId + ')';
};

// Static versions
Leo.mask = L.mask = L.prototype.mask;
Leo.clipPath = L.clipPath = L.prototype.clipPath;
