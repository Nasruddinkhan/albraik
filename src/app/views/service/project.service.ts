import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { CaseModel } from '../modal/case-model';
import { DeedModel } from '../modal/deed-model';
import { Establisement } from '../modal/establisment-model';
import { InheritanceModel } from '../modal/Inheretence-model';
import { ProjectModel } from '../modal/project-model';
import { SubjectType } from '../modal/subject-type';
import { VerditModel } from '../modal/verdict-model';

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
  public addProjectCase(projectCase: CaseModel):Observable<CaseModel> {
    return this.http.post<CaseModel>(this.baseURL+`/api/create/case`, projectCase);
  }

  public addEstiblishmentCompanyCase(establisment: Establisement):Observable<Establisement> {
    return this.http.post<Establisement>(this.baseURL+`/api/create/estiblismentcase`, establisment);
  }
  public addDeedCase(deed: DeedModel):Observable<DeedModel> {
    return this.http.post<DeedModel>(this.baseURL+`/api/create/deedcase`, deed);
  }
  public addInheritanceCase(inherit: InheritanceModel):Observable<InheritanceModel> {
    return this.http.post<InheritanceModel>(this.baseURL+`/api/create/inheritcase`, inherit);
  }
  public addVerditCase(verdit: VerditModel):Observable<VerditModel> {
    return this.http.post<VerditModel>(this.baseURL+`/api/create/verditcase`, verdit);
  }
  
}
