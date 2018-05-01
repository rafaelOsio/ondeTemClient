import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { MzModalModule } from 'ng2-materialize';
import { ImageCropperModule } from 'ngx-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    MzModalModule,
    ImageCropperModule
  ],
  declarations: [
    FileUploadComponent
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModalModule { }
