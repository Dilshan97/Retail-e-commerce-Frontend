import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if(this.authService.isLogged()) {
      this.router.navigate(['/']);
    } else {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        remember_me: [false]
      });
    }
  }

  submit() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(res => {
      if(res) {
          localStorage.setItem('auth', JSON.stringify(res));
          this.router.navigate([this.authService.getDashboardLink()]);
          this.loading = false;
      }
    }, err => {
      this.loading = false;
      let fields = err.error.errors;
      if (fields) {
        if (Object.keys(fields).length > 0) {
          let list = new String("");
          Object.keys(fields).map(
            key => {
              let message = fields[key];
              Object.keys(message).map(
                msg_index => {
                  list = list.concat(new String(`${message[msg_index]} <br>`).toString());
                }
              );
            }
          );
          this.toastr.error(`${list}`, 'Error !', { enableHtml: true, progressBar: true });
        } else {
          this.toastr.error('common error', 'Error !', { progressBar: true });
        }
      } else {
        this.toastr.error('common error', 'Error !', { progressBar: true });
      }
    });
  }

}
