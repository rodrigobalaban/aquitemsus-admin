import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportDataRoutingModule } from './import-data-routing.module';
import { ImportFilesComponent } from './import-files';


@NgModule({
  declarations: [
    ImportFilesComponent
  ],
  imports: [
    CommonModule,
    ImportDataRoutingModule
  ]
})
export class ImportDataModule { }
