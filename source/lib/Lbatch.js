
/**
 * Batch multiple DOM operations to improve performance
 * Defers actual DOM updates until the end of the batch
 *
 * @param {Function} fn - Function containing operations to batch
 * @returns {L} - Returns the instance for chaining
 *
 * @example
 * L.batch(function() {
 *     circle.setAttributes({ cx: 100 });
 *     rect.setAttributes({ x: 50 });
 *     group.append(circle, rect);
 * });
 */
L.prototype.batch = function(fn) {
    // Store original append method
    var originalAppend = this.append;
    var self = this;
    var pendingAppends = [];

    // Override append to collect operations
    this.append = function() {
        var args = [].slice.call(arguments, 0);
        pendingAppends.push(args);
        return self;
    };

    // Execute the batch function
    try {
        fn.call(this);
    } finally {
        // Restore original append
        this.append = originalAppend;

        // Apply all pending appends in a document fragment
        if (pendingAppends.length > 0) {
            var fragment = document.createDocumentFragment();

            pendingAppends.forEach(function(args) {
                args.forEach(function(el) {
                    if (el instanceof Element) {
                        self.childs.push(el);
                        el.parent = self;
                        fragment.appendChild(el.tag);
                    }
                });
            });

            this.tag.appendChild(fragment);
        }
    }

    return this;
};

/**
 * Element-level batch for appending multiple children efficiently
 *
 * @param {Array} elements - Array of elements to append
 * @returns {Element} - Returns the element for chaining
 *
 * @example
 * group.batchAppend([circle1, circle2, rect1, rect2]);
 */
Element.prototype.batchAppend = function(elements) {
    var self = this;
    var fragment = document.createDocumentFragment();

    elements.forEach(function(el) {
        if (el instanceof Element) {
            self.childs.push(el);
            el.parent = self;
            fragment.appendChild(el.tag);
        }
    });

    this.tag.appendChild(fragment);
    return this;
};

// Static version
Leo.batch = L.batch = L.prototype.batch;
