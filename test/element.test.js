/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('Element', () => {
    describe('clone', () => {
        it('clone single', () => {
            
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5).setAttributes({fill: '#ff0000', id:1}),
                c2 = c1.clone().setAttributes({fill: '#00ff00', id:2});
            L.append(c1, c2);
            expect(L.childs[0].getAttributes('fill').fill).toBe('#ff0000');
            expect(L.childs[0].getAttributes('id').id).toBe('1');
            expect(L.childs[1].getAttributes('fill').fill).toBe('#00ff00');
            expect(L.childs[1].getAttributes('id').id).toBe('2');
        });

        it('clone tree', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                g1 = L.group(),
                c1 = L.circle(10, 10, 5).setAttributes({fill: '#ff0000', id:1}),
                c2 = c1.clone().setAttributes({fill: '#00ff00', id:2});
            g1.append(c1, c2);
            const g2 = g1.clone()
            L.append(g1, g2);
            expect(L.childs[0].tag.tagName).toBe('g');
            expect(L.childs[0].childs[0].getAttributes('fill').fill).toBe('#ff0000');
            expect(L.childs[0].childs[0].getAttributes('id').id).toBe('1');
            expect(L.childs[0].childs[1].getAttributes('fill').fill).toBe('#00ff00');
            expect(L.childs[0].childs[1].getAttributes('id').id).toBe('2');

            expect(L.childs[1].tag.tagName).toBe('g');
            expect(L.childs[1].childs[0].getAttributes('fill').fill).toBe('#ff0000');
            expect(L.childs[1].childs[0].getAttributes('id').id).toBe('1');
            expect(L.childs[1].childs[1].getAttributes('fill').fill).toBe('#00ff00');
            expect(L.childs[1].childs[1].getAttributes('id').id).toBe('2');
            
            // as one can clearly witness here, leonardo allows you to mess up with the id's
            // and when cloning an element containing id's does not take any action to ensure unicity
        });
    });

    describe('use', () => {
        it('use single', () => {
            
            const width = 200,
                height = 100,
                id = 1,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5).setAttributes({fill: '#ff0000', id}),
                c2 = c1.use().move(20, 20).setAttributes({fill: '#00ff00'});
            L.append(c1, c2);
            // expect(L.tag).toBe('')
            expect(L.childs[0].getAttributes('cx').cx).toBe('10');
            expect(L.childs[0].getAttributes('fill').fill).toBe('#ff0000');
            
            expect(L.childs[1].getAttributes('href').href).toBe(`#${id}`);
            expect(L.childs[1].getAttributes('fill').fill).toBe('#00ff00');
            
        });
        it('use throws if used on tag with no id', () => {
            
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.circle(10, 10, 5).setAttributes({fill: '#ff0000'});
            try {
                c1.use();
            } catch(e) {
                expect(e.message).toBe('You can use use only on tags having an id attribute');
                expect(e.constructor.name).toBe('Error');
            }
        });
    });

    describe('rotate', () => {
        it('with center', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15)
                    .setAttributes({fill: '#ff0000', id:1})
                    .rotate(90, 15, 15)
            L.append(c1);
            expect(L.childs[0].getAttributes('transform').transform).toMatch(/rotate\(90\s15\s15\)/);
        });
        it('without center', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15)
                    .setAttributes({fill: '#ff0000', id:1})
                    .rotate(90)
            L.append(c1);
            expect(L.childs[0].getAttributes('transform').transform).toMatch(/rotate\(90\s0\s0\)/);
        });
    });

    describe('scale', () => {
        it('with full', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15)
                    .setAttributes({fill: '#ff0000', id:1})
                    .scale(1.2, 0.8)
            L.append(c1);
            expect(L.childs[0].getAttributes('transform').transform).toMatch(/scale\(1.2,\s0.8\)/);
        });
        it('one', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15)
                    .setAttributes({fill: '#ff0000', id:1})
                    .scale(1.2)
            L.append(c1);
            expect(L.childs[0].getAttributes('transform').transform).toMatch(/scale\(1.2,\s1.2\)/);
        });
        it('none', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15)
                    .setAttributes({fill: '#ff0000', id:1})
                    .scale()
            L.append(c1);
            expect(L.childs[0].getAttributes('transform').transform).toMatch(/scale\(0,\s0\)/);
        });
    });

    
    it('mirrorH', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            c1 = L.rect(10, 10, 5, 15)
                .setAttributes({fill: '#ff0000', id:1})
                .mirrorH()
        L.append(c1);
        expect(L.childs[0].getAttributes('transform').transform).toMatch(/scale\(1,\s-1\)/);
    });

    it('mirrorV', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            c1 = L.rect(10, 10, 5, 15)
                .setAttributes({fill: '#ff0000', id:1})
                .mirrorV()
        L.append(c1);
        expect(L.childs[0].getAttributes('transform').transform).toMatch(/scale\(-1,\s1\)/);
    });

    describe('move', () => {
        it('with center', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15)
                    .move(90, 15)
            L.append(c1);
            expect(L.childs[0].getAttributes('transform').transform).toMatch(/translate\(90\s15\)/);
        });
        it('nowhere', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15)
                    .setAttributes({fill: '#ff0000', id:1})
                    .move()
            L.append(c1);
            expect(L.childs[0].getAttributes('transform').transform).toMatch(/translate\(0\s0\)/);
        });
    });

    describe('remove', () => {
        it('self', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15);
            L.append(c1);
            expect(L.childs[0].tag.tagName).toBe('rect');
            c1.remove();
            expect(L.childs.length).toBe(0);
        });
        it('parent', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15),
                c2 = L.rect(20, 10, 5, 15),
                c3 = L.rect(30, 10, 5, 15);
            L.append(c1, c2, c3);
            expect(L.childs[0].tag.tagName).toBe('rect');
            expect(L.childs.length).toBe(3);
            L.remove(c1, c2);
            expect(L.childs.length).toBe(1);
        });
        it('from tag - multiple', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                g = L.group(),
                c1 = L.rect(10, 10, 5, 15),
                c2 = L.rect(20, 10, 5, 15),
                c3 = L.rect(30, 10, 5, 15);
            g.append(c1, c2, c3);
            expect(g.childs[0].tag.tagName).toBe('rect');
            expect(g.childs.length).toBe(3);
            g.remove(c1, c2);
            expect(g.childs.length).toBe(1);
        });
    });

    describe('bringToTop', () => {
        it('base', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15),
                c2 = L.rect(5, 5, 5, 15);
            L.append(c1, c2);
            expect(L.tag.children[0].getAttribute('x')).toBe("10");
            c1.bringToTop();
            expect(L.childs.length).toBe(2);
            expect(L.tag.children[0].getAttribute('x')).toBe("5");
        });
    });

    describe('bringToBottom', () => {
        it('base', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15),
                c2 = L.rect(5, 5, 5, 15);
            L.append(c1, c2);
            expect(L.tag.children[0].getAttribute('x')).toBe("10");
            c2.bringToBottom();
            // expect(L.tag).toBe('');
            expect(L.childs.length).toBe(2);
            expect(L.tag.children[0].getAttribute('x')).toBe("5");
        });
    });
    describe('bringTo', () => {
        it('+', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15),
                c2 = L.rect(5, 5, 5, 15);
            L.append(c1, c2);
            expect(L.tag.children[0].getAttribute('x')).toBe("10");
            c1.bringTo(1);
            expect(L.childs.length).toBe(2);
            expect(L.tag.children[0].getAttribute('x')).toBe("5");
        });
        it('-', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15),
                c2 = L.rect(5, 5, 5, 15);
            L.append(c1, c2);
            expect(L.tag.children[0].getAttribute('x')).toBe("10");
            c2.bringTo(-1);
            // expect(L.tag).toBe('');
            expect(L.childs.length).toBe(2);
            expect(L.tag.children[0].getAttribute('x')).toBe("5");
        });
    });

    describe('timeout', done => {
        it('base', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height),
                c1 = L.rect(10, 10, 5, 15);
            L.append(c1);
            c1.timeout(function (){
                expect(this.getAttributes('x').x).toBe("10");
                done()
            }, 100);
        });
    });

    it('clear', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            g = L.group();
            c1 = L.rect(10, 10, 5, 15);
        g.append(c1);
        L.append(g);
        
        expect(g.childs.length).toBe(1);
        expect(g.tag.children.length).toBe(1);
        g.clear();
        expect(g.childs.length).toBe(0);
        expect(g.tag.children.length).toBe(0);
    });

    it('base', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height),
            g = L.group(),
            circle1 = L.circle(10, 10, 5),
            circle2 = L.circle(10, 10, 5),
            rect = L.rect(10, 10, 5, 15);

        g.append(circle1, circle2);
        L.append(g);
        
        expect(g.childs.length).toBe(2);
        expect(g.childs[0].tag.tagName).toBe('circle');
        g.replace(circle1, rect)
        expect(g.childs.length).toBe(2);
        expect(g.childs[0].tag.tagName).toBe('rect');
    });
});