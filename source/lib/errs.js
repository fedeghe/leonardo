var ERRORS = {
    odd_number_of_points : new Error('Odd number of points for polygon'),
    not_found_validator_type : function(type) {return new Error('Validator ' + type + ' not found');},
    validation_failed : function(type) {return new Error('Validation failed for ' + type);},
    factory_invalid_params : new Error('Invalid parameters for factory function')
}