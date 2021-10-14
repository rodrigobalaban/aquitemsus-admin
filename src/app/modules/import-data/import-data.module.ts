import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportDataRoutingModule } from './import-data-routing.module';
import { ImportFilesComponent } from './import-files';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ImportFilesComponent],
  imports: [
    CommonModule,
    ImportDataRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class ImportDataModule {}
