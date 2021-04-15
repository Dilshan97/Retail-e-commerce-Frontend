import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private injector: Injector
  ) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthService);

    if (this.getToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.getToken()}`
        }
      });
    }
    
    return next.handle(req)
  }

  getToken() {
    if (localStorage.getItem('auth') != null) {
      return JSON.parse(localStorage.getItem('auth')).accessToken;
    } else {
      return false;
    }
  }
}
