/**
 * 
 * @param {*} txt 
 * @param {*} w 
 * @param {*} h 
 * @param {*} textAttrs 
 * @param {*} boxFill 
 * @returns 
 */
L.prototype.textBox = function (txt, w, h, textAttrs, boxFill) {
    var cnt = new Element('svg'),
        rect = new Element('rect'),
        text = new Element('text');
    rect.sas({
        x : 0, y : 0,
        width: w, height: h,
        "stroke-width" : 0,
        stroke : 'transparent',
        fill: boxFill || 'transparent'
    });
    
    cnt.sas({width : w, height : h});
    text.sas({
        x: '50%',
        y: '50%',
        'dominant-baseline': 'middle',
        'text-anchor': 'middle'
    });
    textAttrs && text.sas(textAttrs);
    text.tag.innerHTML = txt;
    cnt.append(rect, text);
    cnt.updateText = function (t) {
        text.tag.innerHTML = t;
    };
    return cnt;
}

/**
 * { function_description }
 *
 * @param      {<type>}   d       { parameter_description }
 * @param      {<type>}   cnt     The count
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.textPath = function (d, cnt) {
    var self = this,
        text = new Element('text'),
        defs = new Element('defs'),
        path = self.path(d),
        textpath = new Element('textPath'),
        id = lid();
    path.tag.setAttribute('id', id );
    textpath.tag.innerHTML = cnt;
    textpath.tag.setAttributeNS(namespaces.xlink, 'xlink:href', '#' + id);
    defs.append(path);
    text.append(defs, textpath);
    return text;
};


/**
 * 
 * @param {*} cx 
 * @param {*} cy 
 * @param {*} r 
 * @param {*} from 
 * @param {*} to 
 * @returns 
 */
L.prototype.arcCentered = function (cx, cy, r, from, to) {
    var p = new Element('path');
    p.tag.setAttribute('d', describeArc(cx, cy, r, from, to));
    return p;
}

/**
 * good only up to 180deg
 * 
 * @param {*} cx 
 * @param {*} cy 
 * @param {*} r1 
 * @param {*} r2 
 * @param {*} from 
 * @param {*} to 
 * @param {*} vrs1 
 * @param {*} vrs2 
 * @returns 
 */
L.prototype.arcSection = function (cx, cy, r1, r2, from, to, vrs1, vrs2) {
    vrs1 = typeof vrs1 === 'undefined' ? 1 : vrs1;
    vrs2 = typeof vrs2 === 'undefined' ? 0 : vrs2;
    var startOut = polarToCartesian(cx, cy, r2, from),
        endOut = polarToCartesian(cx, cy, r2, to),
        startIn = polarToCartesian(cx, cy, r1, to),
        endIn = polarToCartesian(cx, cy, r1, from);
    return this.path(
        this.pathBuild
            .M(endIn.x, endIn.y)
            .L(startOut.x, startOut.y)
            .A(
                r2, r2,
                0, 0, vrs1,
                endOut.x, endOut.y
            )
            .L(startIn.x, startIn.y)
            .A(
                r1, r1,
                0, 0, vrs2,
                endIn.x, endIn.y
            )
            .Z()
    );
};
