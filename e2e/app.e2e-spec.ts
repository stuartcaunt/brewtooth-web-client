import { BrewtoothClientPage } from './app.po';

describe('brewtooth-client App', () => {
  let page: BrewtoothClientPage;

  beforeEach(() => {
    page = new BrewtoothClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
