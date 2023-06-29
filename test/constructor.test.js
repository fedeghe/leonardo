/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Constructor', () => {
    test('construct as expected', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*'});
        expect(L.tag.tagName).toBe('svg');
        expect(L.tag.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
        expect(L.tag.getAttribute('xmlns:svg')).toBe('http://www.w3.org/2000/svg');
        expect(L.tag.getAttribute('xmlns:cc')).toBe('http://creativecommons.org/ns#');
        expect(L.tag.getAttribute('xmlns:dc')).toBe('http://purl.org/dc/elements/1.1/');
        expect(L.tag.getAttribute('xmlns:ev')).toBe('http://www.w3.org/2001/xml-events');
        expect(L.tag.getAttribute('xmlns:rdf')).toBe('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
        expect(L.tag.getAttribute('xmlns:xlink')).toBe('http://www.w3.org/1999/xlink');
    });

    test('throws as expected', () => {
        [[0,0], [0,1], [1,0]].forEach(p => {
            try{
                Leo(p[0], p[1], {ns : '*'});
            } catch(e) {
                expect(e.message).toBe('width or height not given!')
                expect(e.constructor.name).toBe('Error')
            }
        })
    });
});