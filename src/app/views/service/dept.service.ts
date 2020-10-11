import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { DepartmentMaster } from '../modal/department-master';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../modal/department';

@Injectable({
  providedIn: 'root'
})
export class DeptService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public findAlldepartments(userId : String) : Observable<DepartmentModel[]>  {
    return this.http.get<DepartmentModel[]>(this.baseURL +`/api/get/${userId}/departments`);
  }

  public createDepartment(department : DepartmentMaster): Observable<DepartmentModel[]>  {
    return this.http.post<DepartmentModel[]>(this.baseURL +`/api/save/departments`, department);
  }
  async isExsitDepartment(usertId: string, companyId: string, name:string): Promise<DepartmentModel>  {
    return await this.http.get<DepartmentModel>(this.baseURL +`/api/get/${usertId}/${companyId}/${name}/name`).toPromise();
  }
  
}
