import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  public updateCourtName(name: string, id: number): Observable<CourtModel[]> {
    return this.http.put<CourtModel[]>(this.baseURL +`/api/court/${id}`, { "name": name });
  }

  public deleteCourt(idArray : string[]): Observable<CourtModel[]> {
    const params = new HttpParams({ 
      fromObject: { 'id': idArray } 
    });
    return this.http.delete<CourtModel[]>(this.baseURL +`/api/court`, { params });
  }

}
