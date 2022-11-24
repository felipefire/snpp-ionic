import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertController, IonicModule, ToastController } from '@ionic/angular';

import { ProyectosPageRoutingModule, } from './proyectos-routing.module';

import { ProyectosPage } from './proyectos.page';
import { FormularioProyectoComponent } from './formulario-proyecto/formulario-proyecto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectosPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProyectosPage, FormularioProyectoComponent],
  providers:[
    ToastController,
    AlertController
  ]
})
export class ProyectosPageModule {}