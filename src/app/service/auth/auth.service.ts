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
    this._router.navigate(['/']);
    return this.http.post(environment.customer_microservice_url + '/auth/logout', 'logout');
  }

  isLogged() {
    if (localStorage.getItem('auth') != null) {
      return !!JSON.parse(localStorage.getItem('auth')).accessToken;
    } else {
      return false;
    }
  }

  loggedUserName() {
    if (localStorage.getItem('auth') != null) {
      if (JSON.parse(localStorage.getItem('auth')).user != null) {
        return JSON.parse(localStorage.getItem('auth')).user.username;
      }
    }
  }

  isShopAdmin() {
    if (localStorage.getItem('auth') != null) {
      let auth = JSON.parse(localStorage.getItem('auth'));
      if (auth.user != null) {
        if (auth.user.user_level != null) {
          return auth.user.user_level == 'shop_admin';
        }
      }
    } else {
      return false;
    }
  }

  isCustomer() {
    if (localStorage.getItem('auth') != null) {
      let auth = JSON.parse(localStorage.getItem('auth'));
      if (auth.user != null) {
        if (auth.user.user_level != null) {
          return auth.user.user_level == 'customer';
        }
      }
    } else {
      return false;
    }
  }

  authDetails() {
    if (localStorage.getItem('auth') != null) {
      let auth = JSON.parse(localStorage.getItem('auth'));
      if (auth.user != null) {
        if (auth.user.user_level != null) {
          return auth;
        }
      }
    } else {
      return false;
    }
  }


  getDashboardLink() {
    if(this.isShopAdmin()) {
      return 'admin';
    } else if(this.isCustomer()) {
      return '/';
    } else {
      return 'auth/login';
    }
  }

}
