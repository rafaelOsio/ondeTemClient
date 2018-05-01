import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideNavComponent } from './side-nav/side-nav.component';
import { MzSidenavModule } from 'ng2-materialize';
import { MzNavbarModule } from 'ng2-materialize';
import { NavBarComponent } from './nav-bar/nav-bar.component'

@NgModule({
  imports: [
    CommonModule,
    MzSidenavModule,
    RouterModule,
    MzNavbarModule
  ],
  declarations: [
    SideNavComponent,
    NavBarComponent
  ],
  exports: [
    SideNavComponent
  ],
  providers: [
  ]
})
export class SideNavModule { }
