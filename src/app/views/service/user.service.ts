import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserMaster } from '../modal/user-master';
import { Observable } from 'rxjs';
import { UserModel } from '../modal/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public findAllUsers() : Observable<UserMaster[]>  {
    return this.http.get<UserMaster[]>(this.baseURL +`/api/user`);
  }

  public createUsers(users : string): Observable<UserMaster>  {
    return this.http.post<UserMaster>(this.baseURL +`/api/user`, users);
  }

  public findJobtitle (companyId: string, name : string,): Observable<UserMaster[]>  {
    return this.http.get<UserMaster[]>(this.baseURL +`/api/user/${companyId}/${name}/jobtitle`);
  }

  getUserDetails(userId : string) : Observable<UserModel>{
     return this.http.get<UserModel>(this.baseURL +`/api/user/${userId}/profile`);
  }
  updateUser(profile:string) : Observable<UserModel>{
    return this.http.post<UserModel>(this.baseURL +`/api/profile`, profile);
  }
  updateUserProfile(update:string) : Observable<UserMaster>{
    return this.http.post<UserMaster>(this.baseURL +`/api/user/update`, update);
  }

  deleteUser(userId : string) : Observable<any>{
    return this.http.get<any>(this.baseURL +`/api/user/${userId}/delete`);

  }
}
