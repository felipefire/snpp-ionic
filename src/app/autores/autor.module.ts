import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioAutorComponent } from './formulario-autor/formulario-autor.component';
import { IonicModule, AlertController, ToastController} from '@ionic/angular';

import { AutoresPageRoutingModule } from './autor-routing.module';

import { AutoresPage } from './autor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoresPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AutoresPage, FormularioAutorComponent],
  providers:[
    ToastController,
    AlertController
  ]
})
export class AutoresPageModule {}
{}
