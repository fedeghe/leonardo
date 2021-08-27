var gradient_id = 0;

function lid() {
    gradient_id++;
    return 'leo_id_' + gradient_id;
}

function getDefs(instance) {
    if (!instance.defs) {
        instance.defs = new Element('defs');
        instance.append(instance.defs);
    }
    return instance.defs;
}

L.prototype.linearGradient = function(steps, rotate) {
    var defs = getDefs(this),
        id = lid(),
        linearGrad = new Element('linearGradient'),
        i, tmp,
        attrs = {
            id: id,
            x1: '0%',
            y1: '0%',
            x2: '100%',
            y2: '0%'
        };

    if (rotate) {
        attrs.gradientTransform = 'rotate(' + rotate + ')'
    }
    linearGrad.setAttributes(attrs);
    steps.forEach(function(step) {
        tmp = new Element('stop');
        var attrs = {
            offset: step.perc + '%',
            // style : 'stop-opacity:1;stop-color:' + steps[i],
            'stop-color': step.color
        };
        if ('style' in step) attrs.style = step.style;
        tmp.setAttributes(attrs);
        linearGrad.append(tmp)
    })
    this.defs.append(linearGrad);
    return 'url(#' + id + ')';
}

L.prototype.radialGradient = function radial(steps) {
    var defs = getDefs(this),
        id = lid(),
        radialGrad = new Element('radialGradient'),
        i, tmp;
    radialGrad.setAttributes({ id: id });

    steps.forEach(function(step) {
        tmp = new Element('stop');
        var attrs = {
            offset: step.perc + '%',
            // style : 'stop-opacity:1;stop-color:' + steps[i],
            'stop-color': step.color
        };
        if ('style' in step) attrs.style = step.style;
        tmp.setAttributes(attrs);
        radialGrad.append(tmp)
    })
    this.defs.append(radialGrad);
    return 'url(#' + id + ')';
}