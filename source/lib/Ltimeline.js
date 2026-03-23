
/**
 * Timeline for chaining and sequencing animations
 *
 * @class Timeline
 * @param {Object} options - Timeline options
 * @param {boolean} options.autoPlay - Whether to start playing immediately (default: false)
 */
function Timeline(options) {
    options = options || {};
    this.animations = [];
    this.isPlaying = false;
    this.currentIndex = 0;
    this.startTime = null;
    this.autoPlay = options.autoPlay || false;
    this.onComplete = options.onComplete || null;
}

/**
 * Add an animation to the timeline
 *
 * @param {Function} animation - Animation function that returns a stopper
 * @param {number} offset - Time offset in seconds (0 = immediately, 1 = after 1s)
 * @returns {Timeline} - Returns this for chaining
 *
 * @example
 * var tl = L.timeline()
 *     .add(function() { return element.animate.attr({...}); }, 0)
 *     .add(function() { return element2.animate.attr({...}); }, 1);
 */
Timeline.prototype.add = function(animation, offset) {
    this.animations.push({
        animation: animation,
        offset: offset || 0,
        started: false,
        stopper: null
    });
    return this;
};

/**
 * Start playing the timeline
 *
 * @returns {Timeline}
 */
Timeline.prototype.play = function() {
    if (this.isPlaying) return this;
    this.isPlaying = true;
    this.startTime = Date.now();
    this.tick();
    return this;
};

/**
 * Pause the timeline
 *
 * @returns {Timeline}
 */
Timeline.prototype.pause = function() {
    this.isPlaying = false;
    // Stop all running animations
    this.animations.forEach(function(anim) {
        if (anim.stopper) {
            anim.stopper();
        }
    });
    return this;
};

/**
 * Stop the timeline and reset to beginning
 *
 * @returns {Timeline}
 */
Timeline.prototype.stop = function() {
    this.pause();
    this.currentIndex = 0;
    this.animations.forEach(function(anim) {
        anim.started = false;
        anim.stopper = null;
    });
    return this;
};

/**
 * Internal tick function
 * @private
 */
Timeline.prototype.tick = function() {
    if (!this.isPlaying) return;

    var self = this;
    var elapsed = (Date.now() - this.startTime) / 1000;
    var allComplete = true;

    this.animations.forEach(function(anim, index) {
        if (!anim.started && elapsed >= anim.offset) {
            anim.started = true;
            anim.stopper = anim.animation();
        }
        if (!anim.started) {
            allComplete = false;
        }
    });

    if (allComplete && this.onComplete) {
        this.onComplete();
    } else if (this.isPlaying) {
        requestAnimationFrame(function() { self.tick(); });
    }
};

/**
 * Create a new timeline
 *
 * @param {Object} options - Timeline options
 * @returns {Timeline}
 *
 * @example
 * var tl = L.timeline()
 *     .add(function() {
 *         return circle.animate.withEasing({...});
 *     }, 0)
 *     .add(function() {
 *         return rect.animate.withEasing({...});
 *     }, 0.5)
 *     .play();
 */
L.prototype.timeline = function(options) {
    return new Timeline(options);
};

// Static version
Leo.timeline = L.timeline = L.prototype.timeline;
