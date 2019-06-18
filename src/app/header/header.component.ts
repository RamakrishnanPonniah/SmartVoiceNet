import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
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

  showHome() {
    this.router.navigateByUrl('home');
  }

  showSlider() {
    this.router.navigateByUrl('about-us');
  }

  ngOnInit() {
    
    this.isLoggedIn = this.authService.isLoggedIn();
   
  }

}
