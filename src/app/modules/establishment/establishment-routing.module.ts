import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablishmentFormComponent } from './establishment-form';
import { EstablishmentListComponent } from './establishment-list';

const routes: Routes = [
  { path: '', component: EstablishmentListComponent },
  { path: 'novo', component: EstablishmentFormComponent },
  { path: ':id', component: EstablishmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablishmentRoutingModule {}
