import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EstablishmentRoutingModule } from './establishment-routing.module';
import { EstablishmentFormComponent } from './establishment-form';
import { EstablishmentListComponent } from './establishment-list';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    EstablishmentListComponent,
    EstablishmentFormComponent
  ],
  imports: [
    CommonModule,
    EstablishmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule    
  ]
})
export class EstablishmentModule { }
