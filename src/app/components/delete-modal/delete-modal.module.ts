import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MzModalModule } from 'ng2-materialize';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MzModalModule,
  ],
  declarations: [
    DeleteModalComponent
  ],
  exports: [
    DeleteModalComponent
  ]
})
export class DeleteModalModule { }
