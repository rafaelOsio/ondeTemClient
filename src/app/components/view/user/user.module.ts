import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MzInputModule, MzValidationModule, MzCheckboxModule, MzToastModule, MzModalModule } from 'ng2-materialize';
import { AuthService } from '../../../services/auth.service';
import { LoaderModule } from '../../loader/loader.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    MzValidationModule,
    MzInputModule,
    ReactiveFormsModule,
    MzCheckboxModule,
    MzToastModule,
    MzModalModule,
    RouterModule,
    LoaderModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class UserModule { }
