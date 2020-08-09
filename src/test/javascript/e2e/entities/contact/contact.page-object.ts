import { element, by, ElementFinder } from 'protractor';

export class ContactComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contact div table .btn-danger'));
  title = element.all(by.css('jhi-contact div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ContactUpdatePage {
  pageTitle = element(by.id('jhi-contact-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  contactNameInput = element(by.id('field_contactName'));
  departmentInput = element(by.id('field_department'));
  telephoneExtensionInput = element(by.id('field_telephoneExtension'));
  phoneNumberInput = element(by.id('field_phoneNumber'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContactNameInput(contactName: string): Promise<void> {
    await this.contactNameInput.sendKeys(contactName);
  }

  async getContactNameInput(): Promise<string> {
    return await this.contactNameInput.getAttribute('value');
  }

  async setDepartmentInput(department: string): Promise<void> {
    await this.departmentInput.sendKeys(department);
  }

  async getDepartmentInput(): Promise<string> {
    return await this.departmentInput.getAttribute('value');
  }

  async setTelephoneExtensionInput(telephoneExtension: string): Promise<void> {
    await this.telephoneExtensionInput.sendKeys(telephoneExtension);
  }

  async getTelephoneExtensionInput(): Promise<string> {
    return await this.telephoneExtensionInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ContactDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contact-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contact'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
