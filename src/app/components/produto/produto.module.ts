import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { MzInputModule, MzValidationModule, MzModalModule } from 'ng2-materialize';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MzSelectModule } from 'ng2-materialize'
import { ProdutoService } from './service/produto.service';
import { TableModule } from '../table/table.module';
import { LoaderModule } from '../loader/loader.module';
import { DeleteModalModule } from '../delete-modal/delete-modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MzInputModule,
    ReactiveFormsModule,
    MzValidationModule,
    MzSelectModule,
    TableModule,
    FormsModule,
    LoaderModule,
    DeleteModalModule,
    MzModalModule,
  ],
  declarations: [
    ProdutoListComponent, 
    ProdutoComponent, 
    ProdutoFormComponent
  ],
  providers: [
    ProdutoService
  ]
})
export class ProdutoModule { }
