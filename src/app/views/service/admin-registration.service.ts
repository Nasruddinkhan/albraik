import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AdminRegistrationService {
  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }

  public registerAdmin(adminRegister) : Observable<any>  {
    return this.http.post(this.baseURL +`/register/admin`, adminRegister );
  }
  
  public changePassword(changePassword) : Observable<any>  {
    return this.http.post(this.baseURL +`/api/changepassword`, changePassword );
  }
}
