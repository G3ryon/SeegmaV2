describe('First batch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a logo screen', async () => {
    await waitFor(element(by.id('Logo'))).toBeVisible().withTimeout(5000);
  });
  it('should have a button screen', async () => {
    await waitFor(element(by.id('butt'))).toBeVisible().withTimeout(5000);
  });
  it('should have a input screen', async () => {
    await waitFor(element(by.id('input'))).toBeVisible().withTimeout(5000);
  });
  it('should have a second button screen', async () => {
    await waitFor(element(by.id('butt2'))).toBeVisible().withTimeout(5000);
  });
  /*
  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('hello_button')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });*/
});
