import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.isLogged()) {
      this.router.navigate(['/']);
    } else {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  submit() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      if(res) {
          localStorage.setItem('auth', JSON.stringify(res));
          this.router.navigate([this.authService.getDashboardLink()]);
      }
    }, err => {
      let fields = err.error.errors;

      console.log(err.error.message);
    });
  }

}
