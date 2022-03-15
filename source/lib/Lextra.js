
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
