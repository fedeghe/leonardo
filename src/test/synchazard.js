const { expect } = require('chai');
const { test } = require('./setup/browser');


describe('Synchazard', () => {
    it('should contain all used tags', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/synchazard/`);
        
        const checks = {
            g: 2,
            circle: 4,
            rect: 1,
            animate: 2,
            polygon: 1
        };
        let tmp = null;
        for (let tag in checks) {
            tmp = await page.$$eval(`svg ${tag}`, d => d.length);
            expect(tmp).to.be.equal(checks[tag]);
        }
    }));
});
