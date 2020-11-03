import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
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

  public getContactList(pageNo: number, contcatid: string, name: string): Observable<any>  {
    return this.http.get<any>(this.baseURL +`/api/contact/${pageNo}/${contcatid}/${name}/all`);
  }
  public getContact(contactid: number): Observable<Contact>  {
    return this.http.get<Contact>(this.baseURL +`/api/contact/${contactid}`);
  }
  public async  getViewContact(contactid: number): Promise<any>  {
    return  await this.http.get<Contact>(this.baseURL +`/api/contact/${contactid}/view`).toPromise();
  }
  public createContact(contact) : Observable<Contact>  {
    return this.http.post<Contact>(this.baseURL +`/api/contact`,contact);
  }

  public updateContact(contact, contactId) : Observable<Contact>  {
    return this.http.put<Contact>(this.baseURL +`/api/contact/${contactId}`, contact);
  }
  public getContactType(contactType: Number) : Observable<Contact[]>  {
    return this.http.get<Contact[]>(this.baseURL +`/api/contact?contactTypeId=${contactType}`);
  }
  public deleteContact(contactId: number): Observable<any> {
    return this.http.get<any>(this.baseURL + `/api/contact/${contactId}/delete`);
  }
}
