import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContact, Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'jhi-contact-update',
  templateUrl: './contact-update.component.html',
})
export class ContactUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    contactName: [],
    department: [],
    telephoneExtension: [],
    phoneNumber: [],
  });

  constructor(protected contactService: ContactService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contact }) => {
      this.updateForm(contact);
    });
  }

  updateForm(contact: IContact): void {
    this.editForm.patchValue({
      id: contact.id,
      contactName: contact.contactName,
      department: contact.department,
      telephoneExtension: contact.telephoneExtension,
      phoneNumber: contact.phoneNumber,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contact = this.createFromForm();
    if (contact.id !== undefined) {
      this.subscribeToSaveResponse(this.contactService.update(contact));
    } else {
      this.subscribeToSaveResponse(this.contactService.create(contact));
    }
  }

  private createFromForm(): IContact {
    return {
      ...new Contact(),
      id: this.editForm.get(['id'])!.value,
      contactName: this.editForm.get(['contactName'])!.value,
      department: this.editForm.get(['department'])!.value,
      telephoneExtension: this.editForm.get(['telephoneExtension'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContact>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
