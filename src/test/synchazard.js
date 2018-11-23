const { expect } = require('chai');
const { test } = require('./setup/browser');


describe('Synchazard', () => {
    it('should contain all used tags', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/synchazard/`);
        
        const checks = {
            g: 7,
            circle: 13,
            rect: 3,
            animate: 6,
            polygon: 3
        };
        let tmp = null;
        for (let tag in checks) {
            tmp = await page.$$eval(`svg ${tag}`, d => d.length);
            expect(tmp).to.be.equal(checks[tag]);
        }
    }));
});
