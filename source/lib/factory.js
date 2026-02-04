var Leo = function (w, h, attrs) {
    // if (!w || !h || w < 0 || h < 0) 
    //     throw ERRORS.factory_invalid_params;
    validate.positiveInt(w);
    validate.positiveInt(h);
    return new L(w, h, attrs);
};