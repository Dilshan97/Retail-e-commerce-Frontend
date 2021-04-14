import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }


  login(customer) {
    return this.http.post(environment.customer_microservice_url + '/auth/login', customer);
  }

  register(customer) {
    return this.http.post(environment.customer_microservice_url + '/auth/register', customer);
  }

  logout() {
    localStorage.removeItem('auth');
    this._router.navigate(['login']);
    return this.http.post(environment.customer_microservice_url + '/auth/logout', 'logout');
  }

  isLogged() {
    if (localStorage.getItem('auth') != null) {
      return !!JSON.parse(localStorage.getItem('auth')).accessToken;
    } else {
      return false;
    }
  }

  getDashboardLink() {
      return '';
  }
}
