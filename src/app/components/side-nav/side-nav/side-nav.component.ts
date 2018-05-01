import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.authenticated();
    this.isAdmin = (this.authService.currentUser.isAdmin == 'True');

    
  }

}
