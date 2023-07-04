
L.prototype.filter = function(filters) {
    getDefs(this)
    var id = lid(),
        filter = new Element('filter'),
        availables = [
            'feGaussianBlur', 'feDropShadow', 'feMorphology',
            'feDisplacementMap', 'feBlend', 'feColorMatrix',
            'feConvolveMatrix', 'feComponentTransfer', 'feSpecularLighting',
            'feDiffuseLighting', 'feFlood', 'feTurbulence',
            'feImage', 'feTile', 'feOffset',
            'feComposite','feMerge'
        ];
    filter.setAttributes({id: id});

    for(
        var i = 0, l = filters.length, f, inner = false;
        i < l;
        i++, inner = false
    ) {
        f = filters[i];
        if (availables.includes(f.type)){
            inner = new Element(f.type);
            inner.setAttributes(f.attrs);
        }

        filter.append(inner);
    }
    
    this.defs.append(filter);
    return filters.length ? 'url(#' + id + ')' : '';
}
