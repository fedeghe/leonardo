/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Utilities', () => {
    it('fadeOut', done => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*', target: document.body}),
            c = L.circle(50, 50, 10);
        L.append(c);
        L.render({
            cb: function () {
                L.fadeOut(1, c);
                setTimeout(function () {
                    expect(c.tag.getAttribute('style')).toBe('opacity: 0;')
                    expect(L.childs[0].tag.tagName).toBe('circle');
                    done();
                }, 100);   
            }
        });
    });

    it('fadeIn', done => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*', target: document.body}),
            c = L.circle(50, 50, 10);
        L.append(c);
        L.render({
            cb: function () {
                L.fadeIn(1, c);
                setTimeout(function () {
                    expect(c.tag.getAttribute('style')).toBe('opacity: 1;')
                    expect(L.childs[0].tag.tagName).toBe('circle');
                    done();
                }, 100);   
            }
        });
    });

    describe('downloadAnchor', () => {
        it('basic', done => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*', target: document.body}),
                c = L.circle(50, 50, 10);
            L.append(c);
            L.render({
                cb: function () {
                    const a = L.downloadAnchor('download this', 'xxx');
                    expect(a.tagName).toBe('A');
                    expect(a.textContent).toBe('download this');
                    expect(a.download).toBe('xxx.svg');
                    done();
                }
            });
        });
        it('default label and name', done => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {ns : '*', target: document.body}),
                c = L.circle(50, 50, 10);
            L.append(c);
            L.render({
                cb: function () {
                    const a = L.downloadAnchor();
                    expect(a.tagName).toBe('A');
                    expect(a.textContent).toBe('download');
                    expect(a.download).toBe('download.svg');
                    done();
                }
            });
        });
    });

    it('downloadHref', done => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*', target: document.body}),
            c = L.circle(50, 50, 10);
        L.append(c);
        L.render({
            cb: function () {
                const href = L.downloadHref();
                expect(href).toBe('data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewbox%3D%220%200%20200%20100%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aev%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2Fxml-events%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2210%22%2F%3E%3C%2Fsvg%3E');
                done();
            }
        });
    });

    it('positionInspector', done => {
        const width = 200,
            height = 200,
            L = Leo(width, height, { target: document.body}),
            p1 = L.circle(10, 10, 2),
            p2 = L.circle(50, 10, 2),
            p3 = L.circle(50, 50, 2),
            p4 = L.circle(10, 50, 2);


        L.render({
            cb: function () {                
                p1.trigger('click');
                p2.trigger('click');
                p3.trigger('click');
                p4.trigger('click');
                done();
            }
        }).positionInspector()
    })
});