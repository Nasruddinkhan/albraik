import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MasterPages } from '../modal/master-page';

@Injectable({
  providedIn: 'root'
})
export class CompanyRegistrationService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public getMasterPages(roles : String) : Observable<MasterPages[]>  {
    return this.http.get<MasterPages[]>(this.baseURL +`/api/master/${roles}/role`);
  }
  public createCompany(formDate :FormData){
    console.log(formDate);
    this.http.post(this.baseURL +`/api/create/upload/comapnay`, formDate)
        .subscribe(res => {
          console.log(res);
        }) 
  }
}
