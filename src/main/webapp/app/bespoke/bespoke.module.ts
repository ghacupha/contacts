import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BespokeRoutingModule } from './bespoke-routing.module';
import { AboutModule } from './about/about.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BespokeRoutingModule, AboutModule],
})
export class BespokeModule {}
