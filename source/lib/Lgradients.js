
var getgradcmp = function (g) {
    return function(st) {
        var tmp = new Element('stop'),
            att = {
                offset: st.perc + '%',
                'stop-color': st.color
            };
        if ('style' in st) att.style = st.style;
        tmp.setAttributes(att);
        g.append(tmp)
    }
}
L.prototype.linearGradient = function(sts /* steps */, x1, y1, x2, y2) {
    var defs = getDefs(this),
        id = lid(),
        linearGrad = new Element('linearGradient'),
        attrs = {
            id: id,
            x1: x1||'0%',
            y1: y1||'0%',
            x2: x2||'100%',
            y2: y2||'0%'
        },
        stepper = getgradcmp(linearGrad);

    linearGrad.setAttributes(attrs);
    sts.forEach(stepper);
    defs.append(linearGrad);
    return 'url(#' + id + ')';
}

L.prototype.radialGradient = function radial(sts) {
    var defs = getDefs(this),
        id = lid(),
        radialGrad = new Element('radialGradient'),
        stepper = getgradcmp(radialGrad);
    radialGrad.setAttributes({ id: id });

    sts.forEach(stepper);
    defs.append(radialGrad);
    return 'url(#' + id + ')';
}