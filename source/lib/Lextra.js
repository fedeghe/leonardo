/*
L.prototype.textBox = function (txt, w, h, textAttrs) {
    var cnt = new Element('svg'),
        rect = new Element('rect'),
        text = new Element('text');
    rect.setAttributes({
        x : 0, y : 0,
        width: w, height: h,
        "stroke-width" : 0,
        stroke : 'transparent',
    });
    cnt.setAttributes({width : w, height : h});
    text.setAttributes({
        x: '50%',
        y: '50%',
        'dominant-baseline': 'middle',
        'text-anchor': 'middle'
    });
    textAttrs && text.setAttributes(textAttrs);
    text.tag.innerHTML = txt;
    cnt.append(rect, text);
    return cnt;
}
*/

/**
 * { function_description }
 *
 * @param      {string}   id      The identifier
 * @param      {<type>}   d       { parameter_description }
 * @param      {<type>}   cnt     The count
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.textPath = function (id, d, cnt) {
    var self = this,
        text = new Element('text'),
        defs = new Element('defs'),
        path = self.path(d),
        textpath = new Element('textPath');
    path.setAttributes({ id: id });
    textpath.tag.innerHTML = cnt;
    textpath.tag.setAttributeNS(namespaces.xlink, 'xlink:href', '#' + id);
    text.append(defs);
    text.append(textpath);
    defs.append(path);
    return text;
};


L.prototype.centeredText = function (w, h, text, attrs) {
    var ret = this.group(),
        id = lid(),
        path = new Element('path'),
        texte = new Element('text'),
        textPath = new Element('textPath');
    path.setAttributes({
        id: id,
        pathLength: w,
        d: 'M0 ' + h / 2 + 'h' + w,
        height: 0,
        "stroke-opacity": 0,
    })
    attrs = attrs || {}
    attrs.href = '#' + id;
    attrs['text-anchor'] = "middle";
    attrs['dominant-baseline'] = "middle"
    attrs.startOffset = w / 4;

    textPath.setAttributes(attrs)
    textPath.tag.innerHTML = text;
    texte.append(textPath);
    ret.append(path, texte);
    ret.updateText = function (t) { textPath.tag.innerHTML = t; }
    return ret;
}

L.prototype.arcCentered = function (cx, cy, r, from, to) {
    var p = new Element('path');
    p.setAttributes({ d: describeArc(cx, cy, r, from, to) });
    return p;
}

L.prototype.arcSection = function (cx, cy, r1, r2, from, to, vrs1, vrs2) {
    vrs1 = typeof vrs1 === 'undefined' ? 1 : vrs1;
    vrs2 = typeof vrs2 === 'undefined' ? 1 : vrs2;
    return this.path(
        this.pathBuild
            .M(cx + r1 * Math.cos(from), cy + r1 * Math.sin(from))
            .L(cx + r2 * Math.cos(from), cy + r2 * Math.sin(from))
            .A(
                r2, r2,
                0, 0, vrs1,
                cx + r2 * Math.cos(to), cy + r2 * Math.sin(to)
            )
            .L(cx + r1 * Math.cos(to), cy + r1 * Math.sin(to))
            .A(
                r1, r1,
                0, 0, vrs2,
                cx + r1 * Math.cos(from), cy + r1 * Math.sin(from)
            )
            .Z()
    );
};
