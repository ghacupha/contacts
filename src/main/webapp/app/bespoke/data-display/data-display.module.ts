import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataDisplayRoutingModule } from './data-display-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsSharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ContactsSharedModule, DataDisplayRoutingModule],
  exports: [],
})
export class DataDisplayModule {}
