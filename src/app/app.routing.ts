import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './components/view/user/login/login.component';
import { EstabelecimentoListComponent } from './components/estabelecimento/estabelecimento-list/estabelecimento-list.component';
import { RegisterComponent } from './components/view/user/register/register.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
    
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, { useHash: true });