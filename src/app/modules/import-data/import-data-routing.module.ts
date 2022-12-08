import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportFilesComponent } from './import-files';

const routes: Routes = [
  { path: '', component: ImportFilesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportDataRoutingModule {}
