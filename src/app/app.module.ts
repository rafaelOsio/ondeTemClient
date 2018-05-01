import { EstabelecimentoModule } from './components/estabelecimento/estabelecimento.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProdutoModule } from './components/produto/produto.module';
import { routing } from './app.routing';
import { BaseService } from './services/base.service';
import { CategoriaModule } from './components/categoria/categoria.module';
import { UserModule } from './components/view/user/user.module'
import { LoaderModule } from './components/loader/loader.module';
import { SideNavModule } from './components/side-nav/side-nav.module';
import { InterceptorService } from './services/interceptor.service';
import { DashboardComponent } from './components/view/dashboard/dashboard/dashboard.component';
import { DashboardRoutingModule } from './components/view/dashboard/dashboard.routing.module';  
import { DashboardModule } from './components/view/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    ProdutoModule,
    CategoriaModule,
    UserModule,
    SideNavModule,
    EstabelecimentoModule,
    DashboardModule,
    DashboardRoutingModule
  ],
  providers: [
    BaseService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: InterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }