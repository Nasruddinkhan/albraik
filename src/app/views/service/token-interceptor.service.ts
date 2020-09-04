import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    console.log('interceptor is called');
    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')})
    return next.handle(req)
  }
}
