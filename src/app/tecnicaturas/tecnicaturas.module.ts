import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TecnicaturasPageRoutingModule } from './tecnicaturas-routing.module';

import { TecnicaturasPage } from './tecnicaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TecnicaturasPageRoutingModule
  ],
  declarations: [TecnicaturasPage]
})
export class TecnicaturasPageModule {}
