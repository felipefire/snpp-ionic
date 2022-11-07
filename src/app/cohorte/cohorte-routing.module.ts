import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CohortePage } from './cohorte.page';

const routes: Routes = [
  {
    path: '',
    component: CohortePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CohortePageRoutingModule {}
