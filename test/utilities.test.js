/**
 * @jest-environment jsdom
 */
const jext = require('@jest/globals');
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

    it('dataEncoded', done => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*', target: document.body}),
            c = L.circle(50, 50, 10);
        L.append(c);
        L.render({
            cb: function () {
                const href = L.dataEncoded();
                expect(href).toBe('data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewbox%3D%220%200%20200%20100%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aev%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2Fxml-events%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Amath%3D%22http%3A%2F%2Fwww.w3.org%2F1998%2FMath%2FMathML%22%20xmlns%3Axhtml%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%20xmlns%3Axml%3D%22http%3A%2F%2Fwww.w3.org%2FXML%2F1998%2Fnamespace%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2210%22%2F%3E%3C%2Fsvg%3E');
                done();
            }
        });
    });

    it('toImageTag', done => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {ns : '*', target: document.body}),
            c = L.circle(50, 50, 10);
        L.append(c);
        L.render({
            cb: function () {
                const href = L.dataEncoded();
                expect(href).toBe('data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewbox%3D%220%200%20200%20100%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aev%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2Fxml-events%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Amath%3D%22http%3A%2F%2Fwww.w3.org%2F1998%2FMath%2FMathML%22%20xmlns%3Axhtml%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%20xmlns%3Axml%3D%22http%3A%2F%2Fwww.w3.org%2FXML%2F1998%2Fnamespace%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2210%22%2F%3E%3C%2Fsvg%3E');
                done();
            }
        });
        const img1 = L.toImageTag('myTit1'),
            img2 = L.toImageTag('myTit2', 'myAlt2'),
            img3 = L.toImageTag(false, 'myAlt3');
        img1.setAttribute('id', 'img1');
        img2.setAttribute('id', 'img2');
        img3.setAttribute('id', 'img3');
        document.body.append(img1);
        document.body.append(img2);
        document.body.append(img3);
        expect(img1.src).toBe('data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewbox%3D%220%200%20200%20100%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aev%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2Fxml-events%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Amath%3D%22http%3A%2F%2Fwww.w3.org%2F1998%2FMath%2FMathML%22%20xmlns%3Axhtml%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%20xmlns%3Axml%3D%22http%3A%2F%2Fwww.w3.org%2FXML%2F1998%2Fnamespace%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2210%22%2F%3E%3C%2Fsvg%3E');
        expect(img2.src).toBe('data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewbox%3D%220%200%20200%20100%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aev%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2Fxml-events%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Amath%3D%22http%3A%2F%2Fwww.w3.org%2F1998%2FMath%2FMathML%22%20xmlns%3Axhtml%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%20xmlns%3Axml%3D%22http%3A%2F%2Fwww.w3.org%2FXML%2F1998%2Fnamespace%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2210%22%2F%3E%3C%2Fsvg%3E');
        expect(img3.src).toBe('data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewbox%3D%220%200%20200%20100%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aev%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2Fxml-events%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Amath%3D%22http%3A%2F%2Fwww.w3.org%2F1998%2FMath%2FMathML%22%20xmlns%3Axhtml%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%20xmlns%3Axml%3D%22http%3A%2F%2Fwww.w3.org%2FXML%2F1998%2Fnamespace%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2210%22%2F%3E%3C%2Fsvg%3E');
        expect(img1.getAttribute('title')).toBe('myTit1');
        expect(img1.getAttribute('alt')).toBe('');
        expect(img2.getAttribute('title')).toBe('myTit2');
        expect(img2.getAttribute('alt')).toBe('myAlt2');
        expect(img3.getAttribute('title')).toBe('');
        expect(img3.getAttribute('alt')).toBe('myAlt3');
    });

    

    describe('positionInspector', () => {
        it('positionInspector with tpl, cb and group', () => {
            const width = 200,
                height = 200,
                L = Leo(width, height, { target: document.body}),
                tpl = 'x:{x}|y:{y}|rx:{rx}|ry:{ry}|px:{%x}|py:{%y}',
                tracerGroup = L.group(),
                overrideStylePath = {
                    stroke: '#123456',
                    'stroke-width': 3
                }
                svgCb = jest.fn();
            let cbCalls = 0,
                cbCurves;
            

            function clickAt(x, y) {
                L.tag.dispatchEvent(new MouseEvent('mousemove', {
                    bubbles: true,
                    clientX: x,
                    clientY: y
                }));
                L.tag.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                    clientX: x,
                    clientY: y
                }));
            }

            L.render();
            L.positionInspector({
                tpl,
                cb: function (curves) {
                    cbCalls++;
                    cbCurves = curves;
                },
                svgCb,
                tracerGroup,
                overrideStylePath
            });

            clickAt(10, 10);
            expect(svgCb).not.toHaveBeenCalled();
            clickAt(50, 10);
            expect(svgCb).toHaveBeenCalledTimes(1);
            clickAt(50, 50);
            clickAt(10, 50);
            expect(svgCb).toHaveBeenCalledTimes(3);

            expect(cbCalls).toBe(4);
            expect(cbCurves.length).toBe(1);
            expect(cbCurves[0].length).toBe(4);
            expect(cbCurves[0][0].x).toBe(10);
            expect(cbCurves[0][0].y).toBe(10);
            expect(cbCurves[0][0].rx).toBe(10);
            expect(cbCurves[0][0].ry).toBe(10);
            expect(cbCurves[0][0]['%x']).toBe(5);
            expect(cbCurves[0][0]['%y']).toBe(5);
            expect(cbCurves[0][1].x).toBe(50);
            expect(cbCurves[0][1].y).toBe(10);
            expect(cbCurves[0][1].rx).toBe(40);
            expect(cbCurves[0][1].ry).toBe(0);
            expect(cbCurves[0][1]['%x']).toBe(25);
            expect(cbCurves[0][1]['%y']).toBe(5);
            expect(tracerGroup.tag.tagName).toBe('g');
            expect(tracerGroup.childs.length).toBe(1);
            expect(tracerGroup.childs[0].tag.tagName).toBe('path');
            expect(tracerGroup.childs[0].getAttributes('stroke').stroke).toBe('#123456');
            expect(tracerGroup.childs[0].getAttributes('stroke-width')['stroke-width']).toBe('3');
        });
        it('positionInspector can only be invoked after render', () => {
            const width = 200,
                height = 200,
                L = Leo(width, height, { target: document.body});
            expect(() => {
                L.positionInspector();
                L.render();
            }).toThrow('"positionInspector" is meant to be invoked ONLY after render');
        });
    });

    describe('positionCruncher', () => {
        it('basic', () => {
            const width = 200,
                height = 200,
                L = Leo(width, height, { target: document.body}),
                fillStyle = {
                    "stroke-width": 2,
                    "stroke": '#ef88d8',
                    "stroke-opacity": 1,
                    "fill-opacity": 10,
                    "stroke-linejoin": "round",
                    fill: 'transparent'
                },
                cruncher = L.positionCruncher(width, height, fillStyle),
                crunchedPath = cruncher([
                    [10,10], [20,20], [40,40], [50,50]
                ]),
                crunched0 = cruncher();


            expect(crunched0).toBeUndefined();
            expect(crunchedPath.tag.tagName).toBe('path');
            expect(crunchedPath.getAttributes('d').d).toBe("M20,20l40,40 80,80 100,100");
        });
        it('with and', () => {
            const width = 200,
                height = 200,
                L = Leo(width, height, { target: document.body}),
                fillStyle = {
                    "stroke-width": 2,
                    "stroke": '#ef88d8',
                    "stroke-opacity": 1,
                    "stroke-linejoin": "round",
                    fill: 'transparent'
                },
                cruncher = L.positionCruncher(width, height, fillStyle, true),
                crunchedPath = cruncher([
                    [10,10], [20,20], [40,40], [50,50]
                ]);


            expect(crunchedPath.tag.tagName).toBe('path');
            expect(crunchedPath.getAttributes('d').d).toBe("M20,20l40,40 80,80 100,100Z");
        });
    });

    describe('bezierThroughPoints', () => {
        it('basic', () => {
            const width = 200,
                height = 200,
                L = Leo(width, height, { target: document.body}),
                bezierPath = L.bezierThroughPoints([
                    [10,10], [20,20], [40,40], [50,50]
                ]),
                bezierPath2 = L.bezierThroughPoints([
                    [10,10]
                ]); 
            expect(bezierPath.tag.tagName).toBe('path');
            expect(bezierPath.getAttributes('d').d).toBe("M10,10 C11.67,11.67 15,15 20,20 C25,25 35,35 40,40 C45,45 48.33,48.33 50,50");
            expect(bezierPath2).toEqual([]);
        });
        it('also with just two points', () => {
            const width = 200,
                height = 200,
                L = Leo(width, height, { target: document.body}),
                bezierPath = L.bezierThroughPoints([
                    [10,10], [20,20]
                ]);
            expect(bezierPath.tag.tagName).toBe('path');
            expect(bezierPath.getAttributes('d').d).toBe("M10,10 C13.33,13.33 16.67,16.67 20,20");
        });
    });
});
