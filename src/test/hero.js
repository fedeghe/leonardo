const { expect } = require('chai');
const { test } = require('./setup/browser');

describe('Hero', () => {
    it('should contain all used tags', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/hero/`);
        const checks = {
            title: 1,
            g: 3,
            path: 11,
            text: 3,
            circle: 4,
            line: 4
        };
        let tmp = null;
        for (let tag in checks) {
            tmp = await page.$$eval(`svg ${tag}`, d => d.length);
            expect(tmp).to.be.equal(checks[tag]);
        }
    }));
});
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


