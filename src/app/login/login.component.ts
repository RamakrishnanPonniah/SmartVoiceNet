import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../_shared/interfaces/user';
import { AuthService } from '../_shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginValidators } from '../_shared/validators/login-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted  =  false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {

    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  },{
    validator: LoginValidators('email', 'password')
  });
  }

  login(){
    
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    const isLoggedIn = this.authService.isLoggedIn();
    this.authService.isUserLoggedIn.next(isLoggedIn);
    this.router.navigateByUrl('home');
  }

}
