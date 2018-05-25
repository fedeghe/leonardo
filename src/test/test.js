const { expect } = require('chai');
const { test } = require('./setup/browser');


const timestamp2degs = () => {
    const ts = new Date,
        ms = ts.getMilliseconds() / 1000,
        s = ts.getSeconds(),
        m = ts.getMinutes(),
        h = ts.getHours() % 12,
        secs = s + m * 60 + h * 3600 + ms,
        degs = {
            h: secs / 3600,
            m: (secs % 3600 ) / 60,
            s: secs % 60
        };
    return {
        h: degs.h * 30,
        m: degs.m * 6,
        s: degs.s * 6
    };
};



describe('Mondaine', () => {

    it('should contain all used tags', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/mondaine/`);
        // await page.screenshot({ path: 'test/mondaine.png' });
        // await page.pdf({ path: 'test/hn.pdf', format: 'A4' });
        const checks = {
            circle: 4,
            image: 1,
            text: 2,
            textPath: 1,
            polygon: 2,
            path: 1,
            defs: 2,
            line: 61,
            radialGradient: 2,
            linearGradient: 1,
            g: 3,
            stop: 12,
        };
        let tmp = null;
        for (let tag in checks) {
            tmp = await page.$$eval(tag, d => d.length);
            expect(tmp).to.be.equal(checks[tag]);
        }
    }));

    it('should render properly the time', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/mondaine/`);
        const seconds = await page.$eval('g#seconds', s => s.getAttribute('transform').match(/rotate\(([^\s]*)\s([^\s]*)\s([^\s]*)\)/)),
            minutes = await page.$eval('polygon#minutes', s => s.getAttribute('transform').match(/rotate\(([^\s]*)\s([^\s]*)\s([^\s]*)\)/)),
            hours = await page.$eval('polygon#hours', s => s.getAttribute('transform').match(/rotate\(([^\s]*)\s([^\s]*)\s([^\s]*)\)/)),
            nowDegs = timestamp2degs(),
            diffs = {
                h: Math.abs(hours[1] - nowDegs.h),
                m: Math.abs(minutes[1] - nowDegs.m),
                s: Math.abs(seconds[1] - nowDegs.s)
            };

        // some tolerance, more on seconds
        expect(diffs.h).to.be.within(0, 1);
        expect(diffs.m).to.be.within(0, 1);
        expect(diffs.s).to.be.within(0, 12);
    }));
});


// describe('Synchazard', () => {
//     it('2 animate', test(async (browser, opts) => {
//         const page = await browser.newPage();
//         await page.goto(`${opts.appUrl}/demo/synchazard/`);
//         await page.screenshot({ path: 'test/sh.png' });
//         await page.pdf({ path: 'test/sh.pdf', format: 'A4' });
//         const divsCounts = await page.$$eval('animate', divs => divs.length);
//         expect(divsCounts).to.be.equal(2);
//         const groups = await page.$$eval('g', divs => divs.length);
//         expect(groups).to.be.equal(2);
//     }));
// });
// describe('Hero', () => {
//     it('2 animate', test(async (browser, opts) => {
//         const page = await browser.newPage();
//         await page.goto(`${opts.appUrl}/demo/synchazard/`);
//         await page.screenshot({ path: 'test/sh.png' });
//         await page.pdf({ path: 'test/sh.pdf', format: 'A4' });
//         const divsCounts = await page.$$eval('animate', divs => divs.length);
//         expect(divsCounts).to.be.equal(2);
//         const groups = await page.$$eval('g', divs => divs.length);
//         expect(groups).to.be.equal(2);
//     }));
// });
// describe('Malta', () => {
//     it('2 animate', test(async (browser, opts) => {
//         const page = await browser.newPage();
//         await page.goto(`${opts.appUrl}/demo/synchazard/`);
//         await page.screenshot({ path: 'test/sh.png' });
//         await page.pdf({ path: 'test/sh.pdf', format: 'A4' });
//         const divsCounts = await page.$$eval('animate', divs => divs.length);
//         expect(divsCounts).to.be.equal(2);
//         const groups = await page.$$eval('g', divs => divs.length);
//         expect(groups).to.be.equal(2);
//     }));
// });
// describe('playground', () => {
//     it('2 animate', test(async (browser, opts) => {
//         const page = await browser.newPage();
//         await page.goto(`${opts.appUrl}/demo/synchazard/`);
//         await page.screenshot({ path: 'test/sh.png' });
//         await page.pdf({ path: 'test/sh.pdf', format: 'A4' });
//         const divsCounts = await page.$$eval('animate', divs => divs.length);
//         expect(divsCounts).to.be.equal(2);
//         const groups = await page.$$eval('g', divs => divs.length);
//         expect(groups).to.be.equal(2);
//     }));
// });
// describe('understand', () => {
//     it('2 animate', test(async (browser, opts) => {
//         const page = await browser.newPage();
//         await page.goto(`${opts.appUrl}/demo/synchazard/`);
//         await page.screenshot({ path: 'test/sh.png' });
//         await page.pdf({ path: 'test/sh.pdf', format: 'A4' });
//         const divsCounts = await page.$$eval('animate', divs => divs.length);
//         expect(divsCounts).to.be.equal(2);
//         const groups = await page.$$eval('g', divs => divs.length);
//         expect(groups).to.be.equal(2);
//     }));
// });


