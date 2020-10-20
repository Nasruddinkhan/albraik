import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { JobTitleModel } from '../modal/jobtitle';
import { JobMaster } from '../modal/jobtitle-master';
import { Observable } from 'rxjs';

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

  public deleteJobTitle(idArray : string[]): Observable<JobTitleModel[]> {
    const params = new HttpParams({ 
      fromObject: { 'id': idArray } 
    });
    return this.http.delete<JobTitleModel[]>(this.baseURL +`/api/jobtitle`, { params });
  }

  public updateJobTitle(name: string, id: number): Observable<JobTitleModel[]> {
    return this.http.put<JobTitleModel[]>(this.baseURL +`/api/jobtitle/${id}`, { "name": name });
  }
}
