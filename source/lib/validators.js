L.validators = {
    int : function (v) {
        if(isNaN(v)) return false;
        var n = parseFloat(v);
        return !isNaN(parseFloat(v)) && isFinite(v) && n === v;
    },

    // v can contain something that is not in the shape
    // anyway all the fields in shape must be present in v
    // and the types must match
    objShape: function (v, shape) {
        if (typeof v !== 'object' || typeof shape !== 'object') return false;
        for (var key in shape) {
            // if key ends with ? then it is optional to have that on v
            var isOptional = false,
                k = key;
            if (key.slice(-1) === '?') {
                isOptional = true;
                k = k.slice(0, -1);
            }
            if (!isOptional || (isOptional && v.hasOwnProperty(k))) {
                if (typeof v[k] !== shape[k]) return false;
            }
        }
        return true;        
    },
    array: function (v){ return Array.isArray(v); }
};
var validate = {
    // defined : function (e) {
    //     if(typeof e === 'undefined') throw ERRORS.undefined;
    //     return true;
    // },
    // notNull : function (e) {
    //     if(e === null) throw ERRORS.null;
    //     return true;
    // },
    // isNode : function (node) {
    //     if (!(node instanceof Element)) throw ERRORS.dom_node_expected;
    //     return true;
    // },
    int : function (n) {
        var isValid = L.validators.int(n);
        if (!isValid) throw ERRORS.validation_failed('int');
        return true;
    },
    intp : function (n) {
        var np = parseInt(n.replace(/(\%)$/, ''), 10),
            isValid = L.validators.int(np);
        if (!isValid) throw ERRORS.validation_failed('intp');
        return true;
    },
    positive : function (n) {
        if (n <= 0) throw ERRORS.validation_failed('pos');
        return true;
    },
    positiveInt: function (n){
        var isInt = L.validators.int(n),
            isPositive = n > 0;
        if(!isInt || !isPositive) throw ERRORS.validation_failed('posInt')
        return true;
    },
    objShape : function (v, shape) {
        var isValid = L.validators.objShape(v, shape);
        if (!isValid) throw ERRORS.validation_failed('objShape');
        return true;
    },
    array: function(v) {
        if(!L.validators.array(v)) throw ERRORS.array_expected
        return true;
    },
    evenNumbers: function (a){
        var l = a.length,
            lengthOk = l % 2 === 0,
            allNumbers = a.every(function (n){return validate.int(n)})
        if(!lengthOk || !allNumbers) throw ERRORS.even_numbers_expected;
        return true;
    }
}
