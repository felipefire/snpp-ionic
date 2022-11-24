import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertController, IonicModule, ToastController } from '@ionic/angular';

import { TecnicaturasPageRoutingModule } from './tecnicaturas-routing.module';
import { FormularioTecnicaturasComponent } from './formulario-tecnicaturas/formulario-tecnicaturas.component';
import { TecnicaturasPage } from './tecnicaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TecnicaturasPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TecnicaturasPage,FormularioTecnicaturasComponent],
  providers: [
    ToastController,
    AlertController
  ]
})
export class TecnicaturasPageModule {}
