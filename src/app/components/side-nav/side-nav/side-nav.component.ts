import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { EstabelecimentoService } from '../../estabelecimento/service/estabelecimento.service';
import { Estabelecimento } from '../../../domain/entities/Estabelecimento';
import { IResponse } from '../../../domain/interfaces/IResponse';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @ViewChild('sidenav') sideNav: ElementRef;
  opened: boolean;

  isAuth: boolean = false;
  isAdmin: boolean = false;
  
  estabelecimento: Estabelecimento = new Estabelecimento();

  constructor(private authService: AuthService,
              private estabelecimentoS: EstabelecimentoService) { }

  ngOnInit() {
    this.isAuth = this.authService.authenticated();
    this.isAdmin = (this.authService.currentUser.isAdmin == 'True');

    this.getEstabelecimento();

    this.estabelecimentoS.updateEstabelecimento.subscribe(() => {
      this.getEstabelecimento();
    })
  }

  getEstabelecimento() {
    this.estabelecimentoS.GetById(this.authService.currentUser.id)
    .then((res: IResponse) => {
      this.estabelecimento = res.data;
    })
  }

}
