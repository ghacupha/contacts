import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactComponentsPage, ContactDeleteDialog, ContactUpdatePage } from './contact.page-object';

const expect = chai.expect;

describe('Contact e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contactComponentsPage: ContactComponentsPage;
  let contactUpdatePage: ContactUpdatePage;
  let contactDeleteDialog: ContactDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contacts', async () => {
    await navBarPage.goToEntity('contact');
    contactComponentsPage = new ContactComponentsPage();
    await browser.wait(ec.visibilityOf(contactComponentsPage.title), 5000);
    expect(await contactComponentsPage.getTitle()).to.eq('contactsApp.contact.home.title');
    await browser.wait(ec.or(ec.visibilityOf(contactComponentsPage.entities), ec.visibilityOf(contactComponentsPage.noResult)), 1000);
  });

  it('should load create Contact page', async () => {
    await contactComponentsPage.clickOnCreateButton();
    contactUpdatePage = new ContactUpdatePage();
    expect(await contactUpdatePage.getPageTitle()).to.eq('contactsApp.contact.home.createOrEditLabel');
    await contactUpdatePage.cancel();
  });

  it('should create and save Contacts', async () => {
    const nbButtonsBeforeCreate = await contactComponentsPage.countDeleteButtons();

    await contactComponentsPage.clickOnCreateButton();

    await promise.all([
      contactUpdatePage.setContactNameInput('contactName'),
      contactUpdatePage.setDepartmentInput('department'),
      contactUpdatePage.setTelephoneExtensionInput('telephoneExtension'),
      contactUpdatePage.setPhoneNumberInput('phoneNumber'),
    ]);

    expect(await contactUpdatePage.getContactNameInput()).to.eq('contactName', 'Expected ContactName value to be equals to contactName');
    expect(await contactUpdatePage.getDepartmentInput()).to.eq('department', 'Expected Department value to be equals to department');
    expect(await contactUpdatePage.getTelephoneExtensionInput()).to.eq(
      'telephoneExtension',
      'Expected TelephoneExtension value to be equals to telephoneExtension'
    );
    expect(await contactUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');

    await contactUpdatePage.save();
    expect(await contactUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Contact', async () => {
    const nbButtonsBeforeDelete = await contactComponentsPage.countDeleteButtons();
    await contactComponentsPage.clickOnLastDeleteButton();

    contactDeleteDialog = new ContactDeleteDialog();
    expect(await contactDeleteDialog.getDialogTitle()).to.eq('contactsApp.contact.delete.question');
    await contactDeleteDialog.clickOnConfirmButton();

    expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
