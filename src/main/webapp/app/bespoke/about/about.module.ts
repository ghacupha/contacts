import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ContactsSharedModule } from 'app/shared/shared.module';

/**
 * This module contains component for display of the about page
 */
@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, ContactsSharedModule],
  exports: [AboutComponent],
  entryComponents: [AboutComponent],
})
export class AboutModule {}
