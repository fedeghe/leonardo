const { expect } = require('chai');
const { test } = require('./setup/browser');
describe('Mondaine', () => {
    it('4 circle', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/mondaine/`);
        await page.screenshot({ path: 'test/mondaine.png' });
        await page.pdf({ path: 'test/hn.pdf', format: 'A4' });
        const divsCounts = await page.$$eval('circle', divs => divs.length);
        expect(divsCounts).to.be.equal(4);
    }));

    it('2 animate', test(async (browser, opts) => {
        const page = await browser.newPage();
        await page.goto(`${opts.appUrl}/demo/synchazard/`);
        await page.screenshot({ path: 'test/sh.png' });
        await page.pdf({ path: 'test/sh.pdf', format: 'A4' });
        const divsCounts = await page.$$eval('animate', divs => divs.length);
        expect(divsCounts).to.be.equal(2);
    }));
});

