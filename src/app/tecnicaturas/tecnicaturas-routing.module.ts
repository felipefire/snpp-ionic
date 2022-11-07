import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TecnicaturasPage } from './tecnicaturas.page';

const routes: Routes = [
  {
    path: '',
    component: TecnicaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TecnicaturasPageRoutingModule { }
