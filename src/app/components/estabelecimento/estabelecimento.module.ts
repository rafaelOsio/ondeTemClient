import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MzInputModule, MzValidationModule, MzModalModule, MzToastModule } from 'ng2-materialize';
import { ReactiveFormsModule } from '@angular/forms';

import { EstabelecimentoListComponent } from './estabelecimento-list/estabelecimento-list.component';
import { EstabelecimentoFormComponent } from './estabelecimento-form/estabelecimento-form.component';
import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { LoaderModule } from '../loader/loader.module';
import { EstabelecimentoService } from './service/estabelecimento.service';
import { DeleteModalModule } from '../delete-modal/delete-modal.module';
import { FileUploadModalModule } from '../file-upload-modal/file-upload-modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MzInputModule,
    ReactiveFormsModule,
    MzValidationModule,
    MzModalModule,
    LoaderModule,
    MzToastModule,
    LoaderModule,
    DeleteModalModule,
    FileUploadModalModule
  ],
  declarations: [
    EstabelecimentoListComponent,
    EstabelecimentoFormComponent,
    EstabelecimentoComponent
  ],
  exports: [
    EstabelecimentoListComponent
  ],
  providers: [
    EstabelecimentoService
  ]
})
export class EstabelecimentoModule { }
