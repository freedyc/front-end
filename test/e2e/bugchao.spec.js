const {Builder, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://nav.bugchao.com');
    await driver.wait(until.titleIs('前端从这里开始'), 2000);
  } finally {
    await driver.quit();
  }
})();
