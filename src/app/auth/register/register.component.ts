import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, {
      validators: [ConfirmedValidator('password', 'password_confirmation')]
    });
  }

  submit() {
    this.authService.register(this.signupForm.value).subscribe(res => {
      if (res) {
        localStorage.setItem('auth', JSON.stringify(res));
        this.router.navigate(['auth/login']);
      }
    }, err => {
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

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
