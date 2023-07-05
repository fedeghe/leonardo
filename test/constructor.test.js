/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Constructor', () => {
    test('construct as expected', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*', title: 'stocazzo'});
        expect(L.tag.tagName).toBe('svg');
        const attrs = L.getAttributes(
            'xmlns','xmlns:svg','xmlns:cc','xmlns:dc',
            'xmlns:ev','xmlns:rdf','xmlns:xlink'
        );
        expect(attrs.xmlns).toBe('http://www.w3.org/2000/svg');
        expect(attrs['xmlns:svg']).toBe('http://www.w3.org/2000/svg');
        expect(attrs['xmlns:cc']).toBe('http://creativecommons.org/ns#');
        expect(attrs['xmlns:dc']).toBe('http://purl.org/dc/elements/1.1/');
        expect(attrs['xmlns:ev']).toBe('http://www.w3.org/2001/xml-events');
        expect(attrs['xmlns:rdf']).toBe('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
        expect(attrs['xmlns:xlink']).toBe('http://www.w3.org/1999/xlink');
    });

    describe('basic L instance methods', () => {
        it('<instance>.setAttributes', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*'});
            L.setAttributes({title: 'stocazzo', id:'69'});
            expect(L.tag.getAttribute('title')).toBe('stocazzo');
            expect(L.tag.getAttribute('id')).toBe('69');
        });

        it('<instance>.getAttributes', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*', title: 'stocazzo', id:'69'}),
                attrs = L.getAttributes('title', 'id');
            expect(attrs.title).toBe('stocazzo');
            expect(attrs.id).toBe('69');
        });

        it('<instance>.setStyles', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*'});
            L.setStyles({color: 'red', fontSize:'69px'});
            expect(L.tag.style.color).toBe('red');
            expect(L.tag.style.fontSize).toBe('69px');
        });

        it('<instance>.getStyles', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*'});
            let res;
            L.setStyles({color: 'red', fontSize: '69px'});
            
            res = L.getStyles('color', 'fontSize');
            expect(res.color).toBe('red');
            expect(res.fontSize).toBe('69px');
        });


        it('<instance>.append', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 10),
                c2 = L.circle(20, 20, 10),
                c3 = L.circle(30, 30, 10),
                c4 = L.circle(40, 40, 10),
                c5 = L.circle(50, 50, 10);
            L.append(c1, c2);
            L.append(c3, [c4, c5]);
            
            for(var i = 0, n; i < 5; i++) {
                n = (i+1)*10;
                expect(L.childs[i].tag.tagName).toBe('circle');
                expect(L.childs[i].getAttributes('cx', 'cy')).toMatchObject({cx: `${n}`, cy: `${n}`})
            }
            
        });
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