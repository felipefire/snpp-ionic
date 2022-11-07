import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CohortePageRoutingModule } from './cohorte-routing.module';

import { CohortePage } from './cohorte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CohortePageRoutingModule
  ],
  declarations: [CohortePage]
})
export class CohortePageModule {}
