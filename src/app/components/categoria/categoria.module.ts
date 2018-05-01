import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaService } from './service/categoria.service';
import { MzModalModule, MzValidationModule, MzInputModule } from 'ng2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzSpinnerModule } from 'ng2-materialize';
import { LoaderModule } from '../loader/loader.module';
import { LoaderComponent } from '../loader/loader/loader.component';
import { TableModule } from '../table/table.module';
import { DeleteModalModule } from './../delete-modal/delete-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MzModalModule,
    MzValidationModule,
    MzInputModule,
    BrowserAnimationsModule,
    LoaderModule,
    TableModule,
    DeleteModalModule
  ],
  declarations: [
    CategoriaListComponent,
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriaModule { }
