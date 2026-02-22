
var getGradStepper = function (g) {
        return function(st) {
            var tmp = new Element('stop'),
                att = {
                    offset: st.perc + '%',
                    'stop-color': st.color
                };
            if ('style' in st) att.style = st.style;
            tmp.sas(att);
            g.append(tmp)
        }
    },
    distributeColors = function(colors) {
        var step = 100 / (colors.length-1);
        return colors.map(function (c, i) {
            return { perc: i * step, color: c };
        });
    };

/**
 * 
 * Appends to defs a linear gradient with the given steps and coordinates, and return the url to use as fill or stroke.
 * 
 * @param {*} sts 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns 
 */
L.prototype.linearGradient = function(sts, opts) {
    opts = opts || {};
    var steps = isString(sts[0]) ? distributeColors(sts) : sts,
        defs = getDefs(this),
        id = lid(),
        linearGrad = new Element('linearGradient'),
        attrs = {
            id: id,
            x1: opts.x1 || '0%',
            y1: opts.y1 || '0%',
            x2: opts.x2 || '100%',
            y2: opts.y2 || '0%',
            spreadMethod: opts.spreadMethod || 'pad' // pad | reflect | repeat
        },
        stepper = getGradStepper(linearGrad);

    linearGrad.sas(attrs);
    steps.forEach(stepper);
    defs.append(linearGrad);
    return 'url(#' + id + ')';
}

/**
 * Appends to defs a radial gradient with the given steps and coordinates, and return the url to use as fill or stroke.
 * 
 * @param {*} sts 
 * @returns 
 * cx cy end point
 * fr radius of start circle
 * fx fy start point
 * r radius of end circle
 * spreadMethod: pad | reflect | repeat
 */
L.prototype.radialGradient = function radial(sts, opts) {
    opts = opts || {};
    var steps = isString(sts[0]) ? distributeColors(sts) : sts,
        defs = getDefs(this),
        id = lid(),
        radialGrad = new Element('radialGradient'),
        stepper = getGradStepper(radialGrad);
    radialGrad.sas({
        'id': id,
        'fx': opts.fx || '50%',
        'fy': opts.fy || '50%',
        'fr': opts.fr || '0%',
        'cx': opts.cx || '50%',
        'cy': opts.cy || '50%',
        'r': opts.r || '50%',
        spreadMethod: opts.spreadMethod || 'pad' // pad | reflect | repeat
    });

    steps.forEach(stepper);
    defs.append(radialGrad);
    return 'url(#' + id + ')';
}

