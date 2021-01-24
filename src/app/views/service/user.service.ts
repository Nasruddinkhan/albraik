import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserMaster } from '../modal/user-master';
import { Observable } from 'rxjs';
import { UserModel } from '../modal/user-model';
import { UserModule } from '../users/users.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public findAllUsers() : Observable<UserMaster[]>  {
    return this.http.get<UserMaster[]>(this.baseURL +`/api/user`);
  }

  public getUsers(idArray: string[]): Observable<UserMaster[]> {
    const params = new HttpParams({
      fromObject: { 'id': idArray }
    });
    return this.http.get<UserMaster[]>(this.baseURL+`/api/user`, { params });
  }

  public createUsers(users : string): Observable<UserMaster>  {
    return this.http.post<UserMaster>(this.baseURL +`/api/user`, users);
  }

  public findJobtitle (companyId: string, name : string,): Observable<UserMaster[]>  {
    return this.http.get<UserMaster[]>(this.baseURL +`/api/user/${companyId}/${name}/jobtitle`);
  }

  public getUserDetails(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.baseURL + `/api/user/${userId}/profile`);
  }

  public updateUser(profile: string): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseURL +`/api/profile`, profile);
  }

  public updateS3ProfilePhotoKey(key: string): Observable<any> {
    return this.http.put(this.baseURL+'/api/user/profile/pic', JSON.stringify({ "s3key": key }));
  } 
}
