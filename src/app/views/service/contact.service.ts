import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { MasterPages } from '../modal/master-page';
import { ContactType } from '../modal/contact-type';
import { Contact } from '../modal/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactSearchService {

  private baseURL = environment.baseUrl + 'infra';
  constructor(private http: HttpClient) { }
  
  public getContactTypePages() : Observable<ContactType[]>  {
    return this.http.get<ContactType[]>(this.baseURL +`/api/contact/type`);
  }
  // public createCompany(formDate :FormData){
  //   console.log(formDate);
  //   this.http.post(this.baseURL +`/api/create/upload/comapnay`, formDate)
  //       .subscribe(res => {
  //         console.log(res);
  //       }) 
  // }

  public getContactList() : Observable<Contact[]>  {
    return this.http.get<Contact[]>(this.baseURL +`/api/contact`);
  }

  public createContact(contact) : Observable<Contact>  {
    return this.http.post<Contact>(this.baseURL +`/api/contact`,contact);
  }
  public getContactType(contactType: Number) : Observable<Contact[]>  {
    return this.http.get<Contact[]>(this.baseURL +`/api/contact?contactTypeId=${contactType}`);
  }

  public updateContact(id: number, valuesToBeChanged: Object): Observable<Contact[]> {
    return this.http.put<Contact[]>(this.baseURL + `/api/contact/${id}`, valuesToBeChanged);
  }

  public deleteContact(idArray: string[]): Observable<Contact[]> {
    const params = new HttpParams({ 
      fromObject: { 'id': idArray } 
    });
    return this.http.delete<Contact[]>(this.baseURL +`/api/contact`, { params });
  }
  
}
