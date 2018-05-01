import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { MzSpinnerModule } from 'ng2-materialize';


@NgModule({
  imports: [
    CommonModule,
    MzSpinnerModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
