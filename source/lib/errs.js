var ERRORS = {
    no_target: new Error('Target not set'),
    validation_failed : function(type) {return new Error('Validation failed for ' + type);},
    factory_invalid_params : new Error('Invalid parameters for factory function'),
    dom_node_expected: new Error('Dom node expected'),
    undefined : new Error('undefined not expected'),
    'null' : new Error('null not expected'),
    array_expected: new Error('array expected'),
    even_numbers_expected: new Error('even number of integers expected')
}