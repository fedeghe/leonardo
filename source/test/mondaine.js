const { expect } = require('chai');
const { test } = require('./setup/browser');

/**
 * 
 */
const timestamp2degs = (ts) => {
    ts = ts || new Date;
    const  ms = ts.getMilliseconds() / 1000,
        s = ts.getSeconds(),
        m = ts.getMinutes(),
        h = ts.getHours() % 12,
        secs = s + m * 60 + h * 3600 + ms;
    return {
        h: secs / 120,// (secs / 3600) * 30,
        m: (secs % 3600) / 10,// ((secs % 3600) / 60) * 6,
        s: (secs % 60) * 6
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
            g: 5,
            stop: 12,
        };
        let tmp = null;
        for (let tag in checks) {
            tmp = await page.$$eval(`svg ${tag}`, d => d.length);
            expect(tmp).to.be.equal(checks[tag]);
        }
    }));

    it('should render properly the current time', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/mondaine/`);
        const hours = await page.$eval('svg g#hours', s => s.getAttribute('transform').match(/rotate\(([^\s]*)\s([^\s]*)\s([^\s]*)\)/)),
            minutes = await page.$eval('svg g#minutes', s => s.getAttribute('transform').match(/rotate\(([^\s]*)\s([^\s]*)\s([^\s]*)\)/)),
            seconds = await page.$eval('svg g#seconds', s => s.getAttribute('transform').match(/rotate\(([^\s]*)\s([^\s]*)\s([^\s]*)\)/)),
            nowDegs = timestamp2degs(),
            diffs = {
                h: Math.abs(hours[1] - nowDegs.h),
                m: Math.abs(minutes[1] - nowDegs.m),
                s: Math.abs(seconds[1] - nowDegs.s)
            };

        // some tolerance, more on seconds
        expect(diffs.h).to.be.within(0, 1);
        expect(diffs.m).to.be.within(0, 1);
        expect(diffs.s).to.be.within(0, 5);
    }));
});

