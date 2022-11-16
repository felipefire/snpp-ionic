import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FormularioCohorteComponent } from './formulario-cohorte/formulario-cohorte.component';
import { CohortePageRoutingModule } from './cohorte-routing.module';

import { CohortePage } from './cohorte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CohortePageRoutingModule,
    FormularioCohorteComponent
  ],
  declarations: [CohortePage, FormularioCohorteComponent],
  providers:[
    ToastController,
    AlertController
  ]
})
export class CohortePageModule {}
