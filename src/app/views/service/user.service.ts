import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserMaster } from '../modal/user-master';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public findAllUsers(userId : String) : Observable<UserMaster[]>  {
    return this.http.get<UserMaster[]>(this.baseURL +`/api/get/${userId}/users`);
  }

  public createUsers(users : string): Observable<UserMaster>  {
    return this.http.post<UserMaster>(this.baseURL +`/api/user`, users);
  }
}
