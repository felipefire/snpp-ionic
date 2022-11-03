import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoresPageRoutingModule } from './autor-routing.module';

import { AutorPage } from './autor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoresPageRoutingModule,
    AutorPage,
  ],
  declarations: [AutorPage]
})
export class AutorPageModule {}