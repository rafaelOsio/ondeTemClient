import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavModule } from '../../side-nav/side-nav.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SideNavModule,
    RouterModule
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    
  ],
  providers: [
    
  ]
})
export class DashboardModule { }
