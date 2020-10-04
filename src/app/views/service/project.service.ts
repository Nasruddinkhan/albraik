import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ProjectModel } from '../modal/project-model';
import { SubjectType } from '../modal/subject-type';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public getProjectType() : Observable<SubjectType[]>  {
    return this.http.get<SubjectType[]>(this.baseURL +`/api/project/type`);
  }

  public addProjectTask(project: ProjectModel):Observable<ProjectModel> {
    return this.http.post<ProjectModel>(this.baseURL+`/api/create/task`, project);
  }
   
  
  public findAllTask(userId:string, pageNo:number):Observable<any>{
    return this.http.get(this.baseURL+`/api/task/${userId}/${pageNo}/allrecord`);
  }
}
