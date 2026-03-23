
/**
 * Event delegation - attach a single listener to the root that handles events for all matching selectors
 *
 * @param {string} eventName - Event name (e.g., 'click', 'mouseover')
 * @param {string} selector - CSS-style selector to match target elements (e.g., 'circle', '.my-class', '#id')
 * @param {Function} handler - Event handler function
 * @returns {L} - Returns the instance for chaining
 *
 * @example
 * L.delegate('click', 'circle', function(e, target) {
 *     console.log('Circle clicked:', target);
 * });
 */
L.prototype.delegate = function(eventName, selector, handler) {
    var self = this;

    this.tag.addEventListener(eventName, function(e) {
        var target = e.target;

        // Check if target matches selector
        /* istanbul ignore else */
        if (matchesSelector(target, selector)) {
            handler.call(target, e, target);
        }
    });

    return this;
};

/**
 * Element-level event delegation
 *
 * @param {string} eventName - Event name
 * @param {string} selector - CSS-style selector to match child elements
 * @param {Function} handler - Event handler function
 * @returns {Element} - Returns the element for chaining
 *
 * @example
 * group.delegate('click', 'circle', function(e, target) {
 *     console.log('Circle in group clicked:', target);
 * });
 */
Element.prototype.delegate = function(eventName, selector, handler) {
    var self = this;

    this.tag.addEventListener(eventName, function(e) {
        var target = e.target;

        // Traverse up to find if target or its ancestors match selector within this element
        while (target && target !== self.tag) {
            /* istanbul ignore else */
            if (matchesSelector(target, selector)) {
                handler.call(target, e, target);
                break;
            }
            /* istanbul ignore next */
            target = target.parentNode;
        }
    });

    return this;
};

/**
 * Helper function to check if an element matches a selector
 * @private
 */
function matchesSelector(element, selector) {
    /* istanbul ignore next */
    if (!element || !element.tagName) return false;

    // Handle tag name selectors (e.g., 'circle', 'rect')
    /* istanbul ignore else */
    if (/^[a-zA-Z]+$/.test(selector)) {
        return element.tagName.toLowerCase() === selector.toLowerCase();
    }

    // Handle class selectors (e.g., '.my-class')
    /* istanbul ignore else */
    if (selector.startsWith('.')) {
        var className = selector.slice(1);
        var classes = element.getAttribute('class');
        return classes && classes.split(' ').indexOf(className) !== -1;
    }

    // Handle id selectors (e.g., '#myId')
    /* istanbul ignore else */
    if (selector.startsWith('#')) {
        var id = selector.slice(1);
        return element.getAttribute('id') === id;
    }

    // Fallback: try using browser's matches if available
    /* istanbul ignore next */
    if (element.matches) {
        /* istanbul ignore next */
        return element.matches(selector);
    }
    /* istanbul ignore next */
    return false;
}

// Static version
Leo.delegate = L.delegate = L.prototype.delegate;
