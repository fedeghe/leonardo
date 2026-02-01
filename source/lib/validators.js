L.validators = {
    num : function (v) {
        return !isNaN(parseFloat(v)) && isFinite(v);
    },
    objShape : function (v, shape) {
        if (typeof v !== 'object') return false;
        for(var k in v){
            if(!(k in shape)) return false;
            if(typeof v[k] !== shape[k]) return false;
        }
        return true;
    }
};
function validate (f, validator, opts) {
    if (!(validator in L.validators)) throw ERRORS.not_found_validator_type(validator);
    var isValid = L.validators[validator](f, opts);
    if (!isValid) throw ERRORS.validation_failed(validator);
    return true;
}