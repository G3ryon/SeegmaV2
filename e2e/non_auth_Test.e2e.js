describe('SignUp Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a sign up screen', async () => {
    await waitFor(element(by.id('logo'))).toBeVisible().withTimeout(5000);
    await element(by.id('register_Button')).tap();
    await waitFor(element(by.id('logo_Register'))).toBeVisible().withTimeout(5000);

  });

  it('should have a return button to come back to login', async () => {
    await waitFor(element(by.id('logo'))).toBeVisible().withTimeout(5000);
    await element(by.id('register_Button')).tap();
    await waitFor(element(by.id('logo_Register'))).toBeVisible().withTimeout(5000);
    await element(by.id('return_Button')).tap();
    await waitFor(element(by.id('logo'))).toBeVisible().withTimeout(5000);
  });
  
  it('should be able to sign up', async () => {
    await waitFor(element(by.id('logo'))).toBeVisible().withTimeout(5000);
    await element(by.id('register_Button')).tap();
    await waitFor(element(by.id('logo_Register'))).toBeVisible().withTimeout(5000);
    await element(by.id('email')).typeText('juju_beber@gmail.com');
    await element(by.id('username')).typeText('beber');
    await element(by.id('password1')).typeText('123457891A');
    await element(by.id('password2')).typeText('123457891A\n');
    await expect(element(by.id(`sub_Button`))).toBeVisible()
  });

  
});

describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a Welcome screen', async () => {
    await waitFor(element(by.id('logo'))).toBeVisible().withTimeout(5000);
  });
  
  it('should not be able to login because the password is too short', async () => {
    await waitFor(element(by.id('loginID'))).toBeVisible().withTimeout(5000);
    await element(by.id('loginID')).typeText('juju_beberrrr');
    await element(by.id('password')).typeText('12345');
    await element(by.id('login_Button')).tap();

    await waitFor(element(by.id('loginID'))).toBeVisible().withTimeout(5000);
  });

  it('should not be able to login because there is no username', async () => {
    await waitFor(element(by.id('loginID'))).toBeVisible().withTimeout(5000);
    await element(by.id('password')).typeText('123456789');
    await element(by.id('login_Button')).tap();

    await waitFor(element(by.id('loginID'))).toBeVisible().withTimeout(5000);
  });

  it('should login successfully', async () => {
    await waitFor(element(by.id('loginID'))).toBeVisible().withTimeout(5000);
    await element(by.id('loginID')).typeText('juju_beberrrr');
    await element(by.id('password')).typeText('123456789');
    await element(by.id('login_Button')).tap();

    await waitFor(element(by.text('Home'))).toBeVisible().withTimeout(5000);
  });
});


