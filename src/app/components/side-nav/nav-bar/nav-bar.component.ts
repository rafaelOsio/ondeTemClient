import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MzNavbarComponent, MzSidenavComponent } from 'ng2-materialize';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EstabelecimentoService } from '../../estabelecimento/service/estabelecimento.service';
import { Estabelecimento } from '../../../domain/entities/Estabelecimento';
import { IResponse } from '../../../domain/interfaces/IResponse';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menu: boolean = false;

  @ViewChild('menu') menuElement;
  @ViewChild('menuTrigger') menuTriggerElement;

  @HostListener('document:click', ['$event.target'])
    onClick(targetElement) {
        if(!this.menu)
          return;

        const clickedInsideMenu = this.menuElement.nativeElement.contains(targetElement);
        const clickedInsideMenuTrigger = this.menuTriggerElement.nativeElement.contains(targetElement)

        if (!clickedInsideMenu && !clickedInsideMenuTrigger) {
            this.menu = false;
        }
    }

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  sair() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  openMenu() {
    this.menu = !this.menu;
  }
}
