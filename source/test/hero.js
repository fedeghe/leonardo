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
