import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoresPage } from './autor.page';

const routes: Routes = [
  {
    path: '',
    component: AutoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoresPageRoutingModule {}
