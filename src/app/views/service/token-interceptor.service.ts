import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http'
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    console.log('interceptor is called');
    const url = req.url;
    if (!url.includes('/api/')) {
      console.log('url.include');
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')})
      return next.handle(req);
    }

    if (!url.includes('/upload/')) { 
      console.log('form data');
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')})
    }
    let authService = this.injector.get(LoginService);
    console.log('url.authService asdfsafsda');
    if(authService.loggedIn())
      req = req.clone({headers: req.headers.set('Authorization', 'myToken '+authService.getToken())})
    
    return next.handle(req)
  }
}
