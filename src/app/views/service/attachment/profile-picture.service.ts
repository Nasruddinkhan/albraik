import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  private baseUrl = environment.attachmentUrl + 'attachment';

  constructor(private http: HttpClient) { }

  getPresignedUrlForProfilePhoto(): Observable<any> {
    return this.http.get(this.baseUrl+'/presigned-url/profile/upload');
  }

  uploadProfilePhoto(url: string, imageFile: File): Observable<any> {
    let body = new FormData();
    body.append('image', imageFile);
    let header = new HttpHeaders({ 'Content-Type': imageFile.type });
    let req = new HttpRequest(
      'PUT',
      url,
      imageFile,
      { headers: header }
    );
    return this.http.request(req);
    // return this.http.put(url, body, { headers: {'Content-Type': imageFile.type} });
  }
}
