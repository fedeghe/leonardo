/**
 * @jest-environment jsdom
 */
const Leo = require('../dist');

describe('events', () => {    
    it('Element.on ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {target: document.body}),
            c = L.circle(10, 10, 5),
            fn = jest.fn();
        L.append(c).render();
        c.on('click', fn);
        c.trigger('click');
        expect(fn).toHaveBeenCalled();
    });

    describe('Element.off ', () => {
        it('one specific', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {target: document.body}),
                c = L.circle(10, 10, 5),
                fn = jest.fn();
            L.append(c).render();
            c.on('click', fn);
            c.off('click', fn);
            c.trigger('click');
            expect(fn).not.toHaveBeenCalled();
        });
        it('all', () => {
            const width = 200,
                height = 100,
                L = Leo(width, height, {target: document.body}),
                c = L.circle(10, 10, 5),
                fn1 = jest.fn(),
                fn2 = jest.fn();
            L.append(c).render();
            c.on('click', fn1);
            c.on('click', fn2);
            c.off('click');
            c.trigger('click');
            expect(fn1).not.toHaveBeenCalled();
            expect(fn2).not.toHaveBeenCalled();
        });
    });

    it('Element.once ', () => {
        const width = 200,
            height = 100,
            L = Leo(width, height, {target: document.body}),
            c = L.circle(10, 10, 5),
            fn = jest.fn();
        L.append(c).render();
        c.once('click', fn);
        c.trigger('click');
        expect(fn).toHaveBeenCalledTimes(1);
        c.trigger('click');
        expect(fn).toHaveBeenCalledTimes(1);
    });

});