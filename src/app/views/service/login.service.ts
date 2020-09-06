import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL=environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }

  async loginUser(user) :Promise<any>{//
    return await this.http.post<any>(this.baseURL +`/login/validateUser`, user).toPromise();
  }

  loggedIn() {
    return !!sessionStorage.getItem('token')    
  }

  getToken() {
    console.log("token ::::::::: "+sessionStorage.getItem('token'));
    return sessionStorage.getItem('token')
  }
}
