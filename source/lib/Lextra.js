/**
 * 
 * @param {*} txt 
 * @param {*} w 
 * @param {*} h 
 * @param {*} textAttrs 
 * @param {*} boxFill 
 * @returns 
 */
Leo.textBox = L.prototype.textBox = function (txt, w, h, textAttrs, boxAttrs, rot) {
    var cnt = new Element('svg'),
        rect = new Element('rect'),
        text = new Element('text'),
        boxA = {
            x : 0, y : 0,
            width: w, height: h,
            "stroke-width" : 0,
            stroke : 'transparent',
            fill:'transparent'
        };
    rect.sas(Object.assign({}, boxA, boxAttrs));
    cnt.sas({width : w, height : h, viewBox: [0, 0, w, h].join(' ')});
    text.sas({
        x: '50%',
        y: '50%',
        'dominant-baseline': 'middle',
        'text-anchor': 'middle'
    });
    if(rot) text.rotate(rot, w/2, h/2);
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
 * @param      {<type>}   cnt     The content
 * @return     {Element}  { description_of_the_return_value }
 */
Leo.textPath = L.prototype.textPath = function (d, cnt) {
    var text = new Element('text'),
        defs = new Element('defs'),
        path = L.path(d),
        textpath = new Element('textPath'),
        id = lid();
    path.tag.setAttribute('id', id );
    textpath.tag.textContent = cnt;
    textpath.tag.setAttributeNS(namespaces.xlink, 'xlink:href', '#' + id);
    defs.append(path);
    text.append(defs, textpath);
    text.updateText = function(t) {
		textpath.tag.textContent = t;
	};
    return text;
};

/**
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
Leo.arcSectionPath = L.prototype.arcSectionPath = function (cx, cy, r1, r2, from, to, vrs1, vrs2) {
    vrs1 = typeof vrs1 === 'undefined' ? 1 : vrs1;
    vrs2 = typeof vrs2 === 'undefined' ? 0 : vrs2;
    var startOut = polarToCartesian(cx, cy, r2, from),
        endOut = polarToCartesian(cx, cy, r2, to),
        startIn = polarToCartesian(cx, cy, r1, to),
        endIn = polarToCartesian(cx, cy, r1, from),
        ref = Math.abs(to-from) > 180 ? 1: 0;
    return L.pathBuild
        .M(endIn.x, endIn.y)
        .L(startOut.x, startOut.y)
        .A(
            r2, r2,
            0, ref, vrs1,
            endOut.x, endOut.y
        )
        .L(startIn.x, startIn.y)
        .maybe(r1>0 , 'A', [
            r1, r1,
            0, ref, vrs2,
            endIn.x, endIn.y
        ])
        .Z().toString();
};
