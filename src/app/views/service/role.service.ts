import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { RoleMaster } from '../modal/role-master';
import { RoleModel } from '../modal/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public findAllRoles(userId : String) : Observable<RoleModel[]>  {
    return this.http.get<RoleModel[]>(this.baseURL +`/api/get/${userId}/roles`);
  }

  public createRole(role : RoleMaster): Observable<RoleModel[]>  {
    return this.http.post<RoleModel[]>(this.baseURL +`/api/save/roles`, role);
  }
}
