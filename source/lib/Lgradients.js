L.prototype.linearGradient = function(steps, x1, y1, x2, y2) {
    var defs = getDefs(this),
        id = lid(),
        linearGrad = new Element('linearGradient'),
        tmp,
        attrs = {
            id: id,
            x1: x1||'0%',
            y1: y1||'0%',
            x2: x2||'100%',
            y2: y2||'0%'
        };

    // if (rotate) {
    //     attrs.gradientTransform = 'rotate(' + rotate + ')'
    // }
    linearGrad.setAttributes(attrs);
    steps.forEach(function(step) {
        tmp = new Element('stop');
        var att = {
            offset: step.perc + '%',
            // style : 'stop-opacity:1;stop-color:' + steps[i],
            'stop-color': step.color
        };
        if ('style' in step) att.style = step.style;
        tmp.setAttributes(att);
        linearGrad.append(tmp)
    })
    defs.append(linearGrad);
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