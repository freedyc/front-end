const { webkit } = require('playwright');
const path = require('path');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('https://bugchao.com');
  const date = new Date();
  const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDay() + 1}-${date.getTime()}`
  console.log(__dirname);
  await page.screenshot({ path: path.join(__dirname,'../../snapshot', `bugchao-${time}.png`) });
  await browser.close();
})();
