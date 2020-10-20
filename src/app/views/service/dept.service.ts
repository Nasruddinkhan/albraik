import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DepartmentMaster } from '../modal/department-master';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../modal/department';
import { JobTitleModel } from '../modal/jobtitle';

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

  public updateDeptName(name: string, id: number): Observable<DepartmentModel[]> {
    return this.http.put<DepartmentModel[]>(this.baseURL +`/api/department/${id}`, { "name": name });
  }

  public deleteDept(idArray : string[]): Observable<JobTitleModel[]> {
    const params = new HttpParams({ 
      fromObject: { 'id': idArray } 
    });
    return this.http.delete<JobTitleModel[]>(this.baseURL +`/api/department`, { params });
  }
  
}
