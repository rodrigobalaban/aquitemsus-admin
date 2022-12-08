import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form';
import { UserListComponent } from './user-list';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'novo', component: UserFormComponent },
  { path: ':id', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
