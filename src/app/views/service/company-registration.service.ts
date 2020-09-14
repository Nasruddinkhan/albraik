import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MasterPages } from '../modal/master-page';
import { CompanyMaster } from '../modal/company-master';

@Injectable({
  providedIn: 'root'
})
export class CompanyRegistrationService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public getMasterPages(roles : String) : Observable<MasterPages[]>  {
    return this.http.get<MasterPages[]>(this.baseURL +`/api/master/${roles}/role`);
  }
  public createCompany(formDate :FormData, userID : string) : Observable<CompanyMaster>{
   return this.http.post<CompanyMaster>(this.baseURL +`/api/create/upload/${userID}/comapnay`, formDate);
  }

  public getCompany( companyId : string) : Observable<CompanyMaster>{
    return this.http.get<CompanyMaster>(this.baseURL +`/api/get/${companyId}/comapnay`);
   }
  
}
