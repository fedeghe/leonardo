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
	path.setAttributes({id : id});
	textpath.tag.innerHTML = cnt;
	textpath.tag.setAttributeNS(namespaces.xlink, 'xlink:href', '#' + id);
	text.append(defs);
	text.append(textpath);
	defs.append(path);
	return text;
};


L.prototype.centeredText = function(w, h, text, attrs) {
    var ret = this.group(),
        id = lid(),
        path = new Element('path'),
        texte = new Element('text'),
        textPath = new Element('textPath');
    path.setAttributes({
        id: id,
        pathLength: w/2,
        d: 'M0 ' + h/2 + 'h' + w,
    })
    attrs = attrs || {}
    attrs.href = '#' + id;
    attrs['text-anchor']="middle";
    attrs['dominant-baseline']="middle"
    attrs.startOffset= w/4;

    textPath.setAttributes(attrs)
    textPath.tag.innerHTML = text;
    texte.append(textPath);
    ret.append(path, texte);
    return ret;
}
