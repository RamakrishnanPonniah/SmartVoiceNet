import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { 
    this.authService.isUserLoggedIn.subscribe( data => {       
      this.isLoggedIn = data;
    })
  }
  
  isLoggedIn :boolean;
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    
    this.isLoggedIn = this.authService.isLoggedIn();
   
  }

}
