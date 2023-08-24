var Leo = function (w, h, attrs) {
    if (!w || !h || w < 0 || h < 0) 
        throw new Error('width or height not given!');
    return new L(w, h, attrs);
};