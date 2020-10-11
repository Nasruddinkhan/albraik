import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { JobTitleModel } from '../modal/jobtitle';
import { JobMaster } from '../modal/jobtitle-master';
import { Observable } from 'rxjs';
import { CourtModel } from '../modal/court';
import { CourtMaster } from '../modal/court-master';

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public findAllCourt() : Observable<CourtModel[]>  {
    return this.http.get<CourtModel[]>(this.baseURL +`/api/court`);
  }

  public createCourt(courtList : Array<CourtMaster>): Observable<CourtModel[]>  {
    return this.http.post<CourtModel[]>(this.baseURL +`/api/court`, courtList);
  }
}
