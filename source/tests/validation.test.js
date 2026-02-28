/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Validation', () => {

    describe('int', () => {      
        test.each([
            [1], [69], [3453], [3e3]
        ])('%i is int - positive',(a) => {
            var valid = Leo.validate.int(a);
            expect(valid).toBe(true);
        })

        test.each([
            ['ciao']
        ])('%i is int - negative',(a) => {
            expect(() => {
                Leo.validate.int(a);
            }).toThrow(Leo.ERRORS.validation_failed('int'))
        })
    });

    describe('positiveInt', () => {    
        
        test.each([
            [1], [69], [3453], [3e3]
        ])('%i is int - positive int',(a) => {
            var valid = Leo.validate.positiveInt(a);
            expect(valid).toBe(true);
        })

        test.each([
            [-34, 0, -23e4]
        ])('%i is int - negative int',(a) => {
            expect(() => {
                Leo.validate.positiveInt(a);
            }).toThrow(Leo.ERRORS.validation_failed('posInt'))
        })
    });

    describe('intp', () => {        
        test.each([
            ['1%']
        ])('%i is int perc',(a) => {
            var valid = Leo.validate.intp(a);
            expect(valid).toBe(true);
        })

        test.each([
            ['a%']
        ])('%o is int perc - negative',(a) => {
            expect(() => {
                Leo.validate.intp(a);
            }).toThrow(Leo.ERRORS.validation_failed('intp'))
        })
    });

    describe('positive', () => {        
        test.each([
            [1.22, 3.4443e4, Math.PI]
        ])('%i is positive',(a) => {
            var valid = Leo.validate.positive(a);
            expect(valid).toBe(true);
        })

        test.each([
            [-2]
        ])('%o is positive - negative',(a) => {
            expect(() => {
                Leo.validate.positive(a);
            }).toThrow(Leo.ERRORS.validation_failed('pos'))
        })
    });

    describe('array', () => {        
        test.each([
            [[1, 2, 3, 4]],
            [[]],
        ])('%a is array',(a) => {
            var valid = Leo.validate.array(a);
            expect(valid).toBe(true);
        })

        test.each([
            [{}],
            [1],
        ])('%o is array - negative',(a) => {
            expect(() => {
                Leo.validate.array(a);
            }).toThrow(Leo.ERRORS.array_expected)
        })
    });

    describe('objShape', () => {      

        test.each([
            [
                {a:1, name: 'fede', surname:'ghedina'},
                {a: 'number', name: 'string'}
            ]
        ])('positive', (a, b) => {
            var valid = Leo.validate.objShape(a, b);
            expect(valid).toBe(true);
        });

        test.each([
            [
                {a:1, name: 'fede'},
                {a: 'number', name: 'string', surname:'ghedina'}
            ]
        ])('negative',(a, b) => {
            expect(() => {
                Leo.validate.objShape(a, b);
            }).toThrow(Leo.ERRORS.validation_failed('objShape'));
        });


        test.each([
            [
                {name: 'fede', surname:'ghedina'},
                {"a?": 'number', name: 'string'}
            ]
        ])('positive optional',(a, b) => {
            var valid = Leo.validate.objShape(a, b);
            expect(valid).toBe(true);
        });

        test.each([
            [
                {a: 'fede', namer:'ghedina'},
                'string there'
            ],
            [
                'string there',
                {a: 'fede', namer:'ghedina'},
            ]
        ])('bad params', (a, b) => {
            expect(() => {
                Leo.validate.objShape(a, b);
            }).toThrow(Leo.ERRORS.validation_failed('objShape'));
        });
    });
})