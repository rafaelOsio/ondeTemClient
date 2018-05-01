import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EstabelecimentoComponent } from '../../estabelecimento/estabelecimento/estabelecimento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstabelecimentoFormComponent } from '../../estabelecimento/estabelecimento-form/estabelecimento-form.component';
import { EstabelecimentoListComponent } from '../../estabelecimento/estabelecimento-list/estabelecimento-list.component';
import { CategoriaListComponent } from '../../categoria/categoria-list/categoria-list.component';
import { ProdutoListComponent } from '../../produto/produto-list/produto-list.component';
import { ProdutoComponent } from '../../produto/produto/produto.component';
import { ProdutoFormComponent } from '../../produto/produto-form/produto-form.component';
import { AuthGuard } from '../../../guards/auth.guard';

const dashboardRoutes = [
    {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
        /*{path: 'estabelecimentos', canActivate: [AuthGuard], component: EstabelecimentoComponent, children: [
            {path: 'editar/:id', canActivate: [AuthGuard], component: EstabelecimentoFormComponent},
            {path: 'novo', canActivate: [AuthGuard], component: EstabelecimentoFormComponent},
            {path: '', canActivate: [AuthGuard], component: EstabelecimentoListComponent},
        ]},*/   
        { path: 'categorias', canActivate: [AuthGuard], component: CategoriaListComponent },
        { path: 'produtos', canActivate: [AuthGuard], component: ProdutoComponent, children: [
            {path: 'editar/:id', canActivate: [AuthGuard], component: ProdutoFormComponent},
            {path: 'novo', canActivate: [AuthGuard], component: ProdutoFormComponent},
            {path: '', canActivate: [AuthGuard], component: ProdutoListComponent}
        ]}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export class DashboardRoutingModule {

}