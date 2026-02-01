var Leo = function (w, h, attrs) {
    if (!w || !h || w < 0 || h < 0) 
        throw ERRORS.factory_invalid_params;
    validate(w, 'num');
    validate(h, 'num');
    return new L(w, h, attrs);
};