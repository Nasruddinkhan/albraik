import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { JobTitleModel } from '../modal/jobtitle';
import { JobMaster } from '../modal/jobtitle-master';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public findAllJobTitles(userId : String) : Observable<JobTitleModel[]>  {
    return this.http.get<JobTitleModel[]>(this.baseURL +`/api/get/${userId}/jobtitles`);
  }

  public createJobTitle(jobs : JobMaster): Observable<JobTitleModel[]>  {
    return this.http.post<JobTitleModel[]>(this.baseURL +`/api/save/jobtitles`, jobs);
  }
  public findAllCompany(companyID : String) : Observable<any[]>  {
    let jobTitle = this.http.get(this.baseURL +`/api/get/${companyID}/jobtitle`);
    let depts = this.http.get(this.baseURL +`/api/get/${companyID}/depts`);
    let roles = this.http.get(this.baseURL +`/api/get/${companyID}/companyroles`);
    return forkJoin([jobTitle, depts, roles]);
  }
}
