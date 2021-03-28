const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('https://bugchao.com');
  await page.screenshot({ path: `bugchao-${Date.now()}.png` });
  await browser.close();
})();
